import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

function PostCreator() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !content || !category) {
            alert('Please fill in all fields.');
            return;
        }
        setLoading(true);
        const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
        const path = `contents/${category}/${new Date().toISOString().slice(0, 10)}-${formattedTitle}/${formattedTitle}.md`;
        const base64Content = btoa(encodeURIComponent(`# ${title}\n\n${content}`));
        const apiUrl = 'https://tetsby-worker.mcpe9869.workers.dev/';

        try {
            const response = await axios.post(apiUrl, {
                apiToken: process.env.GATSBY_GITHUB_TOKEN,
                repo: 'VinylStage/Tetsby',
                path: path,
                content: base64Content,
                message: `Add new post: ${title}`
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
            } else {
                alert('Failed to create post, response status: ' + response.status);
            }
        } catch (error) {
            console.error('Failed to submit post:', error);
            alert('Failed to create post. Check the console for more information.');
        }
        setLoading(false);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter post content"
                        style={{ margin: "10px 0", width: "100%", height: "150px", padding: "8px" }}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Enter post category"
                        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" disabled={isLoading} style={{ padding: "10px 15px", fontSize: "16px" }}>
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </Layout>
    );
}

export default PostCreator;
