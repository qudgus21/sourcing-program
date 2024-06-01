import React, { useState } from 'react';
import { Sidebar } from '../../components';
import InfinitSourcing from './InfinitSourcing';
import UrlSourcing from './UrlSourcing';
import SellerFinder from './SellerFinder';

const pages = ['무한소싱', '주소소싱', '셀러찾기']

const Home = () => {

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex w-[100%] h-[100%]">
      <div className='w-[20%]'><Sidebar setCurrentPage={setCurrentPage} pages={pages}/></div>
      <div className='w-[80%] bg-[#F1F5F9]'>
        {
          currentPage === 0 && <InfinitSourcing/>
        }
        {
          currentPage === 1 && <UrlSourcing/>
        }
        {
          currentPage === 2 && <SellerFinder/>
        }
      </div>
    </div>
  )
};

export default Home;