import React from 'react';
import Header from '../../components/elements/GlobalHeader2';
import Layout from '../../components/elements/GlobalLayout';
import MyWritingsContainer from '../../components/mypage/writings/MyWritingsContainer';

const MyWritings = () => {
  return (
    <>
      <Header />
      <Layout>
        <MyWritingsContainer />
      </Layout>
    </>
  );
};

export default MyWritings;
