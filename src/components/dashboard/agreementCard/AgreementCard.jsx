import React, { useState } from 'react';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const AgreementCard = ({ agreement, setAgreements }) => {
    const [agreementData, setAgreementData] = useState(agreement)
    const axiosPublic = useAxiosPublic()
    const notifyAccept = () => toast.success('Agreement Accepted')
    const notifyReject = () => toast.success('Agreement Rejected')
    const notifyError = errorName => toast.error(errorName)
    const handleAccept = () => {
        Swal.fire({
            title: 'Accept this agreement?',
            icon: 'information',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#808080',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Back'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.put(`/accept-agreement/${agreementData._id}`)
                        .then(res => {
                            notifyAccept()
                            setAgreementData(res.data)
                        })
                        .catch(err => {
                            notifyError(err.message)
                        })
                }
            })
    }

    const handleReject = () => {
        axiosPublic.put(`/agreement/${agreement._id}`)
            .then(res => {
                axiosPublic.get('/agreement')
                    .then(res => {
                        console.log(res.data)
                        setAgreements(res.data)
                    })
            })
    }
    return (
        <tr>
            <td className='flex items-center gap-4 min-w-96 border-r'>
                {
                    agreementData.userPhoto ?
                        <img src={agreementData.userPhoto} alt="profile" className='h-16 w-16 rounded-full object-cover object-center' />
                        :
                        <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="profile" className='h-16 w-16 rounded-full object-cover object-center' />
                }
                <div className=''>
                    <h2 className='font-bold'>{agreementData.userName}</h2>
                    <h2>{agreementData.userEmail}</h2>
                </div>
            </td>
            <td className='min-w-44 border-r'>
                <h2><span className='font-bold'>Apartment No: </span>{agreementData.apartment_no}</h2>
                <h2><span className='font-bold'>Floor No: </span>{agreementData.floor_no}</h2>
                <h2><span className='font-bold'>Block: </span>{agreementData.block_name}</h2>
            </td>
            <td className='border-r'>
                {agreementData.status}
            </td>
            <td>
                {
                    agreementData.status === 'pending' ?
                        <div className='flex gap-3'>
                            <button className='btn btn-sm bg-green-500 text-xl text-white border-none hover:bg-green-800' onClick={handleAccept}>
                                <TiTick />
                            </button>
                            <button className='btn btn-sm bg-red-500 text-xl text-white border-none hover:bg-red-800' onClick={handleReject}>
                                <RxCross2 />
                            </button>
                        </div>
                        :
                        ""
                }
            </td>

        </tr>
    );
};

export default AgreementCard;