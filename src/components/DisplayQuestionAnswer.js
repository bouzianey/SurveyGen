import React from "react";
import "./styling.css";

const DisplayQuestionAnswer = ({val}) => {

    const getTextQuestionAnswer = () => <div key={val.question_label}>

        <h4 key={val.content+1} align="center">{val.question_label}</h4>
        <h4 className="h4-style" key={val.content} align="center">{val.content}</h4>
        {
            val.textAnswer.map((v, idx) => (

            <p key={idx.toString()+v.studentName} align="center">
               <b>
                    {v.studentName }
                    {
                        v.studentName ? " :  " : ""
                    }
                </b>
                {v.studentAnswer}
            </p>

            ))
        }

            </div>
  return (

      <>
            {val.type === "text" && getTextQuestionAnswer()}
      </>
  );
};

export default DisplayQuestionAnswer;