import React, { useState } from "react";
import Header from "../../components/elements/GlobalHeader";
import Layout from "../../components/elements/GlobalLayout";
import MainContainer from "../../components/market/main/MainContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/elements/buttons/AddPostButton";
import GlobalModal from "../../components/elements/GlobalModal";
import MainBanner from "../../components/market/main/MainBanner";
import Footer from "../../components/elements/GlobalFooter";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.userToken);
  const isLoading = useSelector((state) => state.marketPost.isLoading);
  const onPathHandler = () => {
    navigate("/market/post");
  };
  const moveLogin = () => {
    navigate("/login");
  };
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isModal && (
        <GlobalModal
          name={"로그인"}
          content1={"로그인이 필요한 서비스입니다."}
          content2={"로그인 하시겠습니까?"}
          isModal={isModal}
          setIsModal={setIsModal}
          onClick={moveLogin}
        />
      )}
      <Header />
      <Wrapper>
        <Layout>
          <MainBanner />
          <MainContainer />
          {isLogin ? (
            <AddPostButton
              onClick={onPathHandler}
              isLogin={isLogin}
            ></AddPostButton>
          ) : (
            <AddPostButton
              onClick={() => setIsModal((prev) => !prev)}
              isLogin={isLogin}
            ></AddPostButton>
          )}
        </Layout>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 0rem;
`;

export default Main;
