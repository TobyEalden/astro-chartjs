// public/js/plotChart.js

(function () {
  // Tailwind CSS color palette
  const colors = [
    'rgba(59, 130, 246, 1)',    // Blue-500
    'rgba(34, 197, 94, 1)',     // Green-500
    'rgba(239, 68, 68, 1)',     // Red-500
    'rgba(234, 179, 8, 1)',     // Yellow-500
    'rgba(168, 85, 247, 1)',    // Purple-500
    'rgba(251, 146, 60, 1)',    // Orange-500
    'rgba(20, 184, 166, 1)',    // Teal-500
    'rgba(236, 72, 153, 1)',    // Pink-500
    'rgba(99, 102, 241, 1)',    // Indigo-500
    'rgba(8, 145, 178, 1)',     // Cyan-500
  ];

  let chartInstance = null; // To store the chart instance

  // Function to determine current theme
  function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  // Function to get text color based on theme
  function getTextColor(theme) {
    return theme === 'dark' ? '#ffffff' : '#374151'; // White for dark, gray-700 for light
  }

  // Function to get grid color based on theme
  function getGridColor(theme) {
    return theme === 'dark' ? '#4b5563' : '#e5e7eb'; // Gray-600 for dark, gray-200 for light
  }

  // Function to fetch and plot data
  function fetchAndPlotData() {
    fetch('/consolidatedData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const datasets = [];
        let colorIndex = 0;

        for (const [key, value] of Object.entries(data)) {
          // Sort the data for each key by date
          const sortedData = value.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          // Map data points to { x: date, y: value } format
          const dataPoints = sortedData.map((item) => ({
            x: item.date,
            y: item.value,
          }));

          // Add the dataset for each key
          datasets.push({
            label: key,
            data: dataPoints,
            borderColor: colors[colorIndex % colors.length],
            backgroundColor: colors[colorIndex % colors.length],
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: colors[colorIndex % colors.length],
            pointRadius: 4,
            tension: 0.4, // Adds smooth curves to the line
          });

          colorIndex++;
        }

        // If chart already exists, destroy it before creating a new one
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Determine current theme
        const currentTheme = getCurrentTheme();
        const textColor = getTextColor(currentTheme);
        const gridColor = getGridColor(currentTheme);

        // Create the chart using Chart.js
        const ctx = document.getElementById('financialChart').getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Allows the chart to resize freely
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 30,
                bottom: 30,
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14,
                    family: 'Inter, sans-serif', // Match Tailwind's default font
                    weight: '600',
                  },
                  color: textColor,
                },
              },
              tooltip: {
                backgroundColor: currentTheme === 'dark' ? '#1f2937' : '#ffffff', // Tailwind's gray-800 or white
                titleColor: currentTheme === 'dark' ? '#ffffff' : '#374151',
                bodyColor: currentTheme === 'dark' ? '#d1d5db' : '#374151', // Tailwind's gray-300 or gray-700
                borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'year',
                },
                title: {
                  display: true,
                  text: 'Year',
                  font: {
                    size: 16,
                    family: 'Inter, sans-serif',
                    weight: '600',
                  },
                  color: textColor,
                },
                ticks: {
                  color: textColor,
                  font: {
                    size: 14,
                    family: 'Inter, sans-serif',
                    weight: '500',
                  },
                },
                grid: {
                  color: gridColor,
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Value (GBP)',
                  font: {
                    size: 16,
                    family: 'Inter, sans-serif',
                    weight: '600',
                  },
                  color: textColor,
                },
                ticks: {
                  color: textColor,
                  font: {
                    size: 14,
                    family: 'Inter, sans-serif',
                    weight: '500',
                  },
                },
                grid: {
                  color: gridColor,
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error('Error loading JSON data:', error);
      });
  }

  // Function to update chart text colors based on theme
  function updateChartTheme(theme) {
    if (!chartInstance) return;

    const textColor = getTextColor(theme);
    const gridColor = getGridColor(theme);

    // Update legend labels color
    chartInstance.options.plugins.legend.labels.color = textColor;

    // Update tooltip styles
    chartInstance.options.plugins.tooltip.backgroundColor = theme === 'dark' ? '#1f2937' : '#ffffff';
    chartInstance.options.plugins.tooltip.titleColor = theme === 'dark' ? '#ffffff' : '#374151';
    chartInstance.options.plugins.tooltip.bodyColor = theme === 'dark' ? '#d1d5db' : '#374151';
    chartInstance.options.plugins.tooltip.borderColor = theme === 'dark' ? '#374151' : '#e5e7eb';

    // Update scales
    chartInstance.options.scales.x.title.color = textColor;
    chartInstance.options.scales.x.ticks.color = textColor;
    chartInstance.options.scales.x.grid.color = gridColor;

    chartInstance.options.scales.y.title.color = textColor;
    chartInstance.options.scales.y.ticks.color = textColor;
    chartInstance.options.scales.y.grid.color = gridColor;

    // Update the chart to apply changes
    chartInstance.update();
  }

  // Function to initialize the chart
  function initializeChart() {
    fetchAndPlotData();
  }

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    initializeChart();

    // Listen for themeChanged events
    document.addEventListener('themeChanged', (event) => {
      const newTheme = event.detail; // 'dark' or 'light'
      updateChartTheme(newTheme);
    });
  });
})();
