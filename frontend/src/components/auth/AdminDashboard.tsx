import { useNavigate } from "react-router-dom"

const adminDashboard = () => {
  const navigate = useNavigate();
  const handleAdminBlog = () => {
    navigate("/adminBlog");
  }

  const handleAdminForum = () => {
    navigate("/adminForum");
  }

  return (
    <>
        <div>
            <h1>Welcome To The Admin DashBoard</h1>
            <div>
                <button onClick = {handleAdminBlog}>
                    Redirect to Admin Blog
                </button>
                <button onClick = {handleAdminForum}>
                    Redirect to Admin Forum
                </button>
            </div>
        </div>
    </>
  )
}

export default adminDashboard

