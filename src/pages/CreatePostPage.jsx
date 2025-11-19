import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api"
import "../styles/Posting.css"

function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post("/posts", {
                title: title,
                content: content
            });
            const newPostId = response.data.savedPost._id;
            navigate(`/posts/${newPostId}`)
        } catch (error) {
            console.error("Create Post error :", error)
            setError(error.response ? error.response.data.message : "Post could not be created!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='post-form-container'>
            <div className='post-form-card'>
                <h1 className='post-form-title'>Create New Post</h1>

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="title">Title</label>
                        <input className='form-input' type="text" id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Title' required />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="content">Content</label>
                        <textarea className="form-textarea" id="content" value={content} onChange={(e) => { setContent(e.target.value) }} placeholder='Write your post' required></textarea>
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            Share
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePostPage
