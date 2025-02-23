import React from 'react'
import axios from 'axios'


type DeleteblogProps = {
  blogId: string;
};

const DeleteBlog: React.FC<DeleteblogProps> = ({ blogId }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token'); 
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/blogs/${blogId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
    } catch (error: any) {

    }
  };

  return (
    <>
        <button onClick = {handleDelete}>
          Delete This Blog
        </button>
    </>
  )
}

export default DeleteBlog
