import React from 'react';
import Layout from '../../components/elements/GlobalLayout';
import Header from '../../components/elements/GlobalHeader2';
import MyViewedProductsContainer from '../../components/mypage/products/MyViewedProductsContainer';
const MyViewedProucts = () => {
  return (
    <>
      <Header />
      <Layout>
        <MyViewedProductsContainer />
      </Layout>
    </>
  );
};

export default MyViewedProucts;
