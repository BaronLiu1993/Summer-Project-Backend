import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/auth/login';
import Signup from './components/auth/signup'
import Homepage from './pages//homepage'
import Navbar from './components/navigation/navbar'
import { AuthProvider } from './components/auth/AuthProvider'
import Forumpage from './pages/forumpage'
import Blogpage from './pages/blogpage'
import Createquestion from './pages/createquestion'
import CreateBlog from './pages/CreateBlog'
import AnswerForumPost from './pages/AnswerForumPost';
import ViewBlogPost from './pages/ViewBlogPost';
import Footer from './components/Footer'
import ViewForumPost from './pages/ViewForumPost'
import InternalError from './components/error/InternalError';
import NoAuthorization from './components/error/NoAuthorization';
import NotFoundError from './components/error/NotFoundError';
import AdminForum from './components/auth/AdminForum';
import EditBlogPost from './pages/EditBlogPost'
import AdminBlog from './components/auth/AdminBlog';

const App = () => {
  return (
    <AuthProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path = "/" element={<Homepage />}/>
                <Route path = "/login" element = {<Login />}/>
                <Route path = "/signup" element = {<Signup />}/>
                <Route path = "/blogs/:blogId" element = {<ViewBlogPost />} />
                <Route path = "/blogs" element = {<Blogpage />} />
                <Route path = "/blogs/create" element = {<CreateBlog />}/>
                <Route path = "/forum" element ={<Forumpage />} />
                <Route path = "/forum/create" element ={<Createquestion />} />
                <Route path = "/forum/:questionId" element = {<AnswerForumPost />} />
                <Route path = "/forum/answer/:questionId" element = {<ViewForumPost />} />
                <Route path = "/500" element = {<InternalError />} />
                <Route path = "/404" element = {<NotFoundError />} />
                <Route path = "/403" element = {<NoAuthorization />} />
                <Route path = "/adminforum" element = {<AdminForum />}/>
                <Route path = "/adminblog" element = {<AdminBlog />} />
                <Route path = "/blogs/edit/blogId" element = {<EditBlogPost />} />
            </Routes>
            <Footer />
        </Router>
    </AuthProvider>
  )
}

export default App
