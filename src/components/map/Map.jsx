import React from 'react';

const Map = () => {
  return (
    <div className='flex flex-col justify-between items-center gap-4'>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='text-blue-500 text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold '>Location</h1>
      </div>

      <div className='w-full'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.9830610484366!2d90.41916644062654!3d23.749795474662168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b96869f8e3e3%3A0x1859c6396e6d73b0!2s280%2FC!5e0!3m2!1sen!2sbd!4v1729490626984!5m2!1sen!2sbd" className='w-full h-[300px] ' allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
};

export default Map;