import React, { useContext, useState } from 'react';
import { FaUserAltSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../provider/AuthProvider';

const Member = ({ member }) => {
    const { databaseUser } = useContext(AuthContext)
    const [memberDetails, setMemberDetails] = useState(member)
    const axiosPublic = useAxiosPublic()
    const notifySuccess = () => toast.success('Agreement Cancelled');
    const notifyError = (errorName) => toast.error(errorName);
    const handleRemoveRole = () => {
        Swal.fire({
            title: 'Are you sure you want to remove this member?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#808080',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.put(`/delete-member/${memberDetails.email}`)
                        .then(res => {
                            notifySuccess()
                            setMemberDetails(res.data)
                        })
                        .catch(err => {
                            notifyError(err.message)
                        })
                }
            })
    }
    return (
        <tr>
            <td>{memberDetails.name}</td>
            <td>{memberDetails.email}</td>
            <td>{memberDetails.role}</td>
            <td>
                {
                    memberDetails.role === 'user' || memberDetails.role === 'admin' ?
                        ""
                        :
                        (
                            databaseUser.role === 'admin' ?
                                <button className='btn btn-sm bg-red-500 text-xl text-white border-none hover:bg-red-800' onClick={() => handleRemoveRole()}>
                                    <FaUserAltSlash />
                                </button>
                                :
                                <h2 className='text-red-500 font-bold text-center'>No Access</h2>
                        )
                }

            </td>
        </tr>
    );
};

export default Member;