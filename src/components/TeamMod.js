import React, { useState } from "react";
import './popup_window.css'
import './SignUp.css'

const TeamForm = ({user,onChangeClose}) =>{

    const [teamNameState, setteamNameState] = useState(null);
    const [classIdState, setClassIdState] = useState("");
    const [classList, setClassList] = useState([]);
    const [displayClassList, setdisplayClassList] = useState(true);
    const [formErrorsState, setformErrorsState] = useState({teamName:""});

      const formValid = () => {

          let valid = true;

            // validate form errors being empty
            Object.values(formErrorsState).forEach(val => {

              val.length > 0 && (valid = false);
            });
            // validate the form was filled out
            if(teamNameState === null) {

                valid = false;
            };
            console.log("valid state : ",valid)
        return valid;
  };

    const getClassList = e => {

            const objectToSend = {
                id : user.id
            }
        fetch("http://localhost:5000/get_class_list", {
            method: "POST",
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

    const addTeam = e => {

            e.preventDefault();
        console.log("team name : ",formErrorsState.teamName);
        if (formValid() === true) {

            const objectToSend2 = {
                id: classIdState,
                teamName: teamNameState
            }
            fetch("http://localhost:5000/add_team_post", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(objectToSend2),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                });
        }else {
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    const handleTeamNameChange = e => {

            setteamNameState(e.target.value);
            formErrorsState.teamName = e.target.value.length < 3 ? "minimum 3 characaters required" : "";
    };
    const handleSelectChange = e => {

        setClassIdState(e.target.value);

    };
    const handleCloseChange = e =>{
            onChangeClose();
        };
  return (
    <form onSubmit={addTeam}>
                {
                    displayClassList === true ? getClassList() : ""
                }
                <div className="teamName">
                    <label htmlFor="teamName">Type a Team name :</label>
                    <input
                        type="text"
                        className={formErrorsState.teamName.length > 0 ? "error" : null}
                        name="teamName"
                        placeholder="team Name"
                        noValidate
                        onChange={handleTeamNameChange}
                    />
                    {formErrorsState.teamName.length > 0 && (
                        <span className="errorMessage">{formErrorsState.teamName}</span>
                    )}
                </div>
                <label htmlFor="ClassType">Choose a Class for this team : </label>
                    <select onChange={handleSelectChange} value={classIdState} name="className" id="111">
                        {
                            classList.map((val, idx) => (

                                <option value={val.classID}>{val.className}</option>
                            ))
                         }
                    </select>
                <br/>
                <table border={0} id="22">
             <tr>
               <td> <input type="submit" className="btn-cancel" onClick={handleCloseChange} value="Close"/></td>
               <td> <input type="submit" className="btn-primary" value="Add" /></td>
             </tr>
                </table>
    </form>
  );
}

export default TeamForm;