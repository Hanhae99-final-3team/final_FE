import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getMyWritings } from "../../../redux/modules/myPageSlice";
import Item from "./MyWritingsItem";

const MyWritingsList = () => {
  const dispatch = useDispatch();
  const writings = useSelector((state) => state.myPage.myWritings);
  useEffect(() => {
    dispatch(__getMyWritings());
  }, [dispatch]);

  return (
    <>
      <MyWritingsListWrapper>
        {writings &&
          writings?.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
      </MyWritingsListWrapper>
    </>
  );
};

export default MyWritingsList;

const MyWritingsListWrapper = styled.div`
  width: 100%;
  margin: 1.6rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-collapse: collapse;
`;
