import React, { useState } from 'react';
import { FaUserAltSlash } from "react-icons/fa";
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';

const Member = ({ member }) => {
    const [memberRole, setMemberRole] = useState(member.role)
    const axiosPublic = useAxiosPublic()
    const handleRemoveRole = () => {
        axiosPublic.put(`/members/:member_id`)
            .then(res => setMemberRole(res.data.role))
    }
    return (
        <tr>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>{memberRole}</td>
            <td>
                <button className='btn btn-sm bg-red-500 text-xl text-white border-none hover:bg-red-800' onClick={handleRemoveRole}>
                    <FaUserAltSlash />
                </button>
            </td>
        </tr>
    );
};

export default Member;