import React, { useState, useEffect } from "react";

const NewPost = ({ usernameData }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState();
    const [storedData, setStoredData] = useState(null);
    useEffect(() => {
    const storedData = sessionStorage.getItem('usernameData');
    if (storedData) {
        setStoredData(JSON.parse(storedData));
    } else {
        setStoredData(usernameData);
        sessionStorage.setItem('usernameData', JSON.stringify(usernameData));
    }
    }, [usernameData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate title and content fields
        if (!title.trim() || !content.trim()) {
            alert("Please enter a title and content for your post.");
            return;
        }

        try {
            const response = await fetch ('https://blog-api-ifcw.onrender.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ 
                    title, 
                    content,
                    author: storedData.body._id, 
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
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
                </label>
                <label>
                    Content:
                    <textarea type='text' value={content}  onChange={(event) => setContent(event.target.value)}/>
                </label>
                <label>
                    Author: {storedData?.body?.username}
                </label>
                <label>
                    Published:
                    <input type="radio" className='published' name='published' value='true' onChange={() => setPublished(true)} />
                    <label>True</label>
                    <input type="radio" className='published' name='published' value='false' onChange={() => setPublished(false)} checked />
                    <label>False</label>
                </label>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
};

export default NewPost;