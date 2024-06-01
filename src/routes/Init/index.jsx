import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useModal } from '../../hooks';
import { Button } from '@mui/material';

const Init = ({ children }) => {
  const navigate = useNavigate();
  const { handleModalOpen, handleModalClose, ModalComponent } = useModal();

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=> {
    const licenseData = localStorage.getItem('esource');

    if(!licenseData) {
      navigate('/login');
    }else {
      const data = JSON.parse(localStorage.getItem('esource'));
      const email = data.email;
      const key = data.key;     
      
      isRegisteredUser(email, key);
    }
  },[])

  useEffect(()=> {
    if(!errorMessage) return;

    handleModalOpen(
      <div>
        <div className='mb-[30px] whitespace-pre leading-[20px]'>{errorMessage}</div>
        <div className='float-right'><Button onClick={()=> {handleModalClose(); afterModalClose();}} variant="contained">확인</Button></div>
      </div>,
      afterModalClose
    )
  },[errorMessage])

  const afterModalClose = () => {
    localStorage.removeItem('esource');
    navigate('/login');
  }

  const isRegisteredUser = async(email, key) => {
    const docRef = doc(db, process.env.REACT_APP_FIREBASE_COLLECTION_NAME, process.env.REACT_APP_FIREBASE_DOCUMENT_NAME);
    const docSnap = await getDoc(docRef);
    const data = await docSnap.data();
    const user = data[email];

    if(!user) {
      setErrorMessage('사용자 정보가 없습니다');
      return;
    }

    if(key !== user.key) {
      setErrorMessage('라이센스 키가 일치하지 않습니다');
      return;
    }

    if(!user.registered) {
      setErrorMessage('사용자 정보가 없습니다');
      return;
    }

    const liecnseEndTime = user.end_time;
    const firestoreDate = new Date(liecnseEndTime.seconds * 1000 + liecnseEndTime.nanoseconds / 1000000);
    const currentDate = new Date();

    if (currentDate > firestoreDate) {
      setErrorMessage(`라이센스가 만료되었습니다.\n연장문의 부탁드립니다.`);
      return;
    }
  }

  return (
  <div>
    <div className='w-screen h-screen'>{children}</div>
    <ModalComponent/>
  </div>
) ;
};

export default Init;