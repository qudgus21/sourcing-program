import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Init = ({ children }) => {
  const navigate = useNavigate();

  useEffect(()=> {
    const licenseData = localStorage.getItem('esource')

    if(!licenseData) {
      navigate('/login');
    }else {
      //로그인정보 확인
      navigate('/');
    }
  },[])

  return <>{children}</>;
};

export default Init;