// plotChart.js

// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(function() {
  // Colors to use for each dataset
  const colors = [
      'rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 123, 255, 1)',
      'rgba(0, 255, 123, 1)',
      'rgba(123, 0, 255, 1)',
      'rgba(255, 123, 0, 1)'
  ];

  // Function to fetch and plot data
  function fetchAndPlotData() {
      fetch('/consolidatedData.json')
          .then(response => response.json())
          .then(data => {
              const datasets = [];

              // Track the color index for different datasets
              let colorIndex = 0;

              // Loop over each key in the JSON object
              for (const [key, value] of Object.entries(data)) {
                  // Sort the data for each key by date
                  const sortedData = value.sort((a, b) => new Date(a.date) - new Date(b.date));

                  // Map data points to { x: date, y: value } format
                  const dataPoints = sortedData.map(item => ({ x: item.date, y: item.value }));

                  // Add the dataset for each key
                  datasets.push({
                      label: key, // Use the key (e.g., 'CurrentAssets') as the label
                      data: dataPoints,
                      borderColor: colors[colorIndex % colors.length], // Cycle through the color array
                      backgroundColor: colors[colorIndex % colors.length],
                      borderWidth: 2,
                      fill: false, // Do not fill under the line
                      pointBackgroundColor: colors[colorIndex % colors.length], // Point color
                      pointRadius: 4
                  });

                  // Increment the color index
                  colorIndex++;
              }

              // Create the chart using Chart.js
              const ctx = document.getElementById('financialChart').getContext('2d');
              new Chart(ctx, {
                  type: 'line', // Using line chart to connect the data points
                  data: {
                      datasets: datasets // Include all datasets
                  },
                  options: {
                      responsive: true,
                      scales: {
                          x: {
                              type: 'time', // Date-based X-axis
                              time: {
                                  unit: 'year' // Group by year
                              },
                              title: {
                                  display: true,
                                  text: 'Year',
                                  font: {
                                      size: 16
                                  }
                              }
                          },
                          y: {
                              beginAtZero: false,
                              title: {
                                  display: true,
                                  text: 'Value (GBP)',
                                  font: {
                                      size: 16
                                  }
                              }
                          }
                      }
                  }
              });
          })
          .catch(error => {
              console.error('Error loading JSON data:', error);
          });
  }

  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
      // Fetch and plot the data on page load
      fetchAndPlotData();

      // Reload data when the button is clicked (if applicable)
      const reloadButton = document.querySelector('.btn-primary');
      if (reloadButton) {
          reloadButton.addEventListener('click', () => {
              fetchAndPlotData();
          });
      }
  });
})();
