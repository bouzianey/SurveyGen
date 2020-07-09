import React, { useState } from 'react';
import SurveyInput from './SurveyInput';

const Form = () => {
    const [instructorState, setInstructorState] = useState({
        Instructor: '',
    });
    const [SurveyNameState, setSurveyNameState] = useState({
        surveyName: '',
    });

    const handleInstructorChange = (e) => setInstructorState({
        [e.target.name]: e.target.value
    })

    const handleSurveyNameChange = (e) => setSurveyNameState({
        [e.target.name]: e.target.value
    });


    const [questionType, setQuestionType] = useState('radio');
    const handleSelectChange = e => setQuestionType(e.target.value);

    const [questionRepetition, setQuestionRepetition] = useState('multiple');
    const handleQuestionRepetitionChange = e => setQuestionRepetition(e.target.value);

    const [question, setQuestion] = useState([]);

    const addQuestion = () => {
        const newQuestion = {  label: `Question #${question.length+1}`, type: questionType , Repetition: questionRepetition }
        if(questionType === 'radio') newQuestion.options = [{content:'', label:''}];
        else newQuestion.content=  '';
        setQuestion([...question, newQuestion]);
    };

    const handleQuestionChange = (newQuestion, idx) => {
        const newQuestions = [...question];
        newQuestions[idx].options = newQuestion;
        setQuestion(newQuestions);

    }

    const handleTextContentChange = (e, idx) => {

        const newQuestions = [...question];
        newQuestions[idx].content = e.target.value;
        setQuestion(newQuestions);

    };

    const submit = e => {
        e.preventDefault();
        const objectToSend = {
            survey: SurveyNameState.surveyName,
            instructor: instructorState.Instructor,
            questionList: question
        }
        // axios.post("python endpoint", )
        console.log(objectToSend);
    }

    return (
        <form onSubmit={submit}>
            <label htmlFor="Instructor">Instrcutor:</label>
            <input
                type="text"
                name="Instructor"
                id="Instructor"
                value={instructorState.Instructor}
                onChange={handleInstructorChange}
            />
            <label htmlFor="surveyName">Survey Name:</label>
            <input
                type="text"
                name="surveyName"
                id="surveyName"
                value={SurveyNameState.surveyName}
                onChange={handleSurveyNameChange}
            />
            <label htmlFor="QuestionType">Choose Your Question Type:</label>
            <select onChange={handleSelectChange} value={questionType} name="questionType" id="questionType">
                <option value="radio">Radio</option>
                <option value="text">Text</option>
            </select>
            <label htmlFor="QuestionRepetition">will the question repeat ?:</label>
            <select onChange={handleQuestionRepetitionChange} value={questionRepetition} name="questionRepetition" id="questionRepetition">
                <option value="multiple">multiple</option>
                <option value="single">Once</option>
            </select>
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
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;


