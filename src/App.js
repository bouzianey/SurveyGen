import React, { useState } from 'react';
import SurveyInput from './SurveyInput';

const Form = () => {
    const [instructorState, setInstructorState] = useState({
        Instructor: '',
        surveyName: '',
    });

    const handleOwnerChange = (e) => setInstructorState({
        ...instructorState,
        [e.target.name]: [e.target.value],
    });

    const blankQuestion = { name: '', type:""};
    const [question, setQuestion] = useState([
        { ...blankQuestion },
    ]);

    const addQuestion = () => {
        setQuestion([...question, { ...blankQuestion }]);
    };

    const handleQuestionChange = (e) => {
        const updateQuestion = [...question];
        updateQuestion[e.target.dataset.idx][e.target.className] = e.target.value;
        setQuestion(updateQuestion);
    };

    return (
        <form>
            <label htmlFor="Instructor">Instrcutor:</label>
            <input
                type="text"
                name="owner"
                id="owner"
                value={instructorState.Instructor}
                onChange={handleOwnerChange}
            />
            <label htmlFor="surveyName">Survey Name:</label>
            <input
                type="text"
                name="description"
                id="description"
                value={instructorState.surveyName}
                onChange={handleOwnerChange}
            />
            <input
                type="button"
                value="Add New Question"
                onClick={addQuestion}
            />
            {
                question.map((val, idx) => (
                    <SurveyInput
                        key={`question-${idx}`}
                        idx={idx}
                        question={question}
                        handleQuestionChange={handleQuestionChange}
                    />
                ))
            }
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;