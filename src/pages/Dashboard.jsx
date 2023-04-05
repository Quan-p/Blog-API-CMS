import React, { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import './dashboard.scss';

const Dashboard = () => {
	const [posts, setPosts] = useState();
	const [users, setUsers] = useState();

	const handleGetAuthorUsername = (authorId) => {
		const author = users.find((user) => user._id == authorId);
		return author ? author.username : null;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const postReq = await fetch(
					'https://blog-api-ifcw.onrender.com/posts'
				);
				const postsJson = await postReq.json();
				setPosts(postsJson.posts);

				const userReq = await fetch(
					'https://blog-api-ifcw.onrender.com/users'
				);
				const userJson = await userReq.json();
				setUsers(userJson.users);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='dashboard-container'>
			<h2 className='dashboard-header'>
				Welcome {localStorage.getItem('username')}
			</h2>
			<div className='dashboard-content'>
				{posts && users ? (
					<div className='posts-container'>
						{posts.map((post) => {
							return (
								<div className='post-container' key={post._id}>
									<div className='post-content'>
										<h2 className='title-header'>
											Post Title: {post.title}
										</h2>
										<h3>
											Author:{' '}
											{handleGetAuthorUsername(
												post.author
											)}
										</h3>
										<p>
											Published:{' '}
											{post.published.toString()}
										</p>
										<p>
											Date Written:{' '}
											{new Date(
												post.date
											).toLocaleString()}
										</p>
										<a href={`/posts/${post._id}`}>
											<button>Edit Post</button>
										</a>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<BounceLoader color='#D4A373' size={25} />
				)}
			</div>
		</div>
	);
};

export default Dashboard;
