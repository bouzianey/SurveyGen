import React, {useEffect, useState} from "react";
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import './styling.css'



const TeamPerformanceChart = ({user, dataobj}) =>{
  return (
      <div id="test" key={999}>
            <Pie
                        id={999}
                        data={dataobj}
                        options={{
                            title: {
                                display: "Team Performance",
                                text: "Team Performance",
                                fontSize: 25
                            },
                            legend: {
                                display: "",
                                position: "Bottom"
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
            />
      </div>
  );
}

export default TeamPerformanceChart;