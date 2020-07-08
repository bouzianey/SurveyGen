import React from "react";
import PropTypes from 'prop-types';


const MultipleQuestionInput = ({ idx, option, handleOptionChange }) => {
    const OptionID = `sub-option-${idx}`;
    return (
        <div key={`option-${idx}`}>
            <input
                type="text"
                name={OptionID}
                data-idx={idx}
                id={OptionID}
                className="name"
                value={option.value}
                onChange={handleOptionChange}
            />
        </div>
    );
};

MultipleQuestionInput.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.object,
    handleOptionChange: PropTypes.func,
};

export default MultipleQuestionInput;