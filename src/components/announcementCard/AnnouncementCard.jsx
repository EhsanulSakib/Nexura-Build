import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { MdDelete } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
const AnnouncementCard = ({ announcement, deleteAnnouncement }) => {
    const { databaseUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const route = useNavigate()

    const isAdmin = databaseUser.role === 'admin'
    return (
        <div className='w-full p-4 md:p-6 lg:p-8 shadow-md rounded-sm'>
            <div className='flex w-full gap-8 justify-between items-center'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-blue-500'>{announcement.post_title}</h2>

                <div className='flex gap-2 text-lg md:text-xl lg:text-2xl'>
                    {
                        isAdmin ?
                            <button className='bg-red-500 text-white py-2 px-3 rounded-md' onClick={() => deleteAnnouncement(announcement._id)}>
                                <MdDelete />
                            </button>
                            :
                            ""
                    }
                    {
                        isAdmin ?
                            <button className='bg-blue-500 text-white py-2 px-3 rounded-md' onClick={() => route(`/admin-dashboard/update-announcement/${announcement._id}`)}>
                                <MdOutlineUpdate />
                            </button>
                            :
                            ""
                    }
                </div>
            </div>
            <h3 className='font-semibold'>{announcement.post_date}</h3>
            <p className='mt-4 text-justify'>{announcement.description}</p>
        </div>
    );
};

export default AnnouncementCard;