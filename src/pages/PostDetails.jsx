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

    return (
        <div>
            Page details
            {postDetails ? 
                <form>
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
                    />
                </form>
            : <p>Loading</p>
            }
            
        </div>
    )
}

export default PostDetails;
