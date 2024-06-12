import React from 'react';
import { TiTick } from "react-icons/ti";

const AgreementCard = ({ agreement }) => {
    const handleAccept = () => {

    }

    const handleReject = () => {

    }
    return (
        <tr>
            <td>
                <h2>{agreement.userName}</h2>
                <h2>{agreement.userEmail}</h2>
            </td>
            <td>
                <h2><span className='font-bold'>Apartment No: </span>{agreement.apartment_no}</h2>
                <h2><span className='font-bold'>Floor No: </span>{agreement.floor_no}</h2>
                <h2><span className='font-bold'>Block: </span>{agreement.block_name}</h2>
            </td>
            <td>
                <button className='btn btn-sm bg-green-500 text-xl text-white border-none hover:bg-green-800' onClick={handleAccept}>
                    <TiTick />
                </button>
            </td>
            <td>
                <button className='btn btn-sm bg-red-500 text-xl text-white border-none hover:bg-red-800' onClick={handleReject}>
                    <TiTick />
                </button>
            </td>

        </tr>
    );
};

export default AgreementCard;