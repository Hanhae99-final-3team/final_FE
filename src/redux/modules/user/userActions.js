import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apis } from '../../../shared/axios';

const URL = {
  BASE: process.env.REACT_APP_BASE_URL,
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (payload, { getState, rejectWithValue }) => {
    console.log(payload);
    const { user } = getState();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        `https://fabius-bk.shop/members/login`,
        payload,
        config
      );
      localStorage.setItem('access-token', response.headers.authorization);
      localStorage.setItem('refresh-token', response.headers.refreshtoken);
      console.log(response);
      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        `https://fabius-bk.shop/members/signup`,
        payload,
        config
      );
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// 유저 로그아웃
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (arg, { getState, rejectWithValue, fulfillWithValue }) => {
    const { user } = getState();
    try {
      const response = await apis.logout();
      return fulfillWithValue(response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// 백엔드로 인가코드 보내기
export const kakaoLogin = createAsyncThunk(
  "user/kakaoLogin",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fabius-bk.shop/members/kakao/callback?code=${payload}`
      );
      const ACCESS_TOKEN = response.headers.authorization;
      localStorage.setItem("access-token", ACCESS_TOKEN);
      localStorage.setItem("refresh-token", response.headers.refreshtoken);
      return fulfillWithValue(response);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const existMemberId = createAsyncThunk(
  'user/existMemberId',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        `https://fabius-bk.shop/members/email-check`,
        payload,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const existMemberNickname = createAsyncThunk(
  'user/existMemberNickname',
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        `https://fabius-bk.shop/members/nickname-check`,
        payload,
        config
      );
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
