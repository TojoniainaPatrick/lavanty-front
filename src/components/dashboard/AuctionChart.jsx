import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const AuctionChart = ({ bids }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    // Initialiser un tableau avec 0 enchères pour chaque mois
    const bidsPerMonth = Array(12).fill(0);

    // Filtrer les enchères de l'année en cours et compter par mois
    bids.forEach(bid => {
      const bidDate = new Date(bid.createdAt);
      if (bidDate.getFullYear() === currentYear) {
        const monthIndex = bidDate.getMonth();
        bidsPerMonth[monthIndex] += 1;
      }
    });

    // Préparer les données pour Chart.js
    setChartData({
      labels: months,
      datasets: [
        {
          label: "Nombre d'enchères par mois",
          data: bidsPerMonth,
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
        },
      ],
    });
  }, [bids]);
  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          precision: 0,
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div>
      {chartData ? <Line height = { 700 } width = { 1100 } data={chartData} options = { options } /> : <p>Chargement du graphique...</p>}
    </div>
  );
};

export default AuctionChart;