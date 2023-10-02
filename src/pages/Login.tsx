import styled from "@emotion/styled";
import kakaoIcon from "../assets/icons/ic-kakao.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";

const Login = () => {
  let KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  return (
    <>
      <div style={{ height: "26px" }}></div>
      <Swiper
        className="login"
        style={{ width: "100%", height: "590px" }}
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        modules={[Pagination, Mousewheel, Keyboard]}
        allowTouchMove
      >
        <SwiperSlide>
          <SliderWrapper>
            <SwiperText>
              <b>서로에게 칭찬</b>
              하며
              <br />
              돈독함을 쌓아요
            </SwiperText>
            <img
              src="https://image.zenga.club/wt1.png"
              alt=""
              style={{
                height: "437px",
                width: "250px",
              }}
            />
          </SliderWrapper>
        </SwiperSlide>

        <SwiperSlide>
          <SliderWrapper>
            <SwiperText>
              모임에 참여하고&nbsp;
              <b>
                <br />
                우리만의 카드
              </b>
              를 만들어요
            </SwiperText>
            <img
              src="https://image.zenga.club/wt2.png"
              alt=""
              style={{
                height: "466px",
                width: "250px",
              }}
              loading="lazy"
            />
          </SliderWrapper>
        </SwiperSlide>

        <SwiperSlide>
          <SliderWrapper>
            <SwiperText>
              칭찬 블록을 모아
              <br />
              <b>나만의 젠가</b>를 완성해요
            </SwiperText>
            <img
              src="https://image.zenga.club/wt3.png"
              alt=""
              style={{
                height: "469px",
                width: "250px",
              }}
              loading="lazy"
            />
          </SliderWrapper>
        </SwiperSlide>
      </Swiper>

      <KaKaoLogin href={KAKAO_URL}>
        <img width="20px" height="20px" src={kakaoIcon} alt="" />
        카카오 로그인
      </KaKaoLogin>
    </>
  );
};

export default Login;

const SliderWrapper = styled.div`
  height: 528px;
  margin: 0 63px 0 62px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const SwiperText = styled.div`
  color: var(--light-text-text-active, #0d0d0d);
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  width: 224px;
  height: 42px;
  text-align: center;
  b {
    font-weight: 700;
  }
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
