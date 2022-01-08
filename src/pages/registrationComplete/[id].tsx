import Link from 'next/link';
import React from 'react';

function RegistartionComplete() {
  return (
    // <div className='absolute bg-gray-100 inset-0'>
    <div className='flex justify-center items-center mx-3 mt-10 lg:mt-24'>
      <Link href='/expo'>
        <div className='flex flex-col items-center px-4 py-6 max-w-md text-center bg-white rounded-xl md:px-8 md:py-12'>
          <div className='text-2xl'>Your discount is registered</div>
          <div className='mt-4 text-lg'>Thank you for visiting Valo Studio</div>
          <div className='mt-1 text-lg'>
            We look forward to hearing from you soon
          </div>
        </div>
      </Link>
    </div>
    // </div>
  );
}

export default RegistartionComplete;
