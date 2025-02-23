import { useEffect, useState } from 'react'
import axios from 'axios'
import Heart from '../assets/heart.svg'
import Deletepost from './Deletepost';
import { useNavigate } from 'react-router-dom';


const Forumpost = () => {
  const [questions, setQuestions] = useState<any[]>([])
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    try {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8080/api/v1/QA/questions');
            setQuestions(response.data);
        }
        fetchData();
    } catch(err : any) {
        navigate("/500");
    }
  }, [])

  const handleViewAnswerClick = (questionId: number) => {
    setSelectedQuestionId(questionId);
    navigate(`/forum/answer/${questionId}`)
  }

  const handleCreatePost = () => {
    navigate('/forum/create')
  }

  return (
    <> 
        <div className = 'font-light flex text-gray-600 justify-between items-center border-t-2 p-[1rem]'>
            <div className = 'flex space-x-5 ml-[5rem] mt-[2rem]'>
                <button onClick = {handleCreatePost} className = 'font-light text-xs hover:text-white hover:bg-blue-400  rounded-md border-[0.10rem]  border-gray-600  px-[0.5rem]'>
                    + Create a Post
                </button>
                <button className = 'hover:text-blue-300 text-xs bg-blue-400 px-[1rem] rounded-md text-white'>
                    Join
                </button>
                <button className = 'hover:text-blue-300 text-xs'>
                    My Posts
                </button>
            </div>
            <input
                placeholder = 'Search'
                className = 'border-[0.05rem] border-black rounded font-light h-[1rem] mt-[2rem] p-[0.5rem] w-[10rem]'
            >
            </input>
        
        </div>

        <div className = 'flex'>
            <div className = 'bg-gray-100 m-[1rem] p-[1rem] rounded-lg w-[20rem]'>
                <h1 className = 'font-lato'>University of Waterloo</h1>
                <h1 className = 'font-light text-xs'>Unofficial student and alumni-run subrredit for the University of Waterloo Community</h1>
                <div className = 'flex space-x-5 my-[1rem] border-gray-200'>
                    <div className = 'bg-slate-200 p-[0.5rem] h-[5rem] w-[5rem] rounded-lg'>
                        <h1 className = 'text-blue-400 text-3xl font-lato'>150+</h1>
                        <h2 className = 'text-xs font-light'>community members</h2>
                    </div>
                    <div className = 'bg-slate-200 p-[0.5rem] h-[5rem] w-[5rem] rounded-lg'>
                        <h1 className = 'text-red-400 text-3xl font-lato'>1M+</h1>
                        <h2 className = 'text-xs font-light'>community members</h2>
                    </div>
                    <div className = 'bg-slate-200 p-[0.5rem] h-[5rem] w-[5rem] rounded-lg'>
                        <h1 className = 'text-yellow-400 text-3xl font-lato'>50+</h1>
                        <h2 className = 'text-xs font-light'>countries represented</h2>
                    </div>
                </div>
                <div className = 'font-light text-slate-500'>
                    <h1>Rules</h1>
                    <div>1. Personal Info</div>
                    <div>1. Illegal Activities</div>
                    <div>1. Advertising</div>
                    <div>1. Flairing e.g. "Serious" flair</div>
                    <div>1. NSFW Content</div>
                </div>
            </div>


            <div>
            {questions.map((question) => (
                <div key = {question.id} className = 'border-y-[0.05rem] p-[1rem] m-[1rem]'>
                    <div className = 'font-lato'>
                        {question.creatorFirstName} {question.creatorLastName}
                    </div>
                    <div className = 'flex space-x-5 text-blue-400 font-light'>
                        <h1>{question.creatorUniversity}</h1>
                        <h1>{question.creatorProgram}</h1>
                    </div>
                    <div className = 'font-light text-xs mt-[1rem]'>
                        {question.text}
                    </div>

                    <div className = 'space-x-3 mt-[1rem] flex'> 
                        <button
                        className='bg-red-400 text-white text-xs px-[1rem] py-[0.1rem] rounded-sm'
                            onClick={() => handleViewAnswerClick(question.id)}
                        >
                            View Answer
                        </button>
                        <button><img className = 'h-[1rem]' src = {Heart}/></button>
                        <button className = 'font-light'>Share</button>
                    </div>
                    
                </div>
            ))}
            </div>

      {selectedQuestionId && (
        <Deletepost questionId = {selectedQuestionId} />
      )}

        </div>
    </>
  )
}

export default Forumpost
