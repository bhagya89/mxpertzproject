import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../app/storiesSlice';

const ScienceFictionStories = () => {
  const dispatch = useDispatch();
  const { stories, loading, error } = useSelector((state) => state.stories);
  const [filter, setFilter] = useState('All');
  const [pageTitle, setPageTitle] = useState('Science Fiction Stories');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showNavyBackground, setShowNavyBackground] = useState(false); 

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setFilter(category);
    setShowNavyBackground(true); 
  };

  const handleStoryCardClick = (story) => {
    setSelectedStory(story);
    setPageTitle('The Lost City of Future Earth');
    setFilter(story.Status);
    setShowNavyBackground(true); 
  };

  const filteredStories = filter === 'All' ? stories : stories.filter(story => story.Status === filter);

  return (
    <div className={`min-h-screen relative ${showNavyBackground ? 'bg-gradient-to-b from-blue-900 via-gray-800 to-gray-700' : ''}`} style={{ backgroundImage: `url(https://images6.alphacoders.com/131/1317388.jpeg)` }}>
      <div className="p-8 relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">BrainyLingo</div>
          <nav className="flex space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">Leaderboard</a>
            <a href="#" className="text-white">Daily Quiz</a>
            <a href="#" className="text-white">Genres</a>
          </nav>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">Sign Out</button>
        </header>

        <h1 className="text-center text-white text-4xl font-bold mb-8">{pageTitle}</h1>

        <div className="flex justify-center mb-8 space-x-4">
          <button onClick={() => handleCategoryClick('New')} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full">New</button>
          <button onClick={() => handleCategoryClick('In Progress')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full">In Progress</button>
          <button onClick={() => handleCategoryClick('Completed')} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full">Completed</button>
          <button onClick={() => handleCategoryClick('All')} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-full">Clear All</button>
        </div>

        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {selectedStory && (
              <div className="border-dotted border-4 col-span-1 bg-gray-800 text-white p-4 rounded" onClick={() => handleCategoryClick(selectedStory.Status)}>
                <h2 className="text-white text-center text-sm my-2">{selectedStory.Status}</h2>
              </div>
            )}

            {filteredStories.map(story => (
              <div key={story.id} className="bg-indigo-400 text-white p-4 rounded-2xl" onClick={() => handleStoryCardClick(story)}>
                <div className="h-48 bg-cover bg-center mb-4" style={{ backgroundImage: `url(https://ik.imagekit.io/dev24/${story.Image})` }}></div>
                <div className="card-body">
                  <h2 className="text-white text-center text-sm my-2">{story.Title}</h2>
                  <button className="ml-16 text-center bg-white text-red-500 px-10 rounded-full">{story.Status}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button className="text-white">Previous</button>
          <button className="text-white">Next</button>
        </div>
      </div>

    
      {showNavyBackground && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700"></div>}
    </div>
  );
};

export default ScienceFictionStories;
