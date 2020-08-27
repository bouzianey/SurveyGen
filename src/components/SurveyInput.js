import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MultipleQuestionInput from './MultipleQuestionInput';

const SurveyInput = ({ idx, question, handleQuestionChange, handleTextContentChange }) => {

    const questionID = `name-${idx}`;
    const NewTextContent = '';
    const [TextContent, setTextContent] = useState(question.content || '');

    const blankOption= { content:'', label:'' };
    const [option, setOption] = useState(question.options);

     const addOption = () => {
        setOption([...option, { ...blankOption }]);
    };

     const handleOptionChange = (e) => {
        const updateOption = [...option];
        updateOption[e.target.dataset.idx]['content'] = e.target.value;
        updateOption[e.target.dataset.idx]['label'] = e.target.dataset.idx;
        handleQuestionChange(updateOption, idx)

    };

     const handleTextChange = (e) => {

         setTextContent(e.target.value);
        handleTextContentChange(e.target.value, idx);

    };

     const getRadioQuestion = () => <div align="center" key={`question-${idx}`}>

            <h6 htmlFor={questionID}>{question.label} </h6>
            <input
                type="button"
                value="Add another option"
                onClick={addOption}
            />

            {
                option.map((val, idx) => (
                    <MultipleQuestionInput
                        key={`option-${idx}`}
                        idx={idx}
                        option={val}
                        handleOptionChange={handleOptionChange}
                    />
                ))
            }
            <br/>
            </div>

    const getTextQuestion = () => <div align="center" key={`question-${idx}`}>

                <h6 htmlFor={questionID}>{question.label}</h6>
                <input
                    type="text"
                    className={TextContent.length === 0 ? "error" : null}
                    data-idx={idx}
                    id={ContentID}
                    value={TextContent}
                    onChange={handleTextChange}
                />
                {TextContent.length === 0 && (
                    <span className="errorMessage">*</span>
                )}
                <br/>
            </div>
            const ContentID = `sub-content-${idx}`;
    return (

        <>
            { question.type === "radio" && getRadioQuestion()}
            {question.type === "text" && getTextQuestion()}
        </>

    );
};

SurveyInput.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};

export default SurveyInput;


