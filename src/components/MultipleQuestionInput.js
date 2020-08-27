import React from "react";
import PropTypes from 'prop-types';


const MultipleQuestionInput = ({ idx, option, handleOptionChange }) => {
    const OptionID = `sub-option-${option.content}`;
    return (
        <div align="center" key={`option-${idx}`}>
            <input
                type="text"
                name={OptionID}
                data-idx={idx}
                id={OptionID}
                className={option.content.length === 0 ? "error" : null}
                value={option.content}
                onChange={handleOptionChange}
            />
            {option.content.length === 0 && (
                <span className="errorMessage">*</span>
            )}
        </div>
    );
};

MultipleQuestionInput.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
    handleOptionChange: PropTypes.func,
};

export default MultipleQuestionInput;