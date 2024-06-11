import React from 'react';

const AnnouncementCard = ({ announcement }) => {
    return (
        <div className='w-full p-4 border border-gray-400 rounded-md'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-blue-500'>{announcement.post_title}</h2>
            <h3>{announcement.post_date}</h3>
            <p className='mt-4'>{announcement.description}</p>
        </div>
    );
};

export default AnnouncementCard;