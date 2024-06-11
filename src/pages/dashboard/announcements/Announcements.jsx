import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import AnnouncementCard from '../../../components/announcementCard/AnnouncementCard';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/announcements')
            .then(res => {
                setAnnouncements(res.data)
            })
    }, [])

    return (
        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mt-8'>Announcements</h2>
            <div className='flex flex-col gap-4 mr-4 my-4'>
                {
                    announcements?.map(announcement => <AnnouncementCard key={announcement._id} announcement={announcement}></AnnouncementCard>)
                }
            </div>
        </div>
    );
};

export default Announcements;