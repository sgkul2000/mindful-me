<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export default {
  name: "BarChart",
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      //   chartData: {
      //     labels: [ 'January', 'February', 'March' ],
      //     datasets: [ {
      //         data: [40, 20, 12],
      //         backgroundColor:"#edd1d9",
      //         borderColor:"#F2B2C4",
      //         fill: true
      //         } ]
      //   },
      chartOptions: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        layout: {
          padding: -5,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            display: false,
            grid: {
              drawBorder: false, // <-- this removes y-axis line
              lineWidth: 0.5,
            },
            min: 0,
            max: 130,
          },
          x: {
            display: false,
            grid: {
              drawBorder: false, // <-- this removes y-axis line
              lineWidth: 0.5,
            },
          },
        },
      },
    };
  },
};
</script>
