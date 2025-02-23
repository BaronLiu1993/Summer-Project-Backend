import React, { useEffect, useState } from 'react';

type NotificationProps = {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
};

const ForumNotification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const [timerProgress, setTimerProgress] = useState<number>(100); // Percentage of progress

    useEffect(() => {
        const hideTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 800); // Delay onClose to allow fade-out animation
        }, 3000);

        const progressTimer = setInterval(() => {
            setTimerProgress(prev => Math.max(0, prev - 100 / 30)); // Decrease progress
        }, 100);

        return () => {
            clearTimeout(hideTimer);
            clearInterval(progressTimer);
        };
    }, [onClose]);

    return (
        <div className = 'text-green-400'
            style={{
                position: 'fixed',
                bottom: '10px',
                left: '10px',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                zIndex: 1000,
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '300px',
                overflow: 'hidden',
            }}
        >
            <p>{message}</p>
            <button
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: type === 'success' ? 'green' : 'red',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginLeft: '10px',
                }}
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 800); // Delay onClose to allow fade-out animation
                }}
            >
                &times;
            </button>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: `${timerProgress}%`,
                    height: '5px',
                    backgroundColor: type === 'success' ? 'green' : 'red',
                    transition: 'width 0.1s linear',
                }}
            />
        </div>
    );
};

export default ForumNotification;
