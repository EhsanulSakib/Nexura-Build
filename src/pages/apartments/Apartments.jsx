import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import ApartmentCard from '../../components/apartmentCard/ApartmentCard';
import './Apartments.css'

const Apartments = () => {
    const [apartments, setApartments] = useState([])
    const axiosPublic = useAxiosPublic()
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        axiosPublic.get('/apartmentsCount')
            .then(res => {
                setTotalCount(res.data.count)
            })
    }, [])

    const itemPerPage = 6
    const numOfPages = Math.ceil(totalCount / itemPerPage)

    const pages = []
    for (let i = 0; i < numOfPages; i++) {
        pages.push(i)
    }

    useEffect(() => {
        axiosPublic.get(`/apartments?page=${currentPage}&size=${itemPerPage}`)
            .then(res => {
                setApartments(res.data)
            })
    }, [currentPage, itemPerPage])

    return (
        <div className='min-h-screen flex flex-col justify-between w-11/12 m-auto'>
            <div className=' my-4 md:my-8 lg:my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 gap-y-8'>
                {
                    apartments?.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                }
            </div>

            <div className='pagination flex items-center flex-wrap justify-center mb-4 md:mb-8 lg:mb-12 gap-2'>
                {
                    pages?.map(page => <button className={currentPage === page && 'selected'} key={page} onClick={() => setCurrentPage(page)}>{page + 1}</button>)
                }
            </div>
        </div>
    );
};

export default Apartments;