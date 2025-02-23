import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteBlog from '../components/blogpages/DeleteBlog';
import UpdateBlog from '../components/blogpages/UpdateBlog';
import Loading from '../components/auth/loading';

const byteArrayToBase64 = (fileData: any): string => {
  try {
    if (fileData instanceof ArrayBuffer) {
      const binary = String.fromCharCode(...new Uint8Array(fileData));
      return `data:image/png;base64,${btoa(binary)}`;
    } else if (Array.isArray(fileData)) {
      const binary = String.fromCharCode(...fileData);
      return `data:image/png;base64,${btoa(binary)}`;
    } else if (typeof fileData === 'string') {
      return `data:image/png;base64,${fileData}`;
    } else {
      throw new Error('Unsupported fileData format');
    }
  } catch (error) {
    console.error('Error converting file data to Base64:', error);
    return '';
  }
};

interface BlogPost {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  university: string;
  program: string;
  blogTopic: string;
  blogText: string;
  fileDto?: {
    fileData: any;
    fileName: string;
  };
  createdAt: string;
}

const ViewBlogPost = () => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/403');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/v1/auth/admin/check', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
        navigate('/403');
      }
    };

    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (blogId) {
        try {
          const response = await axios.get<BlogPost>(`http://localhost:8080/api/v1/blogs/${blogId}`);
          setBlogPost(response.data);
        } catch (err: any) {
          if (err.response) {
            console.error("Backend Response Error", err.response);
            setError(`Error: ${err.response.data || "An error occurred while fetching the blog post."}`);
          } else if (err.request) {
            console.error("Request Error", err.request);
            setError('Request Error: No response received from the server.');
          } else {
            console.error("Error", err.message);
            setError(`Internal Error: ${err.message}`);
          }
        }
      }
    };

    fetchBlogPost();
  }, [blogId]);

  if (isAdmin === null) {
    return <Loading />; 
  }

  if (isAdmin === false) {
    navigate('/403'); 
  }

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      {blogPost ? (
        <div className='mx-[12rem]'>
          <div className='my-[2rem]'>
            <h1 className='text-6xl font-bold font-lato'>{blogPost.blogTopic}</h1>
            <div>
              <p className='text-black font-bold'>By {blogPost.firstName} {blogPost.lastName}</p>
              <p className='text-black font-bold'>{blogPost.university} - {blogPost.program}</p>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div>
              {blogPost.fileDto?.fileData ? (
                <img 
                  className='rounded-lg h-[30rem]'
                  src={byteArrayToBase64(blogPost.fileDto.fileData)} 
                  alt={blogPost.fileDto.fileName} 
                />
              ) : (
                <div>No Image</div>
              )}
              <p className='font-light underline mb-[2rem]'>Posted on: {new Date(blogPost.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <p className="whitespace-pre-wrap break-words font-light">
            {blogPost.blogText}
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {blogId !== undefined && isAdmin && (
        <>
          <DeleteBlog blogId={blogId} />
          <UpdateBlog blogId={blogId} />
        </>
      )}
    </div>
  );
};

export default ViewBlogPost;
