import React, { useState } from "react";
import PropTypes from 'prop-types';



const TextComponent = ({ question}) => {

  return (
      <div>
          <p><h6 htmlFor='{question.id}'>{question.label}  :  {question.student_name}</h6></p>
          <p><h5 htmlFor='{question.id}1'>{question.content}</h5>
          <input
              type="text"
              name='text'
              className="name"
              value=""
          />
          </p>
      </div>
  );
};


TextComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};

export default TextComponent;