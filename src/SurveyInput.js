import React, {useState} from 'react';
import PropTypes from 'prop-types';

const SurveyInput = ({ idx, question, handleQuestionChange: handleQuestionChange }) => {
    const questionID = `name-${idx}`;

    const blankOption= { name: '', type:'' };
    const [option, setOption] = useState([
        { ...blankOption },
    ]);

     const addOption = () => {
        setOption([...option, { ...blankOption }]);
    };

     const handleOptionChange = (e) => {
        const updateOption = [...option];
        updateOption[e.target.dataset.idx][e.target.className] = e.target.value;
        setOption(updateOption);
    };

    return (
        <div key={`question-${idx}`}>

            <label htmlFor={questionID}>{`Question #${idx + 1}`}</label>
            <input
                type="text"
                name={questionID}
                data-idx={idx}
                id={questionID}
                className="name"
                value=""
                onChange={handleQuestionChange}
            />
            <input
                type="button"
                value="Add another sub-question"
                onClick={addOption}
            />

            {
                option.map((val, idx) => (
                    <MultipleQuestionInput
                        key={`option-${idx}`}
                        idx={idx}
                        question={question}
                        handleOtionChange={handleOptionChange}
                    />
                ))
            }
        </div>
    );
};

const MultipleQuestionInput = ({ idx, option, handleOptionChange: handleOptionChange }) => {
    const OptionID = `name-${idx}`;
    return (
        <div key={`option-${idx}`}>
            <input
                type="text"
                name={OptionID}
                data-idx={idx}
                id={OptionID}
                className="name"
                value={option[idx]}
                onChange={handleOptionChange}
            />
        </div>
    );
};

SurveyInput.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.array,
    handleQuestionChange: PropTypes.func,
};

MultipleQuestionInput.propTypes = {
    idx: PropTypes.number,
    option: PropTypes.array,
    handleOptionChange: PropTypes.func,
};

export default SurveyInput;

