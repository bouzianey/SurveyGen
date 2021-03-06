import React, { useState } from "react";
import './styling.css'

const ClassForm = ({user, onChangeClose}) =>{

        const [ClassNameState, setClassNameState] = useState("");
        const [classSuccessState, setClassSuccessState] = useState("");
        const [displayClassList, setdisplayClassList] = useState(true);
        const [classList, setClassList] = useState([]);
        const [ClassErrorsState, setClassErrorsState] = useState("");

        const formValid = () => {

              let valid = true;

                // validate form errors being empty
                ClassErrorsState.length > 0 && (valid = false);
                // validate the form was filled out
                if(ClassNameState === "") {

                    valid = false;
                }
            return valid;
        };
        const addClass = () => {

            if (formValid() === true) {
                const objectToSend = {
                    id: user.id,
                    className: ClassNameState
                }
                fetch("https://survey-manager-yb-scsu.herokuapp.com/add_class_post", {
                    method: "POST",
                    //mode: "no-cors",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(objectToSend),
                })
                    .then((res) => res.json())
                    .then((res) => {

                        if (res === "success") {
                            setClassErrorsState("");
                            setClassSuccessState("Class was successfully created");
                        } else {
                            setClassErrorsState("Class already exists");
                            setClassSuccessState('');
                        }
                    });
            }
            else
            {
                if(ClassErrorsState.length === 0){

                    setClassErrorsState("Minimum 3 characters required");
                }
            }
      };
        const getClassList = e => {

            const objectToSend1 = {
                id : user.id
            }
        fetch("https://survey-manager-yb-scsu.herokuapp.com/get_class_list", {
            method: "POST",
            //mode: "no-cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectToSend1),
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.result === "success"){
                    setClassList(res.classList);
                }
            });
            setdisplayClassList(false);
    }
        const handleClassNameChange = e => {

            setClassNameState(e.target.value);
             if( e.target.value.length < 3) {
                 setClassErrorsState("minimum 3 characters required")
             }
             else
             {
                 setClassErrorsState("")
             }
        };
        const handleCloseChange = e =>{
            onChangeClose();
        };

  return (

            <div key={123}>
                {
                    displayClassList === true ? getClassList() : ""
                }
                <div align="center" className="className" key="class_Name_class">
                    <h5>Type a Class name :</h5>
                    <input
                        type="text"
                        name="className"
                        className={ClassErrorsState.length > 0 ? "error" : ""}
                        id="className"
                        key="className"
                        placeholder="Class Name"
                        value={ClassNameState}
                        onChange={handleClassNameChange}
                    />
                    {ClassErrorsState.length > 0 && (
                            <span className="errorMessage">{ClassErrorsState}</span>
                    )}
                </div>
                <br/>
                <h5>Look up Class :</h5>
                <div align="center" className="classList" key="lookup_class">
                    <select name="className" id="111">
                            {
                                classList.map((val, idx) => (

                                    <option value={val.classID} key={idx}>{val.className}</option>
                                ))
                             }
                    </select>
                </div>
                <br/>
                <br/>
                <div align="center" className="add-class" key="add_class">
                    <table align="center" border={0} id="22" key={22}>
                        <tbody>
                             <tr>
                               <td> <input type="submit" className="btn-primary" onClick={(id) =>addClass()} value="Create New Class" /></td>
                             </tr>
                        </tbody>
                    </table>
                </div>
                <div align={"center"}>
                    {classSuccessState.length > 0 && (
                        <span className="badge-success">{classSuccessState}</span>
                    )}
                </div>
            </div>
  );
}

export default ClassForm;