import React from 'react';
import axios from 'axios';

type DeletepostProps = {
    questionId: number;
};

const Deletepost: React.FC<DeletepostProps> = ({ questionId }) => {
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) {
            return; // Exit the function if the user did not confirm
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No Token");
            return;
        }
        
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/QA/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Delete successful:", response.data);
        } catch (error: any) {
            console.error("Error deleting question:", error.message || error);
        }
    };

    return (
        <>
            <button className='bg-red-400 font-light text-white p-1 rounded-sm' onClick={handleDelete}>
                Delete Forum
            </button>
        </>
    );
}

export default Deletepost;
