import React from "react";
import styled from "styled-components";
import MyZzimList from "./MyZzimList";

const MyPageZzimContainer = () => {
  return (
    <>
      <SectionWrapper>
        <MyZzimTitle>찜 목록</MyZzimTitle>
      </SectionWrapper>
      <MyZzimList />
    </>
  );
};

export default MyPageZzimContainer;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: row;
  padding-top: 9rem;
  margin-bottom: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const MyZzimTitle = styled.h1`
  font-size: 2.4rem;
  margin: 0 3rem;
  font-weight: 700;
`;
