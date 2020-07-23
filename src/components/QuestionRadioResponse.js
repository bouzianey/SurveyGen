import React, { useState } from "react";
import PropTypes from 'prop-types';
import OptionComponent from "./OptionResponse";


const RadioComponent = ({ i, question}) => {

  return (
     <div key={`{question.label}`}>
        <p>
        <label htmlFor='{QuestionID}'>{question.label}</label>
        </p>
         <p>
      {question.options &&
        question.options.map((option, idx) => (
          <>
            { <OptionComponent i ={i} option={option} /> }
          </>
        ))}
        </p>
    </div>
  );
};

RadioComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
};


export default RadioComponent;