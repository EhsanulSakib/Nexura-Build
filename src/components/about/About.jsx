import React from 'react';

const About = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row gap-12 items-center mb-8 lg:mb-12 mx-[2%] xl:mx-[3%] text-justify'>
            <div className='rounded-md md:ml-4 w-11/12 flex flex-col gap-0'>
                <img src="https://i.ibb.co/s56Rfft/tracy-kasssandra-z8-RNAxt2v-I-unsplash.jpg" alt="" className='w-full lg:w-5/6 -ml-4 rounded-lg border-2 border-gray-300' />
                <img src="https://i.ibb.co/ZhTvn6c/9078.jpg" alt="" className='w-full lg:w-5/6 rounded-lg ml-4 -mt-8 border-2 border-gray-300' />
            </div>
            <div className='text-xs md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl w-full md:w-4/5 rounded-md'>
                <p >A modern architectural marvel redefining urban living. Standing tall with its 18 majestic floors, Nexura Building offers a blend of luxury, comfort, and sophistication in every corner. Each floor hosts four meticulously designed apartments, ensuring exclusivity and privacy for all our residents.</p>
                <p className='mt-4'>
                    Our apartments are thoughtfully crafted to cater to contemporary lifestyles, featuring:
                </p>
                <ul className='mt-4 list-disc ml-6 lg:ml-10'>
                    <li><span className='font-bold'>2 Spacious Bedrooms</span></li>
                    <li><span className='font-bold'>2 Modern Bathrooms</span></li>
                    <li><span className='font-bold'>1 Inviting Balcony</span></li>
                    <li><span className='font-bold'>1 Functional Kitchen</span></li>
                    <li><span className='font-bold'>1 Stylish Drawing Room</span></li>
                </ul>
                <p className='mt-4'>
                    Nexura Building is more than just a residence; it's a community where you can create lasting memories. Our prime location offers easy access to shopping, dining, and entertainment, making urban living both convenient and exciting.
                </p>
                <p className='mt-4'>
                    Discover the perfect blend of luxury and practicality at Nexura Building. Your dream home awaits!
                </p>
            </div>
        </div>
    );
};

export default About;