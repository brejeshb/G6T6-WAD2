const data = {
    datasets: [
      {
        label: "User Points",
        data: [
          { x: 0, y: 0, r: 20, name: "User A" }, // Adjust 'r' to represent points
          { x: 1, y: 1, r: 30, name: "User B" },
          { x: 2, y: 2, r: 40, name: "User C" },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  
  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          return value.name; // Display the 'name' inside each bubble
        },
        color: "#000000",
        font: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    elements: {
      point: {
        borderWidth: 1, // Customize bubble borders if needed
      },
    },
  };
  
  const config = {
    type: "bubble",
    data: data,
    options: options,
  };
  
  new Chart(document.getElementById("myChart"), config);
  