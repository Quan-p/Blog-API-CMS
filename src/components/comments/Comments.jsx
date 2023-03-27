import React, { useState, useEffect } from "react";

const Comments = ({ postId }) => {
    const [comments, setComments] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentsReq = await fetch(`https://blog-api-ifcw.onrender.com/posts/${postId}/comments`);
                const commentsJson = await commentsReq.json();
                setComments(commentsJson.comments);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); 

    return (
        <div>
            This is the Comments Section
            {comments ?
                <div className="comments-container">
                        {comments.map(comment => {
                            return <div key={comment._id}>
                                <h2>{comment.user}</h2>
                                <p>{comment.date}</p>
                                <p>{comment.text}</p>
                                <button onClick={() => setConfirmDelete(true)}>Delete</button>
                                    {confirmDelete && (
                                        <div>
                                            <p>Are you sure you want to delete?</p>
                                            <button onClick={handleDelete}>Yes</button>
                                            <button onClick={() => setConfirmDelete(false)}>No</button>
                                        </div>
                                    )}
                            </div>
                        })}
                </div> 
                : <p>Comments loading</p>
            }
        </div>
    )
}

export default Comments;
