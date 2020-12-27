import React, { useState } from "react";
import './styling.css';

const TeamForm = ({user,onChangeClose}) =>{

    const [teamNameState, setteamNameState] = useState("");
    const [classIdState, setClassIdState] = useState("");
    const [classList, setClassList] = useState([]);
    const [displayClassList, setdisplayClassList] = useState(true);
    const [formErrorsState, setformErrorsState] = useState("");

      const formValid = () => {

          let valid = true;

            // validate form errors being empty
            formErrorsState.length > 0 && (valid = false);
            // validate the form was filled out
            if(teamNameState === "") {

                valid = false;
            }
        return valid;
  };

    const getClassList = e => {

            const objectToSend = {
                id : user.id
            }
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_list", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend),
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.result === "success"){

                    setClassList(res.classList);
                    for(let it of res.classList){
                        setClassIdState(it.classID);
                        break
                    }
                }
                else
                {
                    console.log("class : ",res.result);
                }

            });
            setdisplayClassList(false);
    }

    const addTeam = () => {

        if (formValid() === true) {

            const objectToSend2 = {
                id: classIdState,
                teamName: teamNameState
            }
            fetch("https://survey-manager-yb-scsu.herokuapp.com/add_team_post", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(objectToSend2),
            })
                .then((res) => res.json())
                .then((res) => {
                    if(res === "failed")
                    {
                        setformErrorsState("Team already exists");
                    }
                    else
                    {
                        setformErrorsState("");
                    }
                });
        }
        else {
                if(formErrorsState.length === 0){
                    setformErrorsState("Minimum 3 characters required");
                }
        }
      };
    const handleTeamNameChange = e => {

            setteamNameState(e.target.value);
            if(e.target.value.length < 3){
                setformErrorsState("Minimum 3 characters required");
            }else
            {
                setformErrorsState("");
            }
    };
    const handleSelectChange = e => {

        setClassIdState(e.target.value);

    };
  return (
    <div key={124}>
                {
                    displayClassList === true ? getClassList() : ""
                }
                <div align="center" className="teamName" key={2934}>
                    <h5>Type a Team name :</h5>
                    <input
                        type="text"
                        className={formErrorsState.length > 0 ? "error" : ""}
                        name="teamName"
                        placeholder="Team Name"
                        onChange={handleTeamNameChange}
                    />
                    {formErrorsState.length > 0 && (
                        <span className="errorMessage">{formErrorsState}</span>
                    )}
                </div>
                <br/>
                <div align="center" className="className" key={2373}>
                    <h5>Choose a Class for this team : </h5>
                    <select onChange={handleSelectChange} value={classIdState} name="className" id="111">
                        {
                            classList.map((val, idx) => (

                                <option key={idx} value={val.classID}>{val.className}</option>
                            ))
                         }
                    </select>
                </div>
                <br/>
                <br/>
                <div align="center" className="add-team" key={34728}>
                    <table border={0} id="22" key={22}>
                        <tbody>
                         <tr>
                           <td><input type="submit" className="btn-primary" onClick={(id) =>addTeam()} value="Create New Team" /></td>
                         </tr>
                        </tbody>
                    </table>
                </div>
    </div>
  );
}

export default TeamForm;