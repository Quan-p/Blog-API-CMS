import React, { useState, useEffect } from "react";

const Dashboard = ({ usernameData }) => {
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

    console.log(usernameData.body.username);

    return (
        <div>
            <h2>Welcome {usernameData.body.username}</h2>
            <div className='posts-container'>
            {posts && users ?
                <div className="post-container">
                    
                        {posts.map(post => {
                            return <div key={post._id}>
                                <h2>{post.title}</h2>
                                <h3>{handleGetAuthorUsername(post.author)}</h3>
                                <p>{post.published.toString()}</p>
                                <p>{post.date}</p>
                            
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