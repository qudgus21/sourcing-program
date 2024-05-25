import React, { useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Button, Alert } from 'react-bootstrap';

const Home = () => {

  useEffect(()=> {
    const localUserData = localStorage.getItem('userData')

    console.log('useeffect실행')

    if(!localUserData) {
      console.log('데이터 없음')
      localStorage.setItem('userData', JSON.stringify({
        email: 'emilaasdasd',
        license: 'testlicens',
        orderNumber: '123',
      }));
    }else {
      console.log('데이터 있음', JSON.parse(localUserData))
    }

    //로컬 파일 읽어서 라이센스를 등록한 적이 있는지 확인한다.
    //로컬 파일이 없다면
      //모달을 띄워서 아이디, 라이센스를 입력받는다.
      //아이디, 라이센스가 파베데이터와 일치하는지 확인한다.
        //일치한다면
          //로컬 파일에 아이디, 라이센스를 등록한다.
          //로그인 시킨다.
        //일치하지 않는다면
          //알럿을 띄운다.
    //로컬 파일이 있다면
      //로컬 파일 데이터을 기반으로 파베에서 데이터를 끌고 온다.
      //아이디, 라이센스 일치여부를 확인하고, 만료되지 않았는지 확인한다 => 오류 시 각각 알림이 필요하다.
    
    //*로컬파일 난독화 필수고, 아무것도 아닌 파일처럼 쓰윽 저장해둘필요있음
    //*이렇게되면 여러 컴퓨터에서 접속가능해짐(일단 고려하지 않도록함)
  },[])

  // useEffect(()=> {
  //   const fetchUsers = async () => {
  //     const docRef = doc(db, process.env.REACT_APP_FIREBASE_COLLECTION_NAME, process.env.REACT_APP_FIREBASE_DOCUMENT_NAME);
  //     const docSnap = await getDoc(docRef);
  //     console.log(docSnap.data());
  //   };

  //   fetchUsers();
  // },[])

  return (
    <div className="home-page">
      <Alert variant="success" className="mt-[10px]">
        This is a success alert from React-Bootstrap3
      </Alert>
    </div>
  )
};

export default Home;