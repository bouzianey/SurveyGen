import React, { useState } from "react";
import PropTypes from 'prop-types';
import OptionComponent from "./OptionResponse";


const RadioComponent = ({ i, question}) => {

  return (
     <div key={`{question.label}`}>
        <p>
        <h6 htmlFor='{QuestionID}'>{question.label}</h6>
        </p>
         <table className="table-grid" border={0}>
             <thead align="center">
                <tr>
                        <th></th>
                        <th>Strongly disagree</th>
                        <th>Disagree</th>
                        <th>Neutral</th>
                        <th>Agree</th>
                        <th>Strongly agree</th>
                </tr>
            </thead>
            <tbody align="center">
      {question.options &&
        question.options.map((option, idx) => (
          <>
            { <OptionComponent i ={i} option={option} /> }
          </>
        ))}
            </tbody>
        </table>
    </div>
  );
};

RadioComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
};


export default RadioComponent;