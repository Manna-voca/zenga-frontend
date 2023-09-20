/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { color } from "../styles/color";
import { typography } from "../styles/typography";
import axios from "axios";
import styled from "@emotion/styled";
import kakaoIcon from "../assets/icons/ic-kakao.svg";
import { get } from "../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";

const Login = () => {
  const navigate = useNavigate();
  let KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  return (
    <>
      <div style={{ height: '26px' }}></div>
      <Swiper
        className="login"
        style={{ width: '100%' }}
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        modules={[Pagination, Mousewheel, Keyboard]}
        allowTouchMove
      >
        <SwiperSlide>
          <div
            style={{ margin: '0 63px 0 62px', justifyContent: 'center',
                    alignItems: 'center', display: 'flex', flexDirection: 'column'
          }}>
            <SwiperText>
              <div>
                <span style={{ fontWeight: '700' }}>서로에게 칭찬</span>
                하며<br></br>돈독함을 쌓아요
              </div>
            </SwiperText>
            <div style={{ height: '49px' }}></div>
            <div 
              style={{ backgroundImage: 'url(https://image.zenga.club/wt1.png)',
                      height: '438px', backgroundSize: 'cover', width: '250px'
            }}></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{ margin: '0 63px 0 62px', justifyContent: 'center',
                    alignItems: 'center', display: 'flex', flexDirection: 'column'
          }}>
            <SwiperText>
              <div>
                모임에 참여하고&nbsp;
                <span style={{ fontWeight: '700' }}>우리만의<br></br>카드</span>
                를 만들어요
              </div>
            </SwiperText>
            <div style={{ height: '27px' }}></div>
            <div 
              style={{ backgroundImage: 'url(https://image.zenga.club/wt2.png)',
                      height: '460px', backgroundSize: 'cover', width: '250px'
            }}></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{ margin: '0 63px 0 62px', justifyContent: 'center',
                    alignItems: 'center', display: 'flex', flexDirection: 'column'
          }}>
            <SwiperText>
              <div>
                칭찬 블록을 모아<br></br>
                <span style={{ fontWeight: '700' }}>나만의 젠가</span>
                를 완성해요
              </div>
            </SwiperText>
            <div style={{ height: '24px' }}></div>
            <div 
              style={{ backgroundImage: 'url(https://image.zenga.club/wt3.png)',
                      height: '463px', backgroundSize: 'cover', width: '250px'
            }}></div>
          </div>
        </SwiperSlide>
      </Swiper>

      <KaKaoLogin href={KAKAO_URL}>
        <img src={kakaoIcon} alt="" />
        카카오 로그인
      </KaKaoLogin>


      <div style={{ height: '100px' }}></div>
      <button css={buttonStyles} onClick={() => navigate("/onboarding")}>
        서비스 온보딩
      </button>
      <button css={buttonStyles} onClick={() => {navigate("/channel-home"); localStorage.setItem("accessToken", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQ4ODA1MzEsImV4cCI6MTY5ODQ4MDUzMSwic3ViIjoiMTIiLCJUT0tFTl9UWVBFIjoiQUNDRVNTX1RPS0VOIn0.fOl04U_nQu2ORmSJTfa9oldRJ1PPq2l4VGzYj8mnxAo");}}>
        채널 홈으로(현섭)
      </button>
      <button css={buttonStyles} onClick={() => {navigate("/channel-home"); localStorage.setItem("accessToken", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTM0OTI4MDMsImV4cCI6MTg5MzUyODgwMywic3ViIjoiMSIsIlRPS0VOX1RZUEUiOiJBQ0NFU1NfVE9LRU4ifQ.5-E7dQeUqr91r2mIRJGOO2latbYbK-MbUuiYRC0rvP0");}}>
        채널 홈으로(승민)
      </button>
    </>
  );
};

export default Login;

const buttonStyles = css`
  font-family: Pretendard;
  font-size: 20px;
  width: 100%;
  color: ${color.onSecondaryActive};
  background-color: ${color.primary500};
  padding: 20px;
  border: none;
  display: block;
  margin-top: 40px;
  border-radius: 10px;
`;

const KaKaoLogin = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  background-color: rgba(254, 229, 0, 1);
  margin: 0 auto 0;
  padding: 0;
  border: none;
  width: calc(100% - 47px);
  min-width: 300px;
  max-width: 455px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
`;

const SwiperText = styled.div`
  color: var(--light-text-text-active, #0D0D0D);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  lien-height: 150%;
  width: 224px;
  height: 42px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;
