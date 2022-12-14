import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  existMemberId,
  registerUser,
  existMemberNickname,
} from "./../../redux/modules/user/userActions";
import GlobalModal from "./../elements/GlobalModal";
import Button from "../elements/GlobalButton";
import InputResetButton from "../elements/buttons/InputResetButton";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // react-hook-form
  // 실시간 유효성 검사

  //아이디 중복확인 모달
  const [idDuplicate, onIdDuplicate] = useState(false);
  //닉네임 중복확인 모달
  const [nickDuplicate, onNickDuplicate] = useState(false);
  const [isRegister, onIsRegister] = useState(false);

  const idSuccess = useSelector((state) => state.user.idSuccess);
  const nickSuccess = useSelector((state) => state.user.nickSuccess);
  const registerSuccess = useSelector((state) => state.user.registerSuccess);

  const [idDoubleCheck, onIdDoubleCheck] = useState(false);
  const [nickDoubleCheck, onNickDoubleCheck] = useState(false);
  const [SignUpOnClick, onSignUpOnClick] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { isDirty, errors },
  } = useForm({ mode: "onChange", userId: "test" });

  const onSubmit = (event) => {
    if (watch().password !== watch().passwordConfirm) {
      alert("비밀번호를 확인하세요");
      return;
    }

    const body = {
      email: watch().userId,
      nickname: watch().nickname,
      password: watch().password,
      passwordConfirm: watch().passwordConfirm,
    };
    if (idDoubleCheck && nickDoubleCheck) {
      dispatch(registerUser(body));
    }
  };

  const onReset = () => {
    setValue("userId", "");
  };

  function email_check(email) {
    var regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email.trim() != "" && email != "undefined" && regex.test(email);
  }

  function nickname_check(nicknames) {
    return nicknames.trim() != "" && nicknames != "undefined";
  }
  const userId = useWatch({
    control,
    name: "userId",
  });
  const nicknames = useWatch({
    control,
    name: "nickname",
  });
  const onDuplicateUserId = (event) => {
    if (email_check(userId)) {
      dispatch(existMemberId({ email: userId }));
      onIdDuplicate(false);
    } else {
      onIdDuplicate(true);
    }
  };

  const onDuplicateUserNickname = (event) => {
    if (nickname_check(nicknames)) {
      dispatch(existMemberNickname({ nickname: nicknames }));
      onIdDuplicate(false);
    } else {
      onNickDuplicate(true);
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    onSignUpOnClick(SignUpOnClick);
    onNickDuplicate(nickDoubleCheck);
    onIdDuplicate(idDuplicate);
  }, [
    onSignUpOnClick,
    SignUpOnClick,
    onNickDuplicate,
    nickDoubleCheck,
    onIdDuplicate,
    idDuplicate,
  ]);

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    } else {
    }
  }, [registerSuccess, navigate]);

  // useEffect(() => {}, [idSuccess, nickSuccess]);
  return (
    <>
      {!registerSuccess && (
        <GlobalModal
          content1={`아이디 혹은 닉네임 중복확인 바랍니다.`}
          isModal={idDuplicate}
          setIsModal={onIdDuplicate}
        />
      )}
      {idDuplicate && !nickDuplicate && idSuccess && (
        <GlobalModal
          content1={`사용 가능한 아이디 입니다.`}
          isModal={idDuplicate}
          setIsModal={onIdDuplicate}
        />
      )}
      {idDuplicate && !nickDuplicate && !idSuccess && (
        <GlobalModal
          content1={`이미 존재하는 아이디 입니다.`}
          isModal={idDuplicate}
          setIsModal={onIdDuplicate}
        />
      )}
      {!idDuplicate && nickDuplicate && nickSuccess && (
        <GlobalModal
          content1={`사용 가능한 닉네임 입니다.`}
          isModal={nickDuplicate}
          setIsModal={onNickDuplicate}
        />
      )}
      {!idDuplicate && nickDuplicate && !nickSuccess && (
        <GlobalModal
          content1={`이미 존재하는 닉네임 입니다.`}
          isModal={nickDuplicate}
          setIsModal={onNickDuplicate}
        />
      )}
      <FormWrapper>
        <Form
          className="signup-form"
          onSubmit={handleSubmit(onSubmit, onError, onDuplicateUserId)}
        >
          <TitleWrapper>
            <Title>회원가입</Title>
          </TitleWrapper>
          <Container>
            <Label> 아이디</Label>
            <InputWrapper>
              <Input
                type="text"
                tabIndex="2"
                className="input"
                onChange={() => onIdDuplicate(false)}
                {...register("userId", {
                  required: "아이디는 이메일 형식으로 적어주세요.",
                  pattern: {
                    value: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/,
                    message: "아이디는 이메일 형식으로 적어주세요.",
                  },
                })}
                aria-invalid={
                  !isDirty ? undefined : errors.userId ? "true" : "false"
                }
                name="userId"
              />
              {watch().userId === "" ? null : (
                <InputResetButton className="input-reset" onClick={onReset} />
              )}
              <ButtonWrapper>
                <Button
                  content={"중복체크"}
                  className="nickcheck-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onDuplicateUserId();
                    onIdDuplicate((prev) => !prev);
                    onIdDoubleCheck(true);
                  }}
                  mobileWidth={"4.5rem"}
                  width={"5rem"}
                  height={"2.3rem"}
                  color={"gray"}
                  fontSize={"0.8rem"}
                  padding={"0.1rem"}
                ></Button>
              </ButtonWrapper>
              {errors.userId && (
                <HelperText2>{errors?.userId?.message}</HelperText2>
              )}
              {!errors.userId && (
                <HelperText>아이디는 이메일 형식으로 적어주세요.</HelperText>
              )}
            </InputWrapper>

            <Label>비밀번호</Label>
            <InputWrapper>
              <Input
                type="password"
                tabIndex="2"
                className="input"
                {...register("password", {
                  required: "비밀번호는 숫자, 문자 조합 6자 이상 적어주세요.",
                  pattern: {
                    value: /^[A-Za-z0-9]{6,12}$/,
                    message: "비밀번호는 숫자, 문자 조합 6자 이상 적어주세요.",
                  },
                })}
                aria-invalid={
                  !isDirty ? undefined : errors.password ? "true" : "false"
                }
                name="password"
              />
              {errors.password && (
                <HelperText2>{errors?.password?.message}</HelperText2>
              )}

              {!errors.password && (
                <HelperText>
                  {"비밀번호는 숫자, 문자 조합 6자 이상 적어주세요."}
                </HelperText>
              )}
            </InputWrapper>

            <Label>비밀번호 확인</Label>
            <InputWrapper>
              <Input
                type="password"
                className="input"
                tabIndex="2"
                {...register("passwordConfirm", {
                  required: "비밀번호는 숫자, 문자 조합 6자 이상 적어주세요.",
                  pattern: {
                    value: /^[A-Za-z0-9]{6,12}$/,
                    message: "비밀번호는 숫자, 문자 조합 6자 이상 적어주세요.",
                  },
                })}
                aria-invalid={
                  !isDirty
                    ? undefined
                    : errors.passwordConfirm
                    ? "true"
                    : "false"
                }
                name="passwordConfirm"
              />
              {errors.passwordConfirm && (
                <HelperText2>{errors?.passwordConfirm?.message}</HelperText2>
              )}
              {!errors.passwordConfirm && (
                <HelperText>
                  {"비밀번호는 숫자, 문자 조합 6자 이상 적어주세요."}
                </HelperText>
              )}
            </InputWrapper>

            <Label>닉네임</Label>
            <InputWrapper>
              <Input
                type="text"
                className="input"
                tabIndex="2"
                onChange={() => onNickDuplicate(false)}
                {...register("nickname", {
                  required: "멍냥마켓에서 사용할 닉네임을 적어주세요.",
                })}
                aria-invalid={
                  !isDirty ? undefined : errors.nickName ? "true" : "false"
                }
                name="nickname"
              />
              <ButtonWrapper>
                <Button
                  content={"중복체크"}
                  className="nickcheck-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onDuplicateUserNickname();
                    onNickDuplicate((prev) => !prev);
                    onNickDoubleCheck(true);
                  }}
                  mobileWidth={"4.5rem"}
                  width={"5rem"}
                  height={"2.3rem"}
                  color={"gray"}
                  fontSize={"0.8rem"}
                  padding={"0.1rem"}
                ></Button>
              </ButtonWrapper>
              {errors.nickname && (
                <HelperText2>{errors?.nickname?.message}</HelperText2>
              )}
              {!errors.nickname && (
                <HelperText>
                  {"멍냥마켓에서 사용할 닉네임을 적어주세요."}
                </HelperText>
              )}
            </InputWrapper>
          </Container>
          <ButtonsWrapper>
            <Button
              content={"가입하기"}
              mobileWidth={"25rem"}
              width={"38rem"}
              fontSize={"1.3rem"}
              fontWeight={"900"}
            />
          </ButtonsWrapper>
        </Form>
      </FormWrapper>
    </>
  );
};
export default SignupForm;

const FormWrapper = styled.div`
  padding-top: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  margin: 1.6rem 0 3rem 0;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 5rem;
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
    font-size: 2.4rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    font-size: 2.4rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    font-size: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: max-content;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 5.5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 4rem;
  }
`;

const Label = styled.label`
  font-weight: 900;
  font-size: 1.4rem;
  margin: 0.5rem 0rem;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: ${({ theme }) => theme.darkgray};
`;

const InputWrapper = styled.div`
  position: relative;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 2rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 1.8rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 1.6rem;
  }
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
  border: 2px solid ${({ theme }) => theme.darkgray};
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 2px;
  transition: all 0.3s;
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
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
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
  font-size: 1rem;
  color: #cbcbcb;
`;

const HelperText2 = styled.p`
  margin-top: 0.3rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.mainColor};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  @media (min-width: 1280px) {
    /* Desktop */
    margin-bottom: 5rem;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    /* Tablet */
    margin-bottom: 5rem;
  }
  @media (max-width: 767px) {
    /* Mobile */
    margin-bottom: 13rem;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
`;
