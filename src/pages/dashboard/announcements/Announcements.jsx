import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import AnnouncementCard from '../../../components/announcementCard/AnnouncementCard';
import Swal from 'sweetalert2'

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([])
    const axiosPublic = useAxiosPublic()

    const deleteAnnouncement = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.delete(`/delete-announcements/${id}`)
                        .then(res => {
                            console.log(res.data)
                            setAnnouncements(announcements.filter(announcement => announcement._id !== id))
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        })
                        .catch(err => {
                            console.log("error in deleting announcement", err)
                        })
                }
            })

    }

    useEffect(() => {
        axiosPublic.get('/announcements')
            .then(res => {
                setAnnouncements(res.data)
            })
    }, [])

    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Announcements</h2>
            <div className='flex flex-col gap-8 my-4'>
                {
                    announcements?.map(announcement => <AnnouncementCard key={announcement._id} announcement={announcement} deleteAnnouncement={deleteAnnouncement}></AnnouncementCard>)
                }
            </div>
        </div>
    );
};

export default Announcements;