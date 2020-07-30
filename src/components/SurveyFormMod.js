import React, { useState } from 'react';
import SurveyInput from './SurveyInput';

const Form = ({surveyModification, user}) => {

    const [SurveyNameState, setSurveyNameState] = useState(surveyModification.surveyName);
    const handleSurveyNameChange = (e) => setSurveyNameState(e.target.value);


    const [questionType, setQuestionType] = useState('radio');
    const handleSelectChange = e => setQuestionType(e.target.value);

    const [questionRepetition, setQuestionRepetition] = useState('multiple');
    const handleQuestionRepetitionChange = e => setQuestionRepetition(e.target.value);

    const [question, setQuestion] = useState(surveyModification.questionList);

    const addQuestion = () => {
        const newQuestion = {  label: `Question #${question.length+1}`, type: questionType , repetition: questionRepetition }
        if(questionType === 'radio') newQuestion.options = [{content:'', label:''}];
        else newQuestion.content=  '';
        setQuestion([...question, newQuestion]);
    };

    const addInitialQuestion = (questionMod) => {
        setQuestion(prev => [...prev, questionMod]);

    };

    const handleQuestionChange = (newQuestion, idx) => {
        const newQuestions = [...question];
        newQuestions[idx].options = newQuestion;
        setQuestion(newQuestions);

    }

    const handleTextContentChange = (val, idx) => {

        const newQuestions = [...question];
        newQuestions[idx].content = val;
        setQuestion(newQuestions);

    };

    const submit = e => {
        e.preventDefault();
        const objectToSend = {
            id: user.id,
            survey: SurveyNameState,
            instructor: "",
            questionList: question
        }

        fetch('http://localhost:5000/add_survey_api', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
        },
            body: JSON.stringify(objectToSend),
        })
    }

    return (
        <form onSubmit={submit}>
            <label htmlFor="surveyName">Survey Name:</label>
            <input
                type="text"
                name="surveyName"
                id="surveyName"
                value={SurveyNameState}
                onChange={handleSurveyNameChange}
            />
            <br/>
            <label htmlFor="QuestionType">Choose Your Question Type:</label>
            <select onChange={handleSelectChange} value={questionType} name="questionType" id="questionType">
                <option value="radio">Grid</option>
                <option value="text">Text</option>
            </select>
            <br/>
            <label htmlFor="QuestionRepetition">will the question be addressed to ?:</label>
            <select onChange={handleQuestionRepetitionChange} value={questionRepetition} name="questionRepetition" id="questionRepetition">
                <option value="multiple">Team</option>
                <option value="single">student</option>
            </select>
            <br/>
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
                        question={val}
                        handleQuestionChange={handleQuestionChange}
                        handleTextContentChange={handleTextContentChange}
                    />
                ))
            }
            <input type="submit" className="btn-primary" value="Save" />
        </form>
    );
};

export default Form;


