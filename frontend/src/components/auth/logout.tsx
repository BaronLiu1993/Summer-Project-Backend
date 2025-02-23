import { useNavigate } from 'react-router-dom'

const logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    window.location.reload();
  } 
  return (
    <>
        <button className = 'bg-red-500 text-white rounded-md p-2 font-lato' onClick = {handleLogout}>
            Log Out 
        </button>
    </>
  )
}

export default logout
