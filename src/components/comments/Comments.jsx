import React, { useState, useEffect } from "react";
import './comments.scss';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState();
    const [commentId, setCommentId] = useState();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (commentId) => {
        console.log(commentId);
        setCommentId(commentId);
        setShowModal(true)
    }

    const handleDeleteConfirmed = async () => {
        try {
            const response = await fetch (`https://blog-api-ifcw.onrender.com/posts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            if (response.ok) {
                // Delete was successful
                console.log('Comment deleted successfully');
                // navigate('/dashboard');
                // filter comment array to re-render comments
                setComments(comments.filter(comment => comment._id !== commentId));
                setShowModal(false);
            } else {
                // Delete failed
                console.log('Delete failed:', data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        <div className="comments-container">
            <h2 className="comments-header">Comments Section</h2>
            {comments ?
                <div className="comments-list">
                        {comments.map(comment => {
                            return <div className="comment-item" key={comment._id}>
                                <label>
                                    Author:
                                    <h3 className="author-header">{comment.user}</h3>
                                </label>
                                <label>
                                    Date:
                                    <h4 className="date-header">{comment.date}</h4>
                                </label>
                                <label>
                                    Comment:
                                    <p className="comment-text">{comment.text}</p>
                                </label>
                                <button type="button" onClick={() => handleDelete(comment._id)}>Delete</button>
                            </div>
                        })}
                </div> 
                : <p>Comments loading</p>
            }
            {showModal && (
                <div className="modal">
                    <p>Are you sure you want to delete this comment?</p>
                    <button type="button" onClick={handleDeleteConfirmed}>Yes</button>
                    <button type="button" onClick={() => setShowModal(false)}>No</button>
                </div>
            )}
        </div>
    )
}

export default Comments;
