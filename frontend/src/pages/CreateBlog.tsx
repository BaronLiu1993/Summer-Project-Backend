import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Background from "../components/assets/Background_2_Final.svg";
import Loading from '../components/auth/loading';

const CreateBlog: React.FC = () => {
    const [blogTopic, setBlogTopic] = useState<string>('');
    const [blogText, setBlogText] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    const navigate = useNavigate();
    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAdmin(false);
                    return;
                }
                const response = await axios.get('http://localhost:8080/api/v1/auth/admin/check', {
                    headers: { Authorization: `Bearer ${token}` }
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

        checkAdminStatus();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('blogTopic', blogTopic);
        formData.append('blogText', blogText);
        if (file) {
            formData.append('file', file);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                'http://localhost:8080/api/v1/blogs',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setSuccess('Blog created successfully');
            setError('');
        } catch (error: any) {
            setError(`Error creating blog: ${error.response?.data?.message || error.message}`);
            setSuccess('');
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        } else {
            setFile(null);
        }
    };

    if (isAdmin === null) {
        return <Loading />;
    }

    if (isAdmin === false) {
        navigate("/403");
    }

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
                <div className='space-y-2 bg-slate-500 p-4 rounded opacity-80'>
                    <div className='font-lato text-2xl mt-[5rem]'>
                        Create Blog
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='space-y-2'>
                            <label htmlFor="blogTopic" className='font-light'>Blog Topic</label>
                            <input
                                id="blogTopic"
                                type="text"
                                value={blogTopic}
                                onChange={(e) => setBlogTopic(e.target.value)}
                                required
                                className='w-full p-2 border rounded'
                            />
                        </div>
                        <div className='space-y-2 mt-4'>
                            <label htmlFor="blogText" className='font-light'>Blog Text</label>
                            <textarea
                                id="blogText"
                                value={blogText}
                                onChange={(e) => setBlogText(e.target.value)}
                                required
                                className='w-full p-2 border rounded'
                            />
                        </div>
                        <div className='space-y-2 mt-4'>
                            <label htmlFor="file" className='font-light'>File</label>
                            <input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                className='w-full border rounded'
                            />
                        </div>
                        <div className='space-x-5 mt-4'>
                            <button
                                type="submit"
                                className='bg-blue-400 rounded-sm p-[0.5rem] text-white font-light'
                            >
                                Create Blog
                            </button>
                        </div>
                    </form>
                    {success && <p className='text-green-500 mt-2'>{success}</p>}
                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
