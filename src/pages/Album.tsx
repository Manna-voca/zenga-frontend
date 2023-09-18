import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow';
import "../styles/albumSwiper.css";
import Header from "../components/Header";
import MeetupMember from "./MeetupMember";
import Card from "../components/Card";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';


const Album = () => {
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const who = searchParams.get('who');
    const index = searchParams.get('index');
    const { channelCode, memberId } = useParams();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [initialNum, setInitialNum] = useState<number>(Number(index));

    const [memberState, setMemberState] = useState<boolean>(false);

    const [preventPopState, setPreventPopstate] = useState<boolean>(false);

    useEffect(() => {
        if(preventPopState){
            window.history.pushState(null, "", "");
            window.onpopstate = () => {
                setMemberState(false);
                setPreventPopstate(!preventPopState);
            };
        }
    }, [preventPopState]);

    const handleParticipantImgClick = () => {
        setPreventPopstate(true);
        setMemberState(true);
    };

    const handleDownloadImgClick = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const image = new Image();
        image.src = albumList[initialNum].imageUrl;
        image.crossOrigin = 'Anonymous';

        image.onload = () => {
            const canvasWidth = window.innerWidth - 40 > 460 ? 460 : window.innerWidth - 40;
            const canvasHeight = 535;

            // 이미지 그리기
            const aspectRatio = image.width / image.height;
            let drawWidth = canvasWidth;
            let drawHeight = canvasHeight;
            let offsetX = 0;
            let offsetY = 0;

            if(aspectRatio > canvasWidth / canvasHeight){
                drawHeight = canvasWidth / aspectRatio;
                offsetY = (canvasHeight - drawHeight) / 2;
            }
            else{
                drawWidth = canvasHeight * aspectRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
            }

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.drawImage(image, 0, 0, image.width, image.height, offsetX, offsetY, drawWidth, drawHeight);

            // 텍스트 스타일 설정
            ctx.font = '14px normal 400 Pretendard';
            ctx.fillStyle = '#FCFCFC';

            // 텍스트 추가
            const createdAt = dayjs(albumList[initialNum].albumCreatedDate);
            const formattedCreatedAt = createdAt.format('YYYY.MM.DD');
            ctx.fillText(formattedCreatedAt, 20, 34);

            // 캔버스의 이미지 데이터를 가져옴
            const imageDataUrl = canvas.toDataURL('image/png');

            // a 태그 이용해서 이미지 다운로드
            const a = document.createElement('a');
            a.href = imageDataUrl;
            a.download = 'zengaAlbum.png';
            a.click();
            document.body.removeChild(a);
        }
    };


    const [albumList, setAlbumList] = useState<Array<any>>([]);

    const getAlbumInfo = async () => {
        await axios.get(`${SERVER_URL}/album/list?memberId=${memberId}`, CONFIG).then((res) => {
            console.log(res.data.data);
            setAlbumList(res.data.data.albumList);
        }).catch((err) => console.error(err));
    };

    useEffect(() => {
        getAlbumInfo();
    }, []);

    return(
        <>
            {memberState ? (
                <>
                    <MeetupMember state="album" albumId={`${albumList[initialNum].id}`}></MeetupMember>
                </>
            ) : (
                <>
                    <Header type="card" download={who === "my" ? undefined : false} downloadFunc={handleDownloadImgClick} func={handleParticipantImgClick}></Header>
                    <div style={{ height: '20px' }}></div>
                    <Swiper
                        className="album"
                        style={{ width: '100%', height: '600px', zIndex: '0' }}
                        effect={'coverflow'}
                        pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 4}}
                        mousewheel
                        keyboard
                        coverflowEffect={{
                            rotate: 20,
                            stretch: 0,
                            depth: 30,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow, Pagination, Mousewheel, Keyboard]}
                        allowTouchMove
                        spaceBetween={18}
                        slidesPerView={"auto"}
                        centeredSlides={true}
                        initialSlide={initialNum}
                        observer={true}
                        observeParents={true}
                        onSlideChange={(e) => {setInitialNum(e.activeIndex); window.history.replaceState({}, '', `?who=${who}&index=${e.activeIndex}`); }}
                    >
                        {albumList.map((item, index) => {
                            const createdAt = dayjs(item.albumCreatedDate);
                            const formattedCreatedAt = createdAt.format('YYYY.MM.DD');
                            return (
                                <SwiperSlide style={{ width: 'calc(100% - 40px)', display: 'flex', justifyContent: 'center' }}>
                                    <Card
                                        key={index}
                                        date={formattedCreatedAt}
                                        title={item.title}
                                        text={item.content}
                                        image={item.imageUrl}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </>
            )}
        </>
    )
}

export default Album;