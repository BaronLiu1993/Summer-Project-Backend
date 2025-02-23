import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (blogId) {
        try {
          const response = await axios.get<BlogPost>(`http://localhost:8080/api/v1/blogs/${blogId}`);
          setBlogPost(response.data);
        } catch (err: any) {
          if (err.response) {
            navigate("/404")
          } else if (err.request) {
            navigate("/500")
          } else {
            navigate("/403")
          }
        }
      }
    };

    fetchBlogPost();
  }, [blogId]);

  return (
    <div>
      {blogPost ? (
        <div className = ' mx-[12rem]'>
          <div className = 'my-[2rem]'>
            <h1 className = 'text-6xl font-bold font-lato'>{blogPost.blogTopic}</h1>
            <div>
            <p className = 'text-black font-bold'>By {blogPost.firstName} {blogPost.lastName} </p>
            <p className = 'text-black font-bold'> {blogPost.university} - {blogPost.program}</p>
          </div>
        </div>

          <div className = 'flex justify-center items-center'>
            <div>
            {blogPost.fileDto?.fileData ? (
              <img 
                className = 'rounded-lg h-[30rem]'
                src={byteArrayToBase64(blogPost.fileDto.fileData)} 
                alt={blogPost.fileDto.fileName} 
              />
            ) : (
              <div>No Image</div>
            )}
            <p className = 'font-light underline mb-[2rem]'>Posted on: {new Date(blogPost.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <p className="whitespace-pre-wrap break-words font-light">
            {blogPost.blogText}
          </p>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ViewBlogPost;
