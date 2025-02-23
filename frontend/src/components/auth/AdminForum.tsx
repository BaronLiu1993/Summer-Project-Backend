import { useEffect, useState } from 'react';
import axios from 'axios';
import Heart from '../assets/heart.svg';
import { useNavigate } from 'react-router-dom';
import Deletepost from '../forumpage/Deletepost';
import Loading from './loading';

const AdminForum = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/admin/check', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.status === 200) {
          setIsAdmin(true);
          fetchQuestions();
        }
      } catch (error: any) {
        setIsAdmin(false);
        if (error.response) {
          console.log('Response Error');
        } else if (error.request) {
          console.log('Request Error');
        } else {
          console.log('Internal Error');
        }
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/QA/questions');
        setQuestions(response.data);
      } catch (err: any) {
        if (err.response) {
          setError('Response Error');
        } else if (err.request) {
          setError('Request Error');
        } else {
          setError('Internal Error');
        }
      }
    };

    checkAdminStatus();
  }, []);

  const handleViewAnswerClick = (questionId: number) => {
    setSelectedQuestionId(questionId);
    navigate(`/forum/answer/${questionId}`);
  };

  const handleAnswerClick = (questionId: number) => {
    setSelectedQuestionId(questionId);
    navigate(`/forum/${questionId}`);
  };

  if (isAdmin === null) {
    return <Loading />
  }

  if (!isAdmin) {
    navigate('/403'); 
  }

  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className='border-y-[0.05rem] p-[1rem] m-[1rem]'>
          <div className='font-lato'>
            {question.creatorFirstName} {question.creatorLastName}
          </div>
          <div className='flex space-x-5 text-blue-400 font-light'>
            <h1>{question.creatorUniversity}</h1>
            <h1>{question.creatorProgram}</h1>
          </div>
          <div className='font-light text-xs mt-[1rem]'>
            {question.text}
          </div>
          <div className='space-x-3 mt-[1rem] flex'> 
            <button
              className='bg-blue-400 text-white text-xs px-[1rem] py-[0.1rem] rounded-sm'
              onClick={() => handleAnswerClick(question.id)} 
            >
              Answer
            </button>
            <button
              className='bg-red-400 text-white text-xs px-[1rem] py-[0.1rem] rounded-sm'
              onClick={() => handleViewAnswerClick(question.id)}
            >
              View Answer
            </button>
            <button><img className='h-[1rem]' src={Heart} alt="Heart" /></button>
            <button className='font-light'>Share</button>
          </div>
        </div>
      ))}
      {selectedQuestionId && (
        <Deletepost questionId={selectedQuestionId} />
      )}
    </>
  );
};

export default AdminForum;
