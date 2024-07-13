import React from 'react';
import './QuizStory.css'; // Import the custom CSS file
import { useDispatch } from 'react-redux';
import { setQuesSeen, stopStorySeen } from '../QuizSlice';

export default function QuizStory() {
    const dispatch = useDispatch();

    const handleLetsAns = () => {
      dispatch(stopStorySeen());
      dispatch(setQuesSeen());
    };

  return (
    <div className="story-container pt-sm-0 mt-md-2 p-2 main">
      <div className="story-card shadow">
        <div className="story-header">
          <h3 className="story-title">Story Title</h3>
        </div>
        <div className="story-body pb-5">
          <p className="story-content">
          আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম -এর বাণীঃ ইসলামের স্তম্ভ হচ্ছে পাঁচটিঃ মুখে স্বীকার এবং কাজে পরিণত করাই হচ্ছে ঈমান এবং তা বৃদ্ধি পায় ও হ্রাস পায়।* আল্লাহ্ তা’আলা বলেনঃ ’’যাতে তারা তাদের ঈমানের সঙ্গে ঈমান মজবুত করে নেয়- (সূরাহ্ ফাত্হ ৪৮/৪)। আমরা তাদের সৎ পথে চলার শক্তি বাড়িয়ে দিয়েছিলাম- (সূরাহ্ কাহাফ ১৮/১৩)। এবং যারা সৎপথে চলে আল্লাহ্ তাদের অধিক হিদায়াত দান করেন- (সূরাহ্ মারইয়াম ১৯/৭৬)। এবং যারা সৎপথ অবলম্বন করে আল্লাহ্ তাদের হিদায়াত বাড়িয়ে দেন এবং তাদের সৎপথে চলার শক্তি বাড়িয়ে দেন- (সূরাহ্ মুহাম্মাদ ৪৭/১৭)। যাতে মু’মিনদের ঈমান বেড়ে
          </p>
          <button className="start-quiz-button" onClick={handleLetsAns }>Let's Answer</button>
        </div>
      </div>
    </div>
  );
}
