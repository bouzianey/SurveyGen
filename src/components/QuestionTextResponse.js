import React, { useState } from "react";
import PropTypes from 'prop-types';



const TextComponent = ({ question}) => {

  return (
      <div>
          <p><label htmlFor='{question.id}'>{question.label}  :  {question.student_name}</label></p>
          <p><label htmlFor='{question.id}1'>{question.content}</label>
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