document.addEventListener("DOMContentLoaded", () => {
  // Manually register the dayjs adapter for Chart.js
  if (typeof Chart !== "undefined" && typeof dayjs !== "undefined") {
    // Register the date adapter explicitly
    Chart._adapters._date.override({
      _id: "dayjs",
      formats() {
        return {
          datetime: "MMM D, YYYY, h:mm:ss a",
          millisecond: "h:mm:ss.SSS a",
          second: "h:mm:ss a",
          minute: "h:mm a",
          hour: "hA",
          day: "MMM D",
          week: "ll",
          month: "MMM YYYY",
          quarter: "[Q]Q - YYYY",
          year: "YYYY",
        };
      },
      parse(value, format) {
        return dayjs(value, format).isValid()
          ? dayjs(value, format).valueOf()
          : null;
      },
      format(time, format) {
        return dayjs(time).format(format);
      },
      add(time, amount, unit) {
        return dayjs(time).add(amount, unit).valueOf();
      },
      diff(max, min, unit) {
        return dayjs(max).diff(dayjs(min), unit);
      },
      startOf(time, unit, weekday) {
        return dayjs(time).startOf(unit).valueOf();
      },
      endOf(time, unit) {
        return dayjs(time).endOf(unit).valueOf();
      },
    });
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  const labels = [
    new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    new Date(),
  ];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Sample Data",
          data: [10, 15, 12, 20, 25],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM d",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  });
});
