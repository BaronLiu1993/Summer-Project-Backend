import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Background from "../assets/Background 5.svg";
import { load, ToxicityClassifier } from "@tensorflow-models/toxicity";
import { toxicityLabels } from '../data/toxicityLabel';
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [model, setModel] = useState<ToxicityClassifier | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loadModel = async () => {
            try {
                const threshold = 0.9;
                const toxicityModel = await load(threshold, toxicityLabels);
                setModel(toxicityModel);
                console.log("Model loaded");
            } catch (err) {
                console.error("Failed to load model:", err);
            }
        };
        loadModel();
    }, []);

    const handleQuestionSubmission = async (event: any) => {
        event.preventDefault();

        if (!model) {
            console.error("Model not loaded yet");
            return;
        }

        if (question === "" || question === null) {
            setError("Try Again!");
            return;
        }

        try {
            const predictions = await model.classify([question]);
            const isToxic = predictions.some(prediction => 
                prediction.results[0].match && prediction.label === 'toxicity'
            );
            if (!isToxic) {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                const payload = { text: question };
                const response = await axios.post(
                    'http://localhost:8080/api/v1/QA/questions',
                    payload,
                    { 
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );
                setQuestion(''); 
                setError(null); 
                navigate("/forum");
            } else {
                setError("Inappropriate Message, Try Again!"); 
            }
        } catch (err: any) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div
            className='flex items-center justify-center h-[60rem]'
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center', 
            }}
        >
            <div className='ml-[2rem] flex'>
                <div className='space-y-2 bg-slate-50 p-4 rounded'>
                    <div className='font-lato text-2xl mt-[5rem]'>
                        Create Post
                    </div>
                    <div className='border-[0.05rem] border-black rounded-lg h-[10rem] w-[40rem]'>
                        <input
                            className='font-light w-full h-full p-2'
                            placeholder='Body'
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>

                    {error && <div className='text-red-500 mt-2'>{error}</div>}

                    <div className='space-x-5 mt-[2rem] ml-[5rem]'>
                        <button className='bg-blue-400 rounded-sm p-[0.5rem] text-white font-light'>
                            Save draft
                        </button>
                        <button
                            className='bg-blue-400 w-[5rem] rounded-sm p-[0.5rem] text-white font-light'
                            onClick={handleQuestionSubmission}
                        >
                            Post ➣
                        </button>
                    </div>
                </div>

                <div className='space-y-5 m-[5rem]'>
                    <div className='bg-slate-100 h-[20rem] w-[20rem] flex flex-col justify-center p-[2rem]'>
                        <h1 className='font-light text-2xl'>Rules</h1>
                        <h1 className='font-light'>Your Forum Posts Will Be Filtered For Inappropriate Language</h1>
                        <div className='text-red-500 font-light'>
                            <div>1. Personal Info</div>
                            <div>2. Illegal Activities</div>
                            <div>3. Advertising</div>
                            <div>4. Flairing e.g. "Serious" flair</div>
                            <div>5. NSFW Content</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
