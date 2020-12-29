import React, {useEffect, useState} from "react";
import './styling.css'



const TeamPerformanceCont = ({ user, dataobj}) =>{

    const [notificationState, setNotificationState] = useState("");

    const notify_User = () =>{

        const objectToSend = {
                studentID : dataobj.studentID,
                studentName : dataobj.studentName,
                surveyList : dataobj.missed_survey
            }
        setNotificationState("success");
        fetch("https://survey-manager-yb-scsu.herokuapp.com/notify_student_missed_surveys", {
            method: "POST",
            //mode: "no-cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend),
        })
            .then((res) => res.json())
            .then((res) => {

            });
    }
  return (
      <div id="test" key={397}>
          <h5 key={dataobj.studentName}>{dataobj.studentName}</h5>
          <select name="teamName" id="222" key={739}>
              {
                  dataobj.missed_survey.map((val, idx) => (

                      <option key={idx.toString()+20}>{val}</option>
                  ))
              }
          </select>
          <input  type="button" className="btn-warning" onClick={(id) =>notify_User()}  value="Notify Student" />
          {notificationState.length > 0 && (
                    <span className="badge-success">Sent!</span>
                )}
      </div>
  );
}
export default TeamPerformanceCont;