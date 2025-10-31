import React, { useState } from 'react'
import Card from './Card'
import axios from 'axios';

const NewsApp = () => {
    const [search, setSearch] = useState('')
    const [newsData, setNewsData] = useState([])
    const API_KEY = "6be78d02561e4ed1ada762dd8a45ff0b";

    // Fetch news based on query
    const getData = async (query) => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
            setNewsData(response.data.articles)
            setSearch('') // clear search input after fetching
        } catch (error) {
            console.error(error)
        }
    }

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchClick = () => {
        if (search.trim() !== '') {
            getData(search)
        }
    }

    const handleCategoryClick = (category) => {
        getData(category)
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Navbar */}
            <nav className='flex flex-col md:flex-row items-center justify-between bg-blue-500 text-white p-4 shadow-md'>
                <div className='text-2xl font-bold mb-2 md:mb-0'>
                    Trending News
                </div>
                <ul className='flex space-x-4 mb-2 md:mb-0'>
                    <li className='hover:text-gray-200 cursor-pointer'>All News</li>
                    <li className='hover:text-gray-200 cursor-pointer'>Trending</li>
                </ul>
                <div className='flex items-center space-x-2'>
                    <input
                        type='text'
                        placeholder='Search News'
                        value={search}
                        onChange={handleInput}
                        className='w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    />
                    <button onClick={handleSearchClick} className='bg-white text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition'>
                        Search
                    </button>
                </div>
            </nav>

            <p className='text-center text-xl m-4'>Stay Updated with Trending News</p>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 mb-6">
                {['Sports', 'Politics', 'Entertainment', 'Health', 'Fitness'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-4 py-2 rounded-full text-white transition
                            ${cat === 'Sports' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                            ${cat === 'Politics' ? 'bg-green-500 hover:bg-green-600' : ''}
                            ${cat === 'Entertainment' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                            ${cat === 'Health' ? 'bg-red-500 hover:bg-red-600' : ''}
                            ${cat === 'Fitness' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-8">
                {newsData.length > 0 ? <Card data={newsData} /> : <p className="col-span-full text-center text-gray-500">No news to display.</p>}
            </div>
        </div>
    )
}

export default NewsApp
