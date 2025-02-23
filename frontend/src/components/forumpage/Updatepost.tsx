import { useState } from 'react';
import axios from 'axios';
import ForumNotification from './ForumNotification'; // Adjust the path as needed

type UpdatepostProps = {
    questionId: number;
};

const Updatepost: React.FC<UpdatepostProps> = ({ questionId }) => {
    const [update, setUpdate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No Token");
            setError("No token found. Please log in.");
            setNotificationMessage("No token found. Please log in.");
            setNotificationType('error');
            setShowNotification(true);
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/QA/questions/${questionId}`,
                { text: update },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Update successful:", response.data);
            setSuccess(true);
            setError(null);
            setNotificationMessage("Update successful!");
            setNotificationType('success');
        } catch (error: any) {
            console.error("Error updating question:", error.message || error);
            setError(error.message || 'An unknown error occurred');
            setSuccess(false);
            setNotificationMessage(error.message || 'An unknown error occurred');
            setNotificationType('error');
        }
        setShowNotification(true);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    return (
        <div className='flex space-x-5 p-1'>
            <input
                className='border-2 rounded-md border-black p-1'
                type="text"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                placeholder="Update body"
            />
            <button className='bg-green-400 text-white p-1 font-light rounded-sm' onClick={handleUpdate}>
                Click Here To Update
            </button>
            {showNotification && (
                <ForumNotification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={handleCloseNotification}
                />
            )}
        </div>
    );
};

export default Updatepost;
