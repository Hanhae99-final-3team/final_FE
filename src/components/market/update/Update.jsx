import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  __updatePost,
  __getSinglePost,
} from "../../../redux/modules/market/postSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ImgSlider from "../../elements/GlobalImgSlider";
import axios from "axios";
import { IoIosLocate } from "react-icons/io";
import InputResetButton from "../../elements/buttons/InputResetButton";
import FixButton from "../../elements/buttons/FixButton";
import Select from "../../elements/GlobalSelect";
import PetOption from "../options/PetOption";
import ItemOption from "../options/ItemOption";

function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const items = useSelector((state) => state.marketPost.singlePost);
  const [petCategory, setPetCategory] = useState(state.petCategory);
  const [itemCategory, setItemCategory] = useState(state.itemCategory);
  const [item, setItem] = useState(items);
  useEffect(() => {
    setItem(items);
  }, [setItem, items]);

  useEffect(() => {
    setValue("title", state.title);
    setValue("content", state.content);
    setValue("location", state.location);
    setValue("purchasePrice", state.purchasePrice);
    setValue("sellingPrice", state.sellingPrice);
  }, []);

  useEffect(() => {
    dispatch(__getSinglePost({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    setPetCategory(petCategory);
    setItemCategory(itemCategory);
  }, [setPetCategory, setItemCategory, petCategory, itemCategory]);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onUpdateHandler = (formData, e) => {
    const files = formData.files;
    const data = {
      title: formData.title,
      content: formData.content,
      location: formData.location,
      purchasePrice: formData.purchasePrice,
      sellingPrice: formData.sellingPrice,
    };
    dispatch(__updatePost({ id, data, itemCategory, petCategory, files }));
    navigate(`/market/detail/${id}`, { items });
  };

  //다중 이미지 preview
  const [isLoading, setIsLoading] = useState(true);
  const [itemImgs, setItemImgs] = useState([]);

  const changeImg = async (e) => {
    setIsLoading(true);

    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    setItemImgs([...urlList]);
    if (files.length !== 0) {
      setIsLoading(false);
    }
  };

  const URI = {
    KAKAO_REST_API: process.env.REACT_APP_KAKAO_REST_API,
  };

  //현재 위치 api
  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude; //위도
          const lon = position.coords.longitude; //경도
          //kakao REST API에 get 요청을 보낸다.
          //파라미터 x,y에 lon,lat을 넣어주고 API_KEY를 Authorization헤더에 넣어준다.
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
              {
                headers: {
                  Authorization: `KakaoAK ${URI.KAKAO_REST_API}`,
                },
              }
            )
            .then((res) => {
              setValue(
                "location",
                res.data.documents[0].address.region_1depth_name +
                  " " +
                  res.data.documents[0].address.region_2depth_name
              );
            })
            .catch((e) => console.log(e));
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  getLocation(); //호출

  const inputResetHandler = (inputId) => {
    setValue(inputId, " ");
  };

  const inputOnlyNumHandler = (value, inputId) => {
    // const onlyNumber = value.replace(/[^0-9]/g, "");
    return setValue(inputId, value);
  };

  return (
    <>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onUpdateHandler)}>
          <TitleWrapper>
            <Title>게시글 수정</Title>
          </TitleWrapper>
          <Container>
            <SelectWrapper>
              <Select
                optionDatas={PetOption}
                color={"gray"}
                width={"36%"}
                height={"3.1rem"}
                optionsWidth={"115%"}
                setSelected={setPetCategory}
                initialValue={petCategory}
              />
              <Select
                optionDatas={ItemOption}
                color={"gray"}
                width={"60%"}
                height={"3.1rem"}
                optionsWidth={"108.5%"}
                setSelected={setItemCategory}
                initialValue={itemCategory}
              />
            </SelectWrapper>

            <Label>제목</Label>

            <InputWrapper>
              <Input type="text" name="title" required {...register("title")} />
              <InputResetButton onClick={() => inputResetHandler("title")} />
            </InputWrapper>

            <Label>구매 가격</Label>

            <InputWrapper>
              <Input
                type="number"
                name="purchasePrice"
                required
                {...register("purchasePrice", {
                  validate: (value) => {
                    inputOnlyNumHandler(value, "purchasePrice");
                  },
                })}
                onWheel={(e) => e.target.blur()}
              />
              <InputResetButton
                onClick={() => inputResetHandler("purchasePrice")}
              />
              <HelperText>
                구매했을 당시 해당 물품의 가격을 적어주세요.
              </HelperText>
            </InputWrapper>
            <Label>판매 가격</Label>

            <InputWrapper>
              <Input
                type="number"
                name="sellingPrice"
                required
                {...register("sellingPrice", {
                  validate: (value) => {
                    inputOnlyNumHandler(value, "sellingPrice");
                  },
                })}
                onWheel={(e) => e.target.blur()}
              />
              <InputResetButton
                onClick={() => inputResetHandler("sellingPrice")}
              />
              <HelperText>물품을 판매할 가격을 적어주세요.</HelperText>
            </InputWrapper>
            <Label>내용</Label>

            <TextArea
              type="textarea"
              textAlign="top"
              placeholder={"제품에 대한 설명을 입력해 주세요."}
              name="content"
              required
              {...register("content")}
            />

            {/* location */}
            <Label>위치</Label>
            <LocationWrapper>
              <IoIosLocate />
              <LocationInput {...register("location")} readOnly></LocationInput>
            </LocationWrapper>

            <Input
              {...register("files")}
              id="files"
              accept="image/*"
              placeholder="이미지 파일"
              type="file"
              multiple
              onChange={changeImg}
              // style={{ display: "none" }}
            />
            <ImgWrapper>
              {!isLoading && <ImgSlider imgUrls={itemImgs} />}
              {isLoading && <ImgSlider imgUrls={state.itemImgs} />}
            </ImgWrapper>
            <FixButton content={"게시글 수정하기"} />
          </Container>
        </Form>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div`
  padding-top: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-collapse: collapse;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20rem;
  margin-left: 11.5rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 50rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 50rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 36rem;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1.6rem 0 4rem 0;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 6rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 6rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 4rem;
  }
`;

const Title = styled.h1`
  text-align: left;
  @media (min-width: 1280px) {
    /* Desktop */
    font-size: 3.6rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 3.6rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 2.4rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
  margin: 0.5rem 0rem;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.darkgray};
`;

const InputWrapper = styled.div`
  margin-bottom: 4.7rem;
  position: relative;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 0;
  position: relative;
  display: inline-block;
  width: 28.7rem;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.4rem;
  background-color: #fff;
  border: 2px solid #d9d9d9;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 2px;
  transition: all 0.3s;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.mainColor};
    outline: none;
  }
  &[type="file"] {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    color: ${({ theme }) => theme.darkgray};
  }
  &[type="file"]::file-selector-button {
    margin-left: -10px;
    width: fit-content;
    font-size: small;
    text-align: center;
    padding: 10px 15px;
    border-radius: 20px;
    cursor: pointer;
    color: #ffffff;
    border-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.mainColor};
  }
  &[type="file"]::file-selector-button:hover {
    background-color: #dadae1;
  }
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (min-width: 1280px) {
    /* Desktop */
    width: 38rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 38rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 25rem;
  }
`;

const HelperText = styled.p`
  margin-top: 0.3rem;
  font-size: 1.2rem;
  color: #cbcbcb;
`;

const SelectWrapper = styled.div`
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  @media (min-width: 1280px) {
    /* Desktop */
    width: 38rem;
    margin-bottom: 5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 38rem;
    margin-bottom: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 25rem;
    margin-bottom: 3.5rem;
  }
`;

const TextArea = styled.textarea`
  width: 32.8rem;
  height: 20rem;
  border: 2px solid #d5d0d0;
  background-color: ${({ theme }) => theme.whiteColor};
  margin: 15px 0px;
  border-radius: 4px;
  resize: none;
  font-size: 1.4rem;
  padding: 10px;
  text-indent: 5px;
  margin-bottom: 4.7rem;
  &:hover {
    border-color: ${({ theme }) => theme.mainColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.mainColor};
    outline: none;
  }
  &::placeholder {
    color: #eae0e0;
  }

  @media (min-width: 1280px) {
    /* Desktop */
    width: 38rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    width: 38rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    width: 25rem;
  }
`;

const LocationInput = styled.input`
  box-sizing: border-box;
  margin-bottom: 4.7rem;
  padding: 0;
  position: relative;
  display: inline-block;
  width: 10rem;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.4rem;
  color: #ffffff;
  border: 1px solid #d9d9d9;
  /* border-radius: 4px; */
  border: none;
  background-color: transparent;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 16rem;
  margin-top: 5rem;
`;

const LocationWrapper = styled.div`
  font-size: 1.4rem;
  height: 2.8rem;
  margin: 0.8rem 0 4rem 0;
  color: white;
  padding: 0.1rem 0.5rem;
  margin-bottom: 4.7rem;
  background-color: ${({ theme }) => theme.darkgray};
`;

export default Update;
