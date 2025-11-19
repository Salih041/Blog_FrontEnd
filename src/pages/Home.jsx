import React, { useState, useEffect } from 'react'
import api from '../api';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import "../styles/home.css"
function Home() {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, limit: 20, totalResults: 0 })
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.get(`/posts?page=${page}&limit=20`);
            setPosts(response.data.data);
            setPagination(response.data.pagination)
        } catch (error) {
            console.log("error : ", error);
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== page) {
            setIsLoading(true);
            //fetchPosts(newPage);
            setPage(newPage);
        }
    };

    if (isLoading) return <p className='loading'>LOading...</p>;
    if (error) return <p className='error'>Error: {error}</p>;
    if (posts.length <= 0) return <p>---------</p>
    return (
        <>
        <div className='posts-container'>
            {
                posts.map((post) => (
                    <Post key={post._id} postProps={post}></Post>
                ))
            }
        </div>
        <div className='home__controls'>
            <button onClick={()=>{handlePageChange(page-1)}} disabled={page===1}>prev</button>
            <span>Page {page} / {pagination.totalPages}</span>
            <button onClick={()=>{handlePageChange(page+1)}} disabled={page===pagination.totalPages}>next</button>
        </div>
        </>
    )
}

export default Home
