import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';

const ManageMembers = () => {
    const [members, setMembers] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        useAxiosPublic.get('/')
    }, [])
    return (
        <div>
            <h2>All Members</h2>

        </div>
    );
};

export default ManageMembers;