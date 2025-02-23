import React, { useState } from 'react';
import axios from 'axios';

const UpdateBlog = ({ blogId }: { blogId: string }) => {
    const [blogTopic, setBlogTopic] = useState('');
    const [blogText, setBlogText] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/blogs/${blogId}`, {
                blogTopic,
                blogText,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure this is set correctly
                    'Content-Type': 'application/json',
                },
            });
            console.log('Blog updated successfully', response.data);
        } catch (error: any) {
            console.error('Error updating blog:', error);
            setError('Failed to update blog. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Update Blog</h1>
            <input
                type="text"
                value={blogTopic}
                onChange={(e) => setBlogTopic(e.target.value)}
                placeholder="Blog Topic"
            />
            <textarea
                value={blogText}
                onChange={(e) => setBlogText(e.target.value)}
                placeholder="Blog Text"
            />
            <button onClick={handleUpdate}>Update Blog</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default UpdateBlog;
