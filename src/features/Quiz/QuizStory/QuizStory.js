import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuesSeen, stopStorySeen, setQuestion, setFirstAns, setSecondAns, setQuestionId, setQuizPage } from '../QuizSlice';
import './QuizStory.css'; // Import the custom CSS file
import { useGetRandomQuestionMutation } from '../../../services/quizApi';

export default function QuizStory() {
    // Extract the `hadithId` and `hadithData` from the Redux store
    const { hadithId, hadithData,quiz_page } = useSelector((state) => state.quiz);
    const dispatch = useDispatch();

    // State to manage the fetch trigger
    const [fetchTriggered, setFetchTriggered] = useState(false);

    // Fetch random question and answers using RTK Query
    const [getRandomQuestion, { data: questionData,isLoading: getRandomQuestionisLoading, isError:getRandomQuestionisError,isSuccess:getRandomQuestionisSuccess }] = useGetRandomQuestionMutation();


    const handleLetsAns = () => {
        setFetchTriggered(true); // Set state to trigger fetch
        getRandomQuestion(hadithId) // Manually trigger the POST request
            .unwrap()
            .then((response) => {
                if (response) {
                    console.log(response);
                    // Dispatch actions to update Redux store
                    dispatch(setQuizPage({ quiz_page: 'ques' }));
                    dispatch(setQuestionId(response.question_id));
                    dispatch(setQuestion(response.question));
                    dispatch(setFirstAns(response.first_ans));
                    dispatch(setSecondAns(response.second_ans));
                  

                }
            })
            .catch((error) => {
                console.error('Failed to fetch question:', error);
            });
    };

    return (
        <div className="quiz-story-container main">
            <div className="story-body">
                <div className="story-header">
                    <h2 className="header-title text-secondary" style={{ fontFamily: '' }}>
                        The Hadith {quiz_page}
                    </h2>
                    <hr />
                </div>
                <p className="story-content">
                    {hadithData}
                </p>
                <button className="start-quiz-button" onClick={handleLetsAns} disabled={getRandomQuestionisLoading}>
                    {getRandomQuestionisLoading ? 'Loading...' : 'Let\'s Answer'}
                </button>
                {getRandomQuestionisError && <p>Error loading question.</p>}
            </div>
        </div>
    );
}
