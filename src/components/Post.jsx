import React from 'react'
import { NavLink } from 'react-router-dom';
import "../styles/postCard.css"

function Post({ postProps }) {
    const { _id, title, content, comments, commentCount, like, likeCount, author, createdAt, tags } = postProps;
    const formattedDate = new Date(createdAt).toLocaleDateString('tr-TR');

    const stripHtml = (html) => {
        let modifiedHtml = html.replace(/<\/(p|div|h[1-6]|li|ul|ol|tr)>/gi, ' ');
        modifiedHtml = modifiedHtml.replace(/<br\s*\/?>/gi, ' ');
        const doc = new DOMParser().parseFromString(modifiedHtml, 'text/html');
        let text = doc.body.textContent || "";
        return text.replace(/\s+/g, ' ').trim();
    };
    const plainText = stripHtml(content);
    return (
        <article className='post-card'>
            <h2 className='post-card__title'><NavLink to={`/posts/${_id}`}>{title}</NavLink></h2>

            <div className='post-card__meta'>
                <span className='post-card__author'>by <NavLink to={`/profile/${author._id}`} className={"post-card__author_username"}>{author.username}</NavLink></span>
                <span> • </span>
                <span className='post-card__post-date'>{formattedDate}</span>
            </div>

            <p className='post-card__content'>
                {plainText}
            </p>

            {tags && tags.length > 0 && (
                <div className='post-card__tags'>
                    {tags.map((tag, index) => (
                        <span key={index} className='post-card__tag'>#{tag}</span>
                    ))}
                </div>
            )}

            <footer className='post-card__footer'>
                <div className="post-card__stat">
                    <span>❤️</span> {likeCount} Like
                </div>

                <div className="post-card__stat">
                    <span>💬</span> {commentCount} Comment
                </div>
            </footer>
        </article>
    )
}

export default Post
