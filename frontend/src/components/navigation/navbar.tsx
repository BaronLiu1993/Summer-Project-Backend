import { useState, useEffect } from 'react';
import Logout from '../auth/logout';
import Loginbutton from '../auth/loginbutton';
import Signupbutton from '../auth/signupbutton';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleBlog = () => {
    navigate('/blogs');
    setIsMenuOpen(false);
  };

  const handleHome = () => {
    navigate('/');
  }

  const handleForum = () => {
    navigate('/forum');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-around font-lato border-b-2 pb-[1rem] mt-[2rem]">
        <div className='flex space-x-[20rem]'>
          <div>
            <h2 className='text-blue-800 text-2xl font-bold'>Universe</h2>
            <h2 className=''>Subtitle of site</h2>
          </div>
          <div className='flex space-x-20 font-extrabold'>
            <button onClick={handleHome}>Home</button>
            <button onClick={handleBlog}>Blogs</button>
            <button onClick={handleForum}>Forums</button>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          {isAuthenticated ? (
            <div className='flex space-x-5 m-[1rem]'>
              <Logout />
            </div>
          ) : (
            <div className='flex space-x-5 m-[1rem]'>
              <Loginbutton />
              <Signupbutton />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b-2">
        <div>
          <h2 className='text-blue-800 text-2xl font-bold'>Universe</h2>
          <h2 className=''>Subtitle of site</h2>
        </div>
        <button
          onClick={toggleMenu}
          className="text-3xl focus:outline-none"
        >
          &#9776;
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
        } md:hidden bg-white bg-opacity-90 w-full absolute top-16 left-0 z-50 p-4 border-t border-b border-gray-200 transition-opacity duration-300 ease-in-out`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      >
        <div className="flex flex-col items-center space-y-6 font-extrabold">
          <button onClick={handleForum} className="py-2">Home</button>
          <button onClick={handleBlog} className="py-2">Blogs</button>
          <button onClick={handleForum} className="py-2">Forums</button>
          <div className="flex flex-col items-center space-y-4 mt-4">
            {isAuthenticated ? (
              <Logout />
            ) : (
              <>
                <Loginbutton />
                <Signupbutton />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
