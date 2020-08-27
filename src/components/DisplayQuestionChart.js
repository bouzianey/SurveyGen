import React, {useState} from "react";
import {Bar, Doughnut, Pie} from "react-chartjs-2";

const DisplayQuestionChart = ({ val}) => {

  return (

    <div key={767} id={767}>

            <Bar
                        id={767}
                        data={val}
                        options={{
                            title: {
                                display: val.question_label,
                                text: val.question_label,
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
};

export default DisplayQuestionChart;