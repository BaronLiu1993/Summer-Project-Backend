import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/auth/loading';

interface ForumPost {
  text: string;
  Username: string;
  creatorFirstName: string;
  creatorLastName: string;
  creatorUniversity: string;
  creatorProgram: string;
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
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestionPost = async () => {
      if (!questionId) return; 
      try {
        const response = await axios.get<ForumPost>(`http://localhost:8080/api/v1/QA/questions/${questionId}`);
        setForumPost(response.data);
      } catch (error) {
        navigate("/500");
    }
    };

    const getAnswerPost = async () => {
      if (!questionId) return;

      try {
        const response = await axios.get<AnswerPost[]>(`http://localhost:8080/api/v1/QA/answers?questionId=${questionId}`);
        setAnswerPosts(response.data);
      } catch (error) {
        console.error("An error occurred while fetching the answer post.", error);
      }
    };

    getQuestionPost();
    getAnswerPost();
  }, [questionId]);

  if (!forumPost) {
    return <Loading />;
  }

  return (
    <>
    <div className = 'flex flex-col'>
    <div className = 'bg-slate-100 flex flex-col justify-center p-[2rem] mx-[6rem] mt-[5rem] rounded-md'>
      
      <p className = 'text-blue-400'> Asked By {forumPost.creatorFirstName} {forumPost.creatorLastName}</p>
      <p className = 'text-red-400'>{forumPost.creatorUniversity} - {forumPost.creatorProgram}</p>
      <p className = 'text-sm font-light' >{forumPost.text}</p>
    </div>
    <div>
        {answerPosts ? (
          answerPosts.map((e: AnswerPost) => (
            <div key={e.id} className = 'flex space-x-8 mx-[12rem] my-[2rem] bg-slate-100 p-[1rem] rounded-md'>
              <div className = 'text-5xl'>↳</div>
              <div>
                <div className = 'font-light text-sm'>{e.text}</div>
                <div className = 'text-blue-400'>
                    Answered By {e.responderFirstName} {e.responderLastName}
                </div>
                <div className = 'text-red-400'>
                from {`${e.responderUniversity} ${e.responderProgram}`}
                </div>
              </div>
            
            </div>
          ))
        ) : (
          <div>No answers available.</div>
        )}
      </div>
      </div>
    </>
  );
};

export default AnswerForumPost;
