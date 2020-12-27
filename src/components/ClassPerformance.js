import React, { useState } from "react";
import './styling.css'

const ClassPerformance = ({user,OnEnableClass,OnEnableTeam,OnEnableStudent}) =>{

        const [classIdState, setClassIdState] = useState("");
        const [surveyIdState, setSurveyIdState] = useState("");
        const [classList, setClassList] = useState([]);
        const [classSurveyList, setClassSurveyList] = useState([]);
        const [displayClassList, setDisplayClassList] = useState(true);


         const getClassList = e => {

            const objectToSend = {
                id : user.id,
            }
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_list", {
                method: "POST",
                mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend),
            })
              //.then((res) => res.json())
              .then((res) => {

                    if (res.result === "success"){

                    setClassList(res.classList);
                    for(let it of res.classList){
                        setClassIdState(it.classID);
                        getClassSurveyList(it.classID);
                        break
                        }
                    }
                    else
                    {
                        console.log("class : ",res.result);
                    }
              });
            setDisplayClassList(false);
      };
        const getClassSurveyList = (classID) => {

            const objectToSend1 = {
                class_id : classID,
                user_id : user.id
            }
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_survey_list", {
                method: "POST",
                mode: "no-cors",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend1),
            })
              //.then((res) => res.json())
              .then((res) => {

                    if (res.result === "success"){

                        setClassSurveyList(res.surveyList);
                        for(let it of res.surveyList){
                            setSurveyIdState(it.surveyID);
                            break
                        }
                    }
                    else
                    {
                        console.log("Survey  :",res.result);
                    }
              });
      };
        const DisplayPerformance = (e) => {
                e.preventDefault();
                console.log("class ID :",classIdState,"survey ID :", surveyIdState);
        };
        const handleSelectClassChange = e => {

            setClassIdState(e.target.value);
            getClassSurveyList(e.target.value);
        };
        const handleSelectSurveyChange = e => {

            setSurveyIdState(e.target.value);
        };
        const handleEnableStudentChange = e =>{
            OnEnableStudent();
        };
        const handleEnableTeamChange = e =>{
            OnEnableTeam();
        };
        const handleEnableClassChange = e =>{
            OnEnableClass();
        };

  return (
            <form onSubmit={DisplayPerformance}>

                <div id="survey_manager">
                {
                    displayClassList === true ? getClassList() : ""
                }
                <table>
                    <thead>
                         <tr tr key={21}>
                            <th><input type="submit" className="btn-primary" onClick={(id) =>handleEnableClassChange()}  value="class" /></th>
                            <th><input type="submit" className="btn-primary" onClick={(id) =>handleEnableTeamChange()}  value="Team" /></th>
                            <th><input type="submit" className="btn-primary" onClick={(id) =>handleEnableStudentChange()}  value="Student" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={22}>
                            <td>
                                 <label htmlFor="surveyName">Choose a Class :</label>
                            </td>
                            <td>
                                <select onChange={handleSelectClassChange} value={classIdState} name="className" id="111">
                                    {
                                        classList.map((val, idx) => (

                                            <option value={val.classID}>{val.className}</option>
                                        ))
                                     }
                                </select>
                            </td>
                        </tr>
                        <tr key={23}>
                            <td>
                                <label htmlFor="SurveyName">Choose a Survey : </label>
                            </td>
                            <td>
                                <select onChange={handleSelectSurveyChange} value={surveyIdState} name="surveyName" id="222">
                                    {
                                        classSurveyList.map((val, idx) => (

                                            <option value={val.surveyID}>{val.surveyName}</option>
                                        ))
                                     }
                                </select>
                            </td>
                        </tr>
                        <tr key={24}>
                            <td colSpan={2}>
                                <input type="submit" className="btn-primary" value="Display Performance" />
                            </td>
                        </tr>
                    </tbody>
               </table>
            </div>

            </form>
  );
}

export default ClassPerformance;