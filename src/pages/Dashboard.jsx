import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function Dashboard() {
  const employee_information = JSON.parse(localStorage.getItem("employee_information"));
  const [info, setInfo] = useState({})

  const [chartData, setChartData] = useState({
    options: {
      chart: { id: "basic-bar" },
      xaxis: {
        categories: [],
        title: {
          text: 'Year',
          style: {
            color: '#333',
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        title: {
          text: 'Salary',
          style: {
            color: '#333',
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
          },
        },
      },
    },
    series: [
      { name: "Salary", data: [] }
    ]
  });


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}dashboard`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setInfo(data)
        setChartData({
          ...chartData,
          options: { ...chartData.options, xaxis: { categories: data.years } },
          series: [{ ...chartData.series[0], data: data.salaries }]
        });
      });
  }, []);

  return (


  <div className="min-h-screen bg-gray-100 flex justify-center ">
      {employee_information ? (
        <div className="space-y-6 pt-12">

          {/* User Information Card */}
          <div className="max-w-full mx-auto p-6 shadow-md rounded-xl bg-white">
            <img src={employee_information.profile_pic} alt="" className="w-32 h-32 mx-auto rounded-full" />
            <div className="space-y-4 text-center divide-y">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold">{employee_information.first_name}</h2>
                <h2 className="text-xl font-semibold">{employee_information.last_name}</h2>
                <p className="text-sm text-gray-500">{employee_information.dept_name}</p>
                <p className="text-sm text-gray-500">{employee_information.title}</p>
              </div>
              <div className="pt-2">
                <span className="text-gray-500">Employee No. {employee_information.employee_no}</span>
                <p className="text-sm text-gray-500">Motto: {employee_information.motto}</p>
              </div>
            </div>
          </div>
          <div className="max-w-xl mx-auto text-center pt-20">
            <p className="text-xl font-semibold text-gray-700">Salary History</p>
          </div>

          {/* Chart */}
          <div  className="max-w-screen-2xl mx-auto ">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="area"
              width="800"
            />
          </div>
        </div>
      ) : (
        <h2 className="text-center text-xl text-red-500">Error...</h2>
      )}
    </div>

);

}
