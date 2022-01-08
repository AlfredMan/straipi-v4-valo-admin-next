import Image from 'next/image';
import * as React from 'react';
// const links = [
//   { href: '/', label: 'Route 1' },
//   { href: '/', label: 'Route 2' },
// ];

export default function Header() {
  return (
    // <header className='sticky top-0 z-50 bg-white'>
    //   <div className='layout flex justify-between items-center h-14'>
    //     <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
    //       Home
    //     </UnstyledLink>
    //     <nav>
    //       <ul className='flex justify-between items-center space-x-4'>
    //         {links.map(({ href, label }) => (
    //           <li key={`${href}${label}`}>
    //             <UnstyledLink href={href} className='hover:text-gray-600'>
    //               {label}
    //             </UnstyledLink>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
    <header className='w-full bg-white'>
      <div className='flex relative justify-center w-full h-16 bg-rose-900'>
        {/* <Image
          className='object-contain'
          layout='fill'
          objectFit='contain'
          src='https://valobucket.s3.amazonaws.com/uploads/2018/06/Valo-Studio-Logo-V2.png'
          alt='valostudio'
        /> */}
      </div>
    </header>
  );
}
