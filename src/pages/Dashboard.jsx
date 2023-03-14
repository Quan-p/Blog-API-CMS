import React, { useState, useEffect } from "react";

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
        <div>
            <div className='posts-container'>
            {posts ?
                <div className="post-container">
                    
                        {posts.map(post => {
                            return <div key={post._id}>
                                <h2>{post.title}</h2>
                                <h3>{handleGetAuthorUsername(post.author)}</h3>
                            </div>
                        })}
                </div> 
                : <p>Posts loading</p>
            }
            </div>
        </div>
    )
}

export default Dashboard