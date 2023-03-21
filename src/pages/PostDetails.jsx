import React, { useEffect, useState } from "react";

const PostDetails = () => {
    const [postDetails, setPostDetails] = useState();
    const [author, setAuthor] = useState();

    const postId = window.location.pathname.split("/").pop();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postDetails = await fetch(`https://blog-api-ifcw.onrender.com/posts/${postId}`);
                const detailsJson = await postDetails.json();
                setPostDetails(detailsJson.post);

                const userReq = await fetch(`https://blog-api-ifcw.onrender.com/users/${detailsJson.post.author}`);
                const userJson = await userReq.json();
                setAuthor(userJson.user);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); 

    return (
        <div>
            Page details
            <div>{author.username}</div>
        </div>
    )
}

export default PostDetails;
