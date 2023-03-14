import React, { useState, useEffect } from "react";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch ('https://blog-api-ifcw.onrender.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content })
            });
            const data = await response.json();
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
                    <input type='text' value={title} />
                </label>
                <label>
                    Content:
                    <input type='password' value={content} />
                </label>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
};

export default NewPost;