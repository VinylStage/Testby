import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

function PostCreator() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !content || !category || !date) {
            alert('Please fill in all fields.');
            return;
        }
        setLoading(true);
        const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
        const path = `contents/${category}/${date}-${formattedTitle}/${formattedTitle}.md`;
        const apiUrl = 'https://tetsby-worker.mcpe9869.workers.dev/';

        try {
            const response = await axios.post(apiUrl, {
                title,
                content,
                category,
                date
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });


            if (response.status === 200) {
                alert('Post created successfully!');
                setTitle('');
                setContent('');
                setCategory('');
                setDate(new Date().toISOString().slice(0, 10)); // Reset date
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
                    <label htmlFor="title" className="block">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        className="block w-full p-2 my-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block">Content:</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter post content"
                        className="block w-full h-40 p-2 my-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block">Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Enter post category"
                        className="block w-full p-2 my-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="block w-full p-2 my-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>
                <button type="submit" disabled={isLoading} className="px-3 py-2 text-lg font-semibold bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300">
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </Layout>
    );
}

export default PostCreator;
