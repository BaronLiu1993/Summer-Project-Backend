import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Deletepost from '../components/forumpage/Deletepost';
import Answerpost from '../components/forumpage/Answerpost';
import Updatepost from '../components/forumpage/Updatepost';
import Loading from '../components/auth/loading';

interface ForumPost {
  text: string;
}

interface AnswerPost {
  id: number;
  text: string;
  responderUsername: string;
  responderFirstName: string;
  responderLastName: string;
  responderUniversity: string;
  responderProgram: string;
}

const AnswerForumPost: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [forumPost, setForumPost] = useState<ForumPost | null>(null);
  const [answerPosts, setAnswerPosts] = useState<AnswerPost[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // Track admin status
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/admin/check', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    const getQuestionPost = async () => {
      if (!questionId) return;
      try {
        const response = await axios.get<ForumPost>(`http://localhost:8080/api/v1/QA/questions/${questionId}`);
        setForumPost(response.data);
      } catch (error) {
        navigate("/500")
      }
    };

    const getAnswerPost = async () => {
      if (!questionId) return;
      try {
        const response = await axios.get<AnswerPost[]>(`http://localhost:8080/api/v1/QA/answers?questionId=${questionId}`);
        setAnswerPosts(response.data);
      } catch (error) {
        navigate("/500");
      }
    };

    checkAdminStatus();
    getQuestionPost();
    getAnswerPost();
  }, [questionId]);

  if (isAdmin === null) {
    return <Loading />; 
  }

  if (isAdmin === false) {
    navigate("/403");
  }

  if (!forumPost) {
    return <Loading />
  }

  const numericQuestionId = questionId ? parseInt(questionId, 10) : undefined;

  return (
    <div className='bg-slate-100 m-[5rem] p-[2rem]'>
      <div className='font-bold'>Question To Be Answered</div>
      <p>{forumPost.text}</p>

      <div>
        {answerPosts ? (
          answerPosts.map((e: AnswerPost) => (
            <div key={e.id}>
              <div>{e.text}</div>
              <div className='bg-white m-[2rem] p-2 rounded-sm font-bold'>
                <div>Username: {e.responderUsername}</div>
                <div>First Name: {e.responderFirstName}</div>
                <div>Last Name: {e.responderLastName}</div>
                <div>School + Program: {`${e.responderUniversity} ${e.responderProgram}`}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No answers available.</div>
        )}
      </div>

      <div className='bg-white m-[2rem] space-y-5 p-4 rounded-sm'>
        <div className='text-black font-bold p-2 rounded-sm'>Give An Answer to the Post</div>
        <Answerpost />
      </div>

      {numericQuestionId !== undefined && (
        <div className='bg-white m-[2rem] p-4 flex space-x-5'>
          <div className='p-2 text-black font-bold'>Delete or Update The Forum Post If Needed</div>
          <Updatepost questionId={numericQuestionId} />
          <Deletepost questionId={numericQuestionId} />
        </div>
      )}
    </div>
  );
};

export default AnswerForumPost;
