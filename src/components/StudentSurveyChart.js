import React, { useState, useEffect } from "react";
import DisplayQuestionChart from "./DisplayQuestionChart";
import DisplayQuestionAnswer from "./DisplayQuestionAnswer";
import './styling.css';

const StudentSurveyChart = ({survey_ID,studentID,onCloseChange}) => {

  const [questionAnswerList, setQuestionAnswerList] = useState([]);
  const [chartDataList, setChartDataList] = useState([]);

  useEffect(() => {
    const DisplayPerformance = (e) => {
      const objectToSend5 = {
        survey_id: survey_ID,
        student_id: studentID,
      };
      console.log("object to send : ",objectToSend5);
      fetch("https://survey-manager-yb-scsu.herokuapp.com/get_student_survey_performance", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(objectToSend5),
      })
        //.then((res) => res.json())
        .then((res) => {
          setQuestionAnswerList(res.questionAnswerList);
          res.questionAnswerList.forEach(dataObj => {


            if (dataObj.type === "radio") {
              const setupChartData = {};
              const questionChart = [];

              if (dataObj.repetition === "multiple") {

                for (const optionsObj of dataObj.options) {
                  let studentName = [];
                  let studentScore = [];

                  for (const AnswersObj of optionsObj.studentGridAnswer) {
                    studentName.push(AnswersObj.student_name);
                    studentScore.push(parseInt(AnswersObj.optionAnswer));
                  }
                  const optionAnswer = {
                    label: optionsObj.optionContent,
                    student_name: studentName,
                    data: studentScore,
                    backgroundColor: [
                      "rgba(0, 208, 0, 1)",
                      "rgba(0, 0, 255, 1)",
                      "rgba(255, 0, 0, 1)",
                      "rgba(255, 255, 0, 1)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                    ],
                  };
                  questionChart.push(optionAnswer);
                }

                setupChartData.labels = questionChart[0].student_name;
                setupChartData.question_label = dataObj.label;
                setupChartData.type = "grid";
                setupChartData.datasets = questionChart;
              } else if (dataObj.repetition === "single") {

                dataObj.options.forEach((optionsObj) => {
                  const optionAnswer = {
                    label: optionsObj.optionContent,
                    data: [parseInt(optionsObj.optionAnswer)],
                    backgroundColor: [

                      "rgba(0, 208, 0, 1)",
                      "rgba(0, 0, 255, 1)",
                      "rgba(255, 0, 0, 1)",
                      "rgba(255, 255, 0, 1)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                    ],
                  };
                  questionChart.push(optionAnswer);
                });
                setupChartData.labels = [""];
                setupChartData.question_label = dataObj.label;
                setupChartData.type = "grid";
                setupChartData.datasets = questionChart;
              }
                setChartDataList(chartDataList => [...chartDataList, setupChartData]);
            }
            else{
              const setupChartData = {};

              if (dataObj.repetition === "single") {

                setupChartData.question_label = dataObj.label;
                setupChartData.type = "text";
                setupChartData.repetition = "single";
                setupChartData.content = dataObj.content;
                let studentAnswerObj = {
                   studentName : "",
                   studentAnswer: dataObj.studentTextAnswer
                 };
                setupChartData.textAnswer = [studentAnswerObj];
              }
              else{

                 let studentAnswerArray = [];

                  for (const AnswersObj of dataObj.studentTextAnswer) {
                    let studentAnswerObj = {
                         studentName : "",
                         studentAnswer: ""
                    };
                    studentAnswerObj.studentName = AnswersObj.student_name;
                    studentAnswerObj.studentAnswer = AnswersObj.optionAnswer;
                    studentAnswerArray.push(studentAnswerObj);
                  }

                  setupChartData.question_label = dataObj.label;
                setupChartData.type = "text";
                setupChartData.repetition = "multiple";
                setupChartData.content = dataObj.content;
                setupChartData.textAnswer = studentAnswerArray;
              }
              setChartDataList(chartDataList => [...chartDataList, setupChartData]);
            }
          });

        });
      openForm_Instructions();
    };
    DisplayPerformance();
  }, []);

  const openForm_Instructions = () => {

                document.getElementById("perfSurvey").style.display = "block";

        };
  const closeForm_Instructions = () => {

                document.getElementById("perfSurvey").style.display = "none";
                onCloseChange();
        };
  return (
    <div id="perfSurvey" key={103}>
      {
        chartDataList.length > 0 && (
        chartDataList.map((val, idx) => (

              val.type === "grid" ? <DisplayQuestionChart key={idx} val={val}/> : <DisplayQuestionAnswer key={idx} val={val}/>

            ))
        )
      }
      <div align="center" className="button-cancel" key="button-cancel">
        <input type="submit" className="btn-danger" onClick={(id) =>closeForm_Instructions()}  value="Close Survey" />
      </div>
    </div>
  );

};

export default StudentSurveyChart;
