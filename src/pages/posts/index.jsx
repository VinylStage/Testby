import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

function PostCreator() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !content || !category || !date) {
            alert('Please fill in all fields.');
            return;
        }
        setLoading(true);
        const apiUrl = 'https://tetsby-worker.mcpe9869.workers.dev/';
        const formData = {
            title,
            content,
            category,
            date,
            description,
            images: images.map(image => ({
                filename: image.name,
                alt: `Image for ${title}`
            }))
        };

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert('Post created successfully!');
                setTitle('');
                setContent('');
                setCategory('');
                setDate(new Date().toISOString().slice(0, 10));
                setDescription('');
                setImages([]);
            } else {
                alert(`Failed to create post, response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to submit post:', error);
            alert('Failed to create post. Check the console for more information.');
        }
        setLoading(false);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="m-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        className="block w-full p-2 my-2"
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter post content"
                        className="block w-full h-40 p-2 my-2"
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Enter post category"
                        className="block w-full p-2 my-2"
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="block w-full p-2 my-2"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Enter post description"
                        className="block w-full h-20 p-2 my-2"
                    />
                </div>
                <button type="submit" disabled={isLoading} className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-700">
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </Layout>
    );
}

export default PostCreator;
