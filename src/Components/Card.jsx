import React from 'react'

const Card = ({ data }) => {
  return (
    <>
      {data && data.length > 0 ? (
        data.map((news, index) => (
          <div 
            key={news.url || index} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition m-2"
          >
            {news.urlToImage && (
              <img 
                src={news.urlToImage} 
                alt={news.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{news.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{news.description}</p>
              <a 
                href={news.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Read More
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No news to display.</p>
      )}
    </>
  )
}

export default Card
