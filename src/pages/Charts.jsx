import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/userCollection";
import { Link } from "react-router-dom";

function Charts() {
  const { user } = useSelector((state) => state.user);
  const [ColumnCharts, setColumnCharts] = useState({
    series: [
      {
        data: [
          { x: "2019/01/01", y: 400 },
          { x: "2019/04/01", y: 430 },
          { x: "2019/07/01", y: 448 },
          { x: "2019/10/01", y: 470 },
          { x: "2020/01/01", y: 540 },
          { x: "2020/04/01", y: 580 },
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      xaxis: {
        type: "category",
        group: {
          style: {
            fontSize: "10px",
            fontWeight: 700,
          },
        },
      },
    },
  });

  const [PieChart, setPieChart] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const { data } = useCollection(
    "todos",
    ["uid", "==", user.uid],
  );

  useEffect(() => {
    if (data) {
      const nationsCount = data.reduce((acc, item) => {
        acc[item.nation] = (acc[item.nation] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(nationsCount);
      const series = Object.values(nationsCount);

      setPieChart({
        series,
        options: {
          chart: {
            type: "pie",
          },
          labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }

    if (data) {
      let TimeChart = [];
      data.forEach((time) => {
        let Time = {
          x: time.title,
          y: time.time,
        };
        TimeChart.push(Time);
      });

      setColumnCharts({
        series: [
          {
            data: TimeChart,
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 380,
          },
          xaxis: {
            type: "category",
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      {data ? (
        data.length !== 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl p-4">
              <h1 className="text-2xl mb-4">Nation</h1>
              <ReactApexChart
                options={PieChart.options}
                series={PieChart.series}
                type="pie"
                className="sm:w-full w-[300px]"
              />
            </div>
            <div className="card bg-base-100 shadow-xl p-4">
              <h1 className="text-2xl mb-4">Time</h1>
              <ReactApexChart
                options={ColumnCharts.options}
                series={ColumnCharts.series}
                type="bar"
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h1 className="text-3xl font-semibold mb-4">You have no recipes :(</h1>
            <Link to="/">
              <button className="btn btn-primary mt-4">Home</button>
            </Link>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-ring w-20"></span>
        </div>
      )}
    </div>
  );

}

export default Charts;
