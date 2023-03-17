import React, { useState, useEffect } from "react";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch ('https://blog-api-ifcw.onrender.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, published })
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
                    Published:
                    <input type="radio" className='published' name='published' value='True' onChange={(event) => setPublished(event.target.value)} />
                    <label>True</label>
                    <input type="radio" className='published' name='published' value='False' onChange={(event) => setPublished(event.target.value)} checked />
                    <label>False</label>
                </label>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
};

export default NewPost;