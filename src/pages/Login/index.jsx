import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Alert, Button, TextField } from '@mui/material';
import logo from '../../assets/logo.png'

const Login = () => {
  useEffect(()=> {},[])

  const [email, setEamil] = useState('');
  const [license, setLicense] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChangeEmail = (e) => {
    setEamil(e.target.value);
  }
  const handleChangeLicense = (e) => {
    setLicense(e.target.value);
  }

  const fetchUser = async() => {
    const docRef = doc(db, process.env.REACT_APP_FIREBASE_COLLECTION_NAME, process.env.REACT_APP_FIREBASE_DOCUMENT_NAME);
    const docSnap = await getDoc(docRef);
    const data = await docSnap.data();
    return  {docRef: docRef, user: data[email]};
  }

  const handleClickLogin = async() => {
    if(!email.trim()){
      setAlertMessage('이메일을 입력해주세요.');
      return;
    }

    if(!license.trim()){
      setAlertMessage('라이센스 키를 입력해주세요.');
      return;
    }

    let {docRef, user}  = await fetchUser();

    if(!user) {
      setAlertMessage('사용자 정보가 없습니다.');
      return;
    }

    if(user.key !== license) {
      setAlertMessage('라이센스 키가 일치하지 않습니다.');
      return;
    }

    if(user.registered) {
      setAlertMessage('이미 등록된 라이센스키 입니다.');
      return;
    }

    saveUserInfo(docRef, user);
  }

  const saveUserInfo = async(docRef, user) => {
    setAlertMessage('');
    user.registered = true;

    await updateDoc(docRef, {[email]: user});

    let data = JSON.stringify({
      email: email,
      key: user.key
    })

    localStorage.setItem('esource', data)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-[30px] w-[50%] items-center relative bottom-[5%]'>
        <img className='w-[90%] h-[90%]' src={logo} alt="로고"/>
        <TextField className='w-full' variant='outlined' placeholder='이메일을 입력해주세요' label='이메일' value={email} onChange={handleChangeEmail}/>
        <TextField className='w-full' variant='outlined' placeholder='라이센스 키를 입력해주세요' label='라이센스 키' value={license} onChange={handleChangeLicense}/>
        <Button className='w-full' variant='contained' size='large' onClick={handleClickLogin}>
          라이센스 등록
        </Button>
        {
          alertMessage && <Alert className='w-full' severity='error'>오류: {alertMessage}</Alert>
        }
      </div>
    </div>
  )
};

export default Login;