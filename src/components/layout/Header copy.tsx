import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useAuth } from "../../context/auth";
// const links = [
//   { href: '/', label: 'Route 1' },
//   { href: '/', label: 'Route 2' },
// ];
const StrapiEnquiries = () => {
  return (
    <div className="absolute right-0">
      <Link href="https://valo-strapi.herokuapp.com/admin/plugins/content-manager/collectionType/application::enquiry.enquiry">
        <a target="_blank" rel="noreferrer">
          Enquiries
        </a>
      </Link>
    </div>
  );
};
export default function Header() {
  const { user } = useAuth();
  console.log('user',user)
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
    <header className="w-full bg-white absolute ">
      <div className="flex relative justify-center w-full  h-16 bg-rose-900">
        <Image
          className="object-contain"
          layout="fill"
          objectFit="contain"
          src="https://valobucket.s3.amazonaws.com/uploads/2018/06/Valo-Studio-Logo-V2.png"
          alt="valostudio"
        />
      </div>
      {user?.role?.type === "admin" && <StrapiEnquiries/>}
    </header>
  );
}
