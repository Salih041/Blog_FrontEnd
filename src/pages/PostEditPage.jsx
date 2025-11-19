import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import "../styles/Posting.css"

function PostEditPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await api.get(`/posts/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error("Error:", err);
                setError("Post data could not be loaded.");
                setIsLoading(false);
            }
        }
        fetchPostData();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await api.put(`/posts/${id}`, {
                title: title,
                content: content
            });

            navigate(`/posts/${id}`);

        } catch (error) {
            console.error("Error:", error);
            setError(error.response ? error.response.data.message : "Error.");
            setIsLoading(false);
        }finally{
            setIsLoading(false);
        }
    }
    if (isLoading && !title) {
        return <p>Loading...</p>;
    }
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    return (
        <div className='post-form-container'>
            <div className='post-form-card'>
                <h1 className='post-form-title'>Edit Your Post</h1>

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="title">Title</label>
                        <input className='form-input' type="text" id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="content">Content</label>
                        <textarea className="form-textarea" id="content" value={content} onChange={(e) => { setContent(e.target.value) }} required></textarea>
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={!isLoading}>
                            Share
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostEditPage
