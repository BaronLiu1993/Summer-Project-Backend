import { useNavigate } from 'react-router-dom'

const loginbutton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    window.location.reload();
  }

  return (
    <button className = 'bg-green-500 text-white rounded-md p-2 font-lato' onClick = {handleLogin}>
        Login
    </button>
  )
}

export default loginbutton
