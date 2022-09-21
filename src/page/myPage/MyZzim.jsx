import React from 'react';
import Layout from '../../components/elements/GlobalLayout';
import Header from '../../components/elements/GlobalHeader2';
import MyPageZzimContainer from '../../components/mypage/zzim/MyPageZzimContainer';

const MyZzim = () => {
  return (
    <>
      <Header />
      <Layout>
        <MyPageZzimContainer />
      </Layout>
    </>
  );
};

export default MyZzim;
