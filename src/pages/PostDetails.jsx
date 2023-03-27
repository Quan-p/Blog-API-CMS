import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Comments from "../components/comments/Comments";

const PostDetails = () => {
    const [postDetails, setPostDetails] = useState();
    const [author, setAuthor] = useState();
    const [formData, setFormData] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);

    const postId = window.location.pathname.split("/").pop();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postDetails = await fetch(`https://blog-api-ifcw.onrender.com/posts/${postId}`);
                const detailsJson = await postDetails.json();
                setPostDetails(detailsJson.post);

                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [postId]); 

    useEffect(() => {
        if(postDetails) {
            const fetchAuthor = async () => {
                try {
                    const userReq = await fetch(`https://blog-api-ifcw.onrender.com/users/${postDetails.author}`);
                    const userJson = await userReq.json();
                    setAuthor(userJson.user);
                } catch (err) {
                    console.log(err);
                }
            }
            fetchAuthor()
        }
    }, [postDetails])

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if(type === 'checkbox') {
            setPostDetails({...postDetails, [name]: checked});
        } else {
            setPostDetails({...postDetails, [name]: value});
            setFormData({ ...formData, [name]: value });
        }
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch (`https://blog-api-ifcw.onrender.com/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(postDetails)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                // Login was successful, do something here (e.g. redirect to dashboard)
                console.log(data);
              } else {
                // Login failed, show an error message or something
                console.log('Login failed:', data.message);
              }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch (`https://blog-api-ifcw.onrender.com/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            if (response.ok) {
                // Delete was successful
                console.log('Post deleted successfully');
                navigate('/dashboard');
            } else {
                // Delete failed
                console.log('Login failed:', data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            Page details
            <button onClick={() => setConfirmDelete(true)}>Delete Post</button>
                {confirmDelete && (
                    <div>
                        <p>Are you sure you want to delete?</p>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={() => setConfirmDelete(false)}>No</button>
                    </div>
                )}
            {postDetails ? 
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input 
                        type='text'
                        name='title'
                        value={postDetails.title}
                        onChange={handleChange}
                    />
                    <label>Content:</label>
                    <textarea 
                        name='content'
                        value={postDetails.content}
                        onChange={handleChange}
                    />
                    <label>Published:</label>
                    <input 
                        type='checkbox'
                        name='published'
                        checked={postDetails.published}
                        onChange={handleChange}
                    />
                    <button type="submit">Update Post</button>
                    <Comments postId={postId}/>
                </form>
                
            : <p>Loading</p>
            }
        </div>
    )
}

export default PostDetails;
