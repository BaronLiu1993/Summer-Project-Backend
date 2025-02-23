import axios from 'axios';
import { useEffect, useState } from 'react';
import Latest_Articles_Frame_Final from '../assets/Latest_Articles_Frame_Final.svg';
import { useNavigate } from 'react-router-dom';
import Loading from '../auth/loading';
import Background from '../assets/Background 9.svg'

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

const BlogItem = () => {
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/v1/blogs');
        const latestPosts = response.data.slice(0, 3); 
        setPopularPosts(latestPosts);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        console.error(err);
        navigate("/500"); 
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <Loading />
  }

  if (error) {
    navigate("/500");
  }

  return (
    <>
      <div
      
      className='flex flex-col items-center w-full h-[50rem]'
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center right', 
        backgroundBlendMode: 'overlay',
      }}>
      {popularPosts.length > 0 ? (
        <div
          className="relative w-full h-[35rem] mb-[5rem] bg-cover bg-center p-4"
          style={{ backgroundImage: `url(${Latest_Articles_Frame_Final})` }}
        >
          <div className="flex flex-col h-full items-center justify-center overflow-hidden">
            <div className="flex space-x-4 mb-4 w-full justify-center">
              <div className="text-2xl">← ↻</div>
              <div className="rounded-3xl border-2 border-black p-2 flex-1 max-w-[20rem] text-sm text-center">
                🔒 Search or Enter Web Address
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-start w-full overflow-auto">
              {popularPosts.map((popularPost) => (
                <div
                  className="relative w-[16rem] h-[14rem] bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
                  key={popularPost.id}
                >
                  <div className="absolute inset-0 flex flex-col p-3">
                    <div className="flex flex-col mb-2 border-b border-gray-200 pb-2">
                      <h3 className="text-blue-400 text-xs font-extrabold truncate">
                        {popularPost.firstName} {popularPost.lastName}
                      </h3>
                      <h3 className="text-black text-xs truncate">{popularPost.createdAt}</h3>
                    </div>
                    <h3 className="text-xs text-blue-400 font-bold truncate mb-2">
                      {popularPost.blogTopic}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {popularPost.fileDto?.fileData ? (
                        <img
                          src={byteArrayToBase64(popularPost.fileDto.fileData)}
                          alt={popularPost.fileDto.fileName}
                          className="w-[2.5rem] h-[2.5rem] object-cover rounded-full"
                        />
                      ) : (
                        <div className="text-xs">No Image</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-white via-white/80 to-transparent">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{popularPost.university} - {popularPost.program}</span>
                      <button className="text-xs text-gray-400">Read More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        !loading && <div>No posts available</div>
      )}
      </div>
    </>
  );
};

export default BlogItem;
