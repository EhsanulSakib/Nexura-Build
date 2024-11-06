import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccessModal from '../modal/PaymentSuccessModal';

const PaymentForm = () => {
  const { selectedMonth, setSelectedMonth } = useContext(AuthContext)
  console.log({ selectedMonth })
  const { databaseUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const [clientSecret, setClientSecret] = useState("");
  const [agreement, setAgreement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const notifySuccess = () => toast.success('Payment Successful');
  const notifyError = () => toast.error('Payment Failed');

  useEffect(() => {
    axiosPublic.get(`/member-agreement?email=${databaseUser.email}`)
      .then(res => {
        setAgreement(res.data)
      })
  }, [])

  useEffect(() => {
    axiosPublic.post('/create-payment-intent', { price: agreement?.price })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
  }, [axiosPublic, selectedMonth])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      console.log("CardElement not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message)
    } else {
      console.log('payment method', paymentMethod);
      setError('')
    }

    const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: databaseUser?.name || 'anonymous',
          email: databaseUser?.email || 'anonymous',
        }
      }
    });

    if (cardConfirmError) {
      console.log(cardConfirmError);
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);

        const paymentInfo = {
          userName: databaseUser?.name,
          email: databaseUser?.email,
          price: agreement?.price,
          payRentDate: new Date().toISOString().split('T')[0],
          transactionId: paymentIntent.id,
          monthOfPayment: selectedMonth,
          status: 'successful',
        }
        console.log(paymentInfo);

        axiosPublic.post('/pay-rent', paymentInfo)
          .then(res => {
            console.log(res.data);
            notifySuccess();
            setModalOpen(true);
          }
          )
          .catch(err => {
            console.log(err);
            notifyError(err.message);
          })
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='pt-12 mt-2'>
          <div className=' py-4 px-2 border border-gray-400'>
            <CardElement
              options={{
                iconStyle: 'solid',
                style: {
                  base: {
                    iconColor: '#c4f0ff',
                    color: '#aab7c4',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    iconColor: '#FFC7EE',
                    color: '#FFC7EE',
                  },
                },
              }}
              onReady={() => {
                console.log('CardElement [ready]');
              }} />
          </div>
          <p className=' text-red-500'>{error}</p>
          <button disabled={!stripe || !clientSecret} type="submit" className=' disabled:bg-gray-400 bg-blue-500 w-full py-1 text-lg font-semibold text-white mt-1'>Confirm Payment</button>
        </div>
      </form>
      {
        modalOpen && <PaymentSuccessModal setOpenModal={setModalOpen} />
      }
    </div>
  );
};

export default PaymentForm;