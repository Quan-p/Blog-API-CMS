import React, { useEffect, useState } from "react";

const PostDetails = () => {
    const [postDetails, setPostDetails] = useState();
    const [author, setAuthor] = useState();
    const [formData, setFormData] = useState({});

    const postId = window.location.pathname.split("/").pop();

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
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate title and content fields
        if (!title.trim() || !content.trim()) {
            alert("Please enter a title and content for your post.");
            return;
        }

        try {
            const response = await fetch (`https://blog-api-ifcw.onrender.com/users/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ 
                    title, 
                    content, 
                    published 
                })
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

    return (
        <div>
            Page details
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
                </form>
            : <p>Loading</p>
            }
            
        </div>
    )
}

export default PostDetails;
