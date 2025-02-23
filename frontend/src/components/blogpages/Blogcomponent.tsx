import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Blogcomponent = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleRedirectBlog = (SelectedBlogId: number) => {
    navigate(`/blogs/${SelectedBlogId}`);
  };

  const handleError = () => {
    navigate('/404');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/v1/blogs');
        setPosts(response.data);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        handleError();
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {posts.length > 0 ? (
        <div className="flex flex-col h-full items-center justify-center overflow-hidden p-4">
          <div className="flex space-x-4 mb-4 w-full justify-center">
          </div>
          <div className="flex flex-wrap gap-4 justify-center items-start w-full overflow-auto">
            {posts.map((post) => {
              const firstTenWords = post.blogText.split(' ').slice(0, 10).join(' ') + '...';
              return (
                <div
                  key={post.id}
                  className="relative w-[16rem] h-[14rem] bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="absolute inset-0 flex flex-col p-3">
                    <div className="flex flex-col mb-2 border-b border-gray-200 pb-2">
                      <h3 className="text-blue-400 text-xs font-extrabold truncate">
                        {post.creatorFirstName} {post.creatorLastName}
                      </h3>
                      <h3 className="text-black text-xs truncate">{post.createdAt}</h3>
                    </div>
                    <h3 className="text-xs text-blue-400 font-bold truncate mb-2">
                      {post.blogTopic}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {post.fileDto?.fileData ? (
                        <img
                          src={byteArrayToBase64(post.fileDto.fileData)}
                          alt={post.fileDto.fileName}
                          className="w-[2.5rem] h-[2.5rem] object-cover rounded-full"
                        />
                      ) : (
                        <div className="text-xs">No Image</div>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 mt-2">{firstTenWords}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-white via-white/80 to-transparent">
                    <button
                      onClick={() => handleRedirectBlog(post.id)}
                      className="py-1 px-2 bg-blue-500 text-white font-medium rounded text-xs hover:bg-blue-600 transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        !loading && <div>No posts available</div>
      )}
    </>
  );
};

export default Blogcomponent;
