import React, { useState, useEffect } from "react";
import './dashboard.scss';

const Dashboard = () => {
    const [posts, setPosts] = useState();
    const [users, setUsers] = useState();

    const handleGetAuthorUsername = (authorId) => {
        const author = users.find(user => user._id == authorId);
        return author ? author.username : null;
    }
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postReq = await fetch('https://blog-api-ifcw.onrender.com/posts');
                const postsJson = await postReq.json();
                setPosts(postsJson.posts);
                
                const userReq = await fetch('https://blog-api-ifcw.onrender.com/users');
                const userJson = await userReq.json();
                setUsers(userJson.users);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []); 

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-header">Welcome</h2>
            <div className='posts-container'>
            {posts && users ?
                <div className="post-container">
                    
                        {posts.map(post => {
                            return <div key={post._id}>
                                <h2>{post.title}</h2>
                                <h3>{handleGetAuthorUsername(post.author)}</h3>
                                <p>{post.published.toString()}</p>
                                <p>{new Date(post.date).toLocaleString()}</p>
                                <a href={`/posts/${post._id}`}>
                                    <button >Edit Post</button>
                                </a>
                            </div>
                        })}
                </div> 
                : <p>Posts loading</p>
            }
            </div>
        </div>
    )
}

export default Dashboard;
