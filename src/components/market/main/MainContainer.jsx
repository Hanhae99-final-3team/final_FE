import React, { useState, useEffect, useRef } from 'react';
import ItemList from '../../market/main/ItemList';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getData,
  __getPost,
  getTwoCategory,
  __getItemCategories,
  addPage,
  doubleListToZero,
} from '../../../redux/modules/market/postSlice';
import option from './Option';

const MainContainer = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.marketPost.list);
  const dogList = useSelector((state) => state.marketPost.dogList);
  const catList = useSelector((state) => state.marketPost.catList);
  const foodList = useSelector((state) => state.marketPost.foodList);
  const snackList = useSelector((state) => state.marketPost.snackList);
  const clothesList = useSelector((state) => state.marketPost.clothesList);
  const beautyList = useSelector((state) => state.marketPost.beautyList);
  const toyList = useSelector((state) => state.marketPost.toyList);
  const etcList = useSelector((state) => state.marketPost.etcList);
  const doubleList = useSelector((state) => state.marketPost.doubleList);
  const item = useSelector((state) => state.marketPost.itemCategory);
  const categoryPage = useSelector((state) => state.marketPost.page);

  const [state, setState] = useState('');
  const [page, setPage] = useState(0);
  const lastIntersectingData = useRef(null);

  const handleChange = (event) => {
    setState(event.target.value);
    let e = document.getElementById('selectElementID');
    let text = e.options[e.selectedIndex].text;
    localStorage.setItem('petCategory', `${text}`);
    setPage(0);
    dispatch(doubleListToZero());
  };

  // const [selected, setSelected] = useState('');

  // useEffect(() => {
  //   if (selected === 'dog') {
  //     localStorage.setItem('petCategory', `강아지`);
  //   } else if (selected === 'cat') {
  //     localStorage.setItem('petCategory', `고양이`);
  //   } else if (selected === 'all') {
  //     localStorage.setItem('petCategory', '모두');
  //   }
  // }, [selected]);

  //observe 콜백 함수
  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('!?!?!?');
        setPage((page) => page + 1);
        dispatch(addPage());
        // 현재 타겟을 observe한다.
        observer.observe(entry.target);
      }
    });
  };

  const itemCategory = localStorage.getItem('itemCategory');
  const petCategory = localStorage.getItem('petCategory');

  useEffect(() => {
    if (petCategory === null && itemCategory === null) {
      dispatch(__getPost({ page: page }));
    }
    if (petCategory === '강아지' && itemCategory === null) {
      dispatch(getData({ state: '강아지', page: page }));
    }
    if (petCategory === '고양이' && itemCategory === null) {
      dispatch(getData({ state: '고양이', page: page }));
    }
    if (petCategory === '모두' && itemCategory === null) {
      dispatch(__getPost({ page: page }));
    }
    if (petCategory === null && itemCategory !== null) {
      dispatch(__getItemCategories({ itemCategory: itemCategory, page: page }));
    }
    if (petCategory !== null && itemCategory !== null) {
      if (petCategory === '모두' && itemCategory !== null) {
        dispatch(
          __getItemCategories({ itemCategory: itemCategory, page: page })
        );
      } else {
        dispatch(
          getTwoCategory({
            itemCategory: itemCategory,
            page: page,
            petCategory: petCategory,
          })
        );
      }
    }
  }, [page, dispatch, petCategory, itemCategory]);

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer;
    if (
      lastIntersectingData &&
      ((list !== null && list.length !== 0) ||
        (dogList !== null && dogList.length !== 0) ||
        (catList !== null && catList.length !== 0) ||
        (foodList !== null && foodList.length !== 0) ||
        (snackList !== null && snackList.length !== 0) ||
        (clothesList !== null && clothesList.length !== 0) ||
        (beautyList !== null && beautyList.length !== 0) ||
        (toyList !== null && toyList.length !== 0) ||
        (etcList !== null && etcList.length !== 0) ||
        (doubleList !== null && doubleList.length !== 0))
    ) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersectingData.current);
      // 관찰 중지 시점 (lastData)

      // list의 length-1의 데이터가 마지막 데이터이면 관찰 중지시키기
      if (doubleList.length === 30) {
        observer.unobserve(lastIntersectingData.current);
      }
    }
    return () => observer && observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lastIntersectingData,
    list,
    dogList,
    catList,
    foodList,
    snackList,
    clothesList,
    beautyList,
    toyList,
    etcList,
    doubleList,
  ]);

  return (
    <>
      <STsection>
        <STh1>멍냥마켓</STh1>
        <div className='button'>
          <STselect
            name='choice'
            onChange={handleChange}
            defaultValue={option[2].value}
            id='selectElementID'
          >
            {option.map((option) => (
              <option
                className='option'
                key={option.value}
                value={option.value}
                name={option.name}
              >
                {option.name}
              </option>
            ))}
          </STselect>
        </div>
      </STsection>
      <ItemList
        list={list}
        dogList={dogList}
        catList={catList}
        foodList={foodList}
        snackList={snackList}
        clothesList={clothesList}
        beautyList={beautyList}
        toyList={toyList}
        etcList={etcList}
        doubleList={doubleList}
      />
      {((list !== null && list.length !== 0) ||
        (dogList !== null && dogList.length !== 0) ||
        (catList !== null && catList.length !== 0) ||
        (foodList !== null && foodList.length !== 0) ||
        (snackList !== null && snackList.length !== 0) ||
        (clothesList !== null && clothesList.length !== 0) ||
        (beautyList !== null && beautyList.length !== 0) ||
        (toyList !== null && toyList.length !== 0) ||
        (etcList !== null && etcList.length !== 0) ||
        (doubleList !== null && doubleList.length !== 0)) && (
        <div ref={lastIntersectingData}>.</div>
      )}
    </>
  );
};

export default MainContainer;

const STsection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 9rem;
  margin-bottom: 1rem;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    gap: 0.5rem;
  }
`;

const STh1 = styled.h1`
  font-size: 2.4rem;
  margin: 0 2.4rem;
  font-weight: 700;
`;

const STselect = styled.select`
  position: relative;
  width: 8.8rem;
  height: 3.2rem;
  border-radius: 0.6rem;
  text-align: center;
  color: ${({ theme }) => theme.mainColor};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 20rem;
  align-self: center;
  border: 2px solid ${({ theme }) => theme.mainColor};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0 0 2.3rem;
  transition: background-color 0.2s ease-in;

  .option {
    margin-right: 1rem;
  }
`;
