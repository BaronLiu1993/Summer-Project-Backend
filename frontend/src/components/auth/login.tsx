import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background_2_Final.svg';
import Loading from './loading';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Initial loading state
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = Background;
    img.onload = () => {
      setLoading(false);  
    };
  }, []);

  const handleFetchData = async () => {
    try {
      if (!username) {
        setError('Please provide your username');
      } else if (!password) {
        setError('Please provide your password');
      } else {
        setLoading(true);  
        const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
          username,
          password,
        });
        localStorage.setItem('token', response.data.accessToken);
        if (response.status === 429) {
          navigate('/403');
        } 
        navigate('/'); 
        window.location.reload();
      }
    } catch (error: any) {
      setLoading(false);  
      if (error.response) {
        setError('Incorrect username or password');
      } else if (error.request) {
        navigate('/500');
      } else {
        navigate('/403');
      }
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="text-center font-bold text-xl mb-6">
        <div className='font-lato'>Think it. Make it.</div>
        <div className='font-light text-gray-400'>Log in to your Notion account</div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          <p className="mt-4">Logging in...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-5 mb-6">
            <input
              className='p-2 font-light rounded-sm border-gray-200 border'
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username..."
            />
            <input
              className='p-2 font-light rounded-sm border-gray-200 border'
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password..."
            />
          </div>

          <button
            className='text-white p-2 w-32 rounded-md bg-blue-600 shadow-xl'
            onClick={handleFetchData}
          >
            Continue
          </button>
        </>
      )}
      
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default Login;
