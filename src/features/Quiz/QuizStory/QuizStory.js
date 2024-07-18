import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuesSeen, stopStorySeen } from '../QuizSlice';
import './QuizStory.css'; // Import the custom CSS file

export default function QuizStory() {
    const dispatch = useDispatch();

    const handleLetsAns = () => {
        dispatch(stopStorySeen());
        dispatch(setQuesSeen());
    };

    return (
        <div className="quiz-story-container main" style={{}}>
            
            <div className="story-body">
            <div className="story-header">
                <h2 className="header-title  text-secondary " style={{fontFamily:''}}>The Hadith</h2>
                <hr />
            </div>
                <p className="story-content">

                lorem5 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam suscipit recusandae saepe ipsum enim aliquid laboriosam ipsa hic, consequuntur fuga animi, ratione distinctio temporibus dignissimos laudantium tempore quo aliquam nihil?    আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম -এর বাণীঃ ইসলামের স্তম্ভ হচ্ছে পাঁচটিঃ মুখে স্বীকার এবং কাজে পরিণত করাই হচ্ছে ঈমান এবং তা বৃদ্ধি পায় ও হ্রাস পায়।* আল্লাহ্ তা’আলা বলেনঃ ’’যাতে তারা তাদের ঈমানের সঙ্গে ঈমান মজবুত করে নেয়- (সূরাহ্ ফাত্হ ৪৮/৪)। আমরা তাদের সৎ পথে চলার শক্তি বাড়িয়ে দিয়েছিলাম- (সূরাহ্ কাহাফ ১৮/১৩)। এবং যারা সৎপথে চলে আল্লাহ্ তাদের অধিক হিদায়াত দান করেন- (সূরাহ্ মারইয়াস ১৯/৭৬)। এবং যার
                </p>
                <button className="start-quiz-button" onClick={handleLetsAns}>Let's Answer</button>
            </div>
        </div>
    );
}
