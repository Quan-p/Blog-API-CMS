import React, { useState, useEffect } from 'react';
import './newPost.scss';

const NewPost = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [published, setPublished] = useState();

	const username = localStorage.getItem('username');

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validate title and content fields
		if (!title.trim() || !content.trim()) {
			alert('Please enter a title and content for your post.');
			return;
		}

		try {
			const response = await fetch(
				'https://blog-api-ifcw.onrender.com/posts',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(
							'jwtToken'
						)}`,
					},
					body: JSON.stringify({
						title,
						content,
						author: localStorage.getItem('authorId'),
						published,
					}),
				}
			);
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
	};

	return (
		<div className='form-container'>
			<h2 className='newPost-header'>Create a New Post</h2>
			<form className='newPost-form' onSubmit={handleSubmit}>
				<label>Title:</label>
				<input
					type='text'
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<label>Content:</label>
				<textarea
					type='text'
					value={content}
					onChange={(event) => setContent(event.target.value)}
				/>
				<label>Author: {username}</label>
				<label>Published:</label>
				<div className='published-container'>
					<input
						type='radio'
						className='published'
						name='published'
						value='true'
						onChange={() => setPublished(true)}
					/>
					<label>True</label>
				</div>
				<div className='published-container'>
					<input
						type='radio'
						className='published'
						name='published'
						value='false'
						onChange={() => setPublished(false)}
						checked
					/>
					<label>False</label>
				</div>
				<button className='' type='submit'>
					Create Post
				</button>
			</form>
		</div>
	);
};

export default NewPost;
