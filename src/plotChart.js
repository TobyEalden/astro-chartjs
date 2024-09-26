document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart !== 'undefined') {
    console.log('Chart.js is loaded. Plotting chart...');
    
    // Check if date adapter is loaded
    if (typeof Chart._adapters._date !== 'undefined') {
      console.log('Date adapter is loaded:', Chart._adapters._date);
    } else {
      console.error('Date adapter is not loaded!');
      return;
    }
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = [
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      new Date()
    ];

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sample Data',
          data: [10, 15, 12, 20, 25],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM d'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  } else {
    console.error('Chart.js is not loaded!');
  }
});
