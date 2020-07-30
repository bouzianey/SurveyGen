import React, { useState } from "react";
import './popup_window.css';

const ClassForm = ({user, onChangeClose}) =>{

        const [ClassNameState, setClassNameState] = useState("");


        const addClass = e => {
            e.preventDefault();
            const objectToSend = {
                id : user.id,
                className: ClassNameState
            }
            fetch("http://localhost:5000/add_class_post", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend),
            })
              .then((res) => res.json())
              .then((res) => {
                    console.log(res);
              });
      };
        const handleClassNameChange = e => {

            setClassNameState(e.target.value);
        };
        const handleCloseChange = e =>{
            onChangeClose();
        };

  return (

            <form onSubmit={addClass}>
                <label htmlFor="surveyName">Type a Class name :</label>
                <input
                    type="text"
                    name="className"
                    id="className"
                    value={ClassNameState}
                    onChange={handleClassNameChange}
                />
                <table border={0} id="22">
             <tr>
               <td> <input type="submit" className="btn-cancel" onClick={handleCloseChange} value="Close"/></td>
               <td> <input type="submit" className="btn-primary" value="Add" /></td>
             </tr>
                </table>
            </form>
  );
}

export default ClassForm;