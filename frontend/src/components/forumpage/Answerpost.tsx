import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ForumNotification from './ForumNotification'; 

const AnswerPost: React.FC = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>(); // Get questionId from URL parameters

  const handleAnswer = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("No token found. Please log in.");
      setNotificationMessage("No token found. Please log in.");
      setShowNotification(true);
      return;
    }

    if (!questionId) {
      setError("Question ID is missing.");
      setNotificationMessage("Question ID is missing.");
      setShowNotification(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/QA/answers`,
        {
          questionId,  
          text: answer  
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      navigate(`/forum/${questionId}`);
    } catch (error: any) {
      console.error("Error while posting the answer:", error);
      setError("Failed to post the answer. Please try again.");
      setNotificationMessage("Failed to post the answer. Please try again.");
      setShowNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className='space-y-5'>
      <input
        className='font-light w-full h-full p-2 border-2 border-black rounded-md'
        placeholder='Body'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        onClick={handleAnswer}
        className='bg-blue-400 font-light text-white p-1 rounded-sm'>
        Answer
      </button>
      {showNotification && (
        <ForumNotification
          message={notificationMessage}
          type='error' 
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default AnswerPost;
