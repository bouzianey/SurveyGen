import React, {useEffect, useState} from 'react';
import SurveyInput from './SurveyInput';
import "./styling.css";

const Form = ({surveyModification, user, closeForm_SurveyMod}) => {

    const [surveyErrorState, setSurveyErrorState] = useState("");
    const [surveySuccessState, setSurveySuccessState] = useState("");
    const [formErrorsState, setformErrorsState] = useState([]);

    const [SurveyNameState, setSurveyNameState] = useState("");
    const [question, setQuestion] = useState(surveyModification.questionList);

    const [questionType, setQuestionType] = useState('radio');
    const handleSelectChange = e => setQuestionType(e.target.value);

    const [questionRepetition, setQuestionRepetition] = useState('multiple');
    const handleQuestionRepetitionChange = e => setQuestionRepetition(e.target.value);

    useEffect(() => {

            formErrorsState.push({check_point: "invalid"});
            Object.values(surveyModification.questionList).forEach(val => {
            formErrorsState.push({check_point: "valid"});
        });

    }, []);
    const handleSurveyNameChange = (e) =>
    {
        setSurveyNameState(e.target.value);

        if(e.target.value.length === 0){

            formErrorsState[0].check_point= "invalid";
        }
        else
        {
            formErrorsState[0].check_point= "valid";
        }
    }

    const formValid = () => {

        let valid = true;
        console.log(formErrorsState);
        // validate form errors being empty & the form was filled out
        Object.values(formErrorsState).forEach(val => {
          val.check_point === "invalid" && (valid = false);
        });

        return valid;
    };
    const addQuestion = () => {
        const newQuestion = {  label: `Question #${question.length+1}`, type: questionType , repetition: questionRepetition }
        if(questionType === 'radio') newQuestion.options = [{content:'', label:''}];
        else newQuestion.content=  '';

        formErrorsState.push({check_point: "invalid"});
        setQuestion([...question, newQuestion]);
    };

    const addInitialQuestion = (questionMod) => {
        setQuestion(prev => [...prev, questionMod]);

    };

    const handleQuestionChange = (newQuestion, idx) => {
        const newQuestions = [...question];
        let checker = "valid";

        newQuestions[idx].options = newQuestion;
        setQuestion(newQuestions);

        Object.values(newQuestions[idx].options).forEach(val => {
          val.content.length === 0 && (checker = "invalid");
        });
        if(checker === "valid"){
            formErrorsState[idx+1].check_point = "valid";
        }
        else{
            formErrorsState[idx+1].check_point = "invalid";
        }

    }

    const handleTextContentChange = (val, idx) => {

        const newQuestions = [...question];
        newQuestions[idx].content = val;
        setQuestion(newQuestions);

        if(val.length === 0){

            formErrorsState[idx+1].check_point= "invalid";
        }
        else
        {
            formErrorsState[idx+1].check_point= "valid";
        }

    };

    const submit = (e) => {

        e.preventDefault();
        if(formValid()){

                const objectToSend = {
                id: user.id,
                survey: SurveyNameState,
                instructor: "",
                questionList: question
            }

            setSurveySuccessState("Survey was successfully created");

            fetch('https://survey-manager-yb-scsu.herokuapp.com/add_survey_api', {
                method: 'POST',
                //mode: "no-cors",
                headers: {
                'Content-type': 'application/json',
            },
                body: JSON.stringify(objectToSend),
            })
        }else
        {
            setSurveyErrorState("Error ! There should be some missing fields in your form");
        }
    }

    return (
            <form onSubmit={submit}>
                <h5 htmlFor="surveyName">Survey Name:</h5>
            <input
                type="text"
                className={SurveyNameState.length === 0 ? "error" : null}
                id="surveyName"
                value={SurveyNameState}
                onChange={handleSurveyNameChange}
            />
            {SurveyNameState.length === 0 && (
                <span className="errorMessage">*</span>
            )}
            <h5 htmlFor="QuestionType">Choose Your Question Type:</h5>
            <select onChange={handleSelectChange} value={questionType} name="questionType" id="questionType">
                <option value="radio">Grid</option>
                <option value="text">Text</option>
            </select>
            <br/>
            <h5 htmlFor="QuestionRepetition">will the question be addressed to ?:</h5>
            <select onChange={handleQuestionRepetitionChange} value={questionRepetition} name="questionRepetition" id="questionRepetition">
                <option value="multiple">Team</option>
                <option value="single">student</option>
            </select>
            <br/>
            <input
                type="button"
                value="Add New Question"
                className="btn-outline-success"
                onClick={addQuestion}
            />
            <br/>
            <br/>
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
                <br/>
                <br/>
                <div align="center" key="save-btn">
                    <input align="center" type="button" className="btn-danger" onClick={closeForm_SurveyMod} value="Close Survey"/>
                    <input align="center" type="submit" className="btn-primary" value="Save Survey" />
                </div>
                <br/>
                {surveyErrorState.length > 0 && (
                    <span className="errorMessage">{surveyErrorState}</span>
                )}
                {surveySuccessState.length > 0 && (
                    <span className="badge-success">{surveySuccessState}</span>
                )}
            </form>
    );
};

export default Form;


