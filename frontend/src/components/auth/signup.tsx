import axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Background from "../assets/Background_2_Final.svg"

const signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [program, setProgram] = useState('')
  const [university, setUniversity] = useState('')
  const [role, setRole] = useState('USER') //It will always be user admin will be made manually
  const navigation = useNavigate();
  const [error, setError] = useState ('') //give back the error later

  const handleFetchData = async () => {
    try {
        if (!username) {
            setError('Please Fill In Username')
            return;
        } else if (!password) {
            setError('Please Fill In Password')
        } else {
            const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
                username,
                password,
                firstName,
                lastName,
                program,
                university,
                role
            })
            console.log(`Sucessfully Created ${response}`)
        } 
        navigation('/'); 
        window.location.reload();
    } catch (error: any) {
        if (error.response) {
            setError('Response Error')
        } else if (error.request) {
            setError('Request Error')
        } else {
            setError('Refused')
        }
    }
  }
  return (
    <div className = 'flex flex-col justify-center items-center min-h-screen bg-cover bg-center'
      style={{
      backgroundImage: `url(${Background})`,
    }}
    >
    <div className="container flex flex-col justify-center items-center">
        <div className="font-bold text-xl">
          <div className='font-lato'>Think it. Make it</div>
          <div className='font-light text-gray-400'>Log in to your Notion account</div>
        </div>

        <div className="container flex flex-col justify-center items-center m-[2rem] space-y-2">
                <input className = 'p-[0.5rem] font-light rounded-sm border-gray-200 pointer-events-auto border-[0.05rem]' placeholder = "Username" onChange = {(e) => setUsername(e.target.value)} >
                
                </input>
                <input className = 'p-[0.5rem] font-light rounded-sm border-gray-200 pointer-events-auto border-[0.05rem]' placeholder="Password" onChange = {(e) => setPassword(e.target.value)} type = 'password'>
    
                </input>
                <input className = 'p-[0.5rem] font-light rounded-sm border-gray-200 pointer-events-auto border-[0.05rem]' placeholder="First Name" onChange = {(e) => setFirstName(e.target.value)}>
    
                </input>
                <input className = 'p-[0.5rem] font-light rounded-sm border-gray-200 pointer-events-auto border-[0.05rem]' placeholder="Last Name" onChange = {(e) => setLastName(e.target.value)}>
    
                </input>
                <input className = 'p-[0.5rem] font-light rounded-sm border-gray-200 pointer-events-auto border-[0.05rem]' placeholder="Program" onChange = {(e) => setProgram(e.target.value)}>
    
                </input>
                <input className = 'p-[0.5rem] font-light rounded-sm border-gray-200 pointer-events-auto border-[0.05rem]' placeholder="University" onChange = {(e) => setUniversity(e.target.value)}>
    
                </input>
        </div>

        <button className='text-white p-1 w-[10rem] rounded-md bg-blue-600 shadow-xl' onClick={handleFetchData}>
          Continue
        </button>

        

        {error && <div className="">{error}</div>}
      </div>
      </div>
  )
}

export default signup
