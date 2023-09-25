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
import Popup1 from "../components/Popup1";


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

    const [popupState, setPopupState] = useState<boolean>(false);

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

    const handleDownloadImgClick = async () => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const image = new Image();
        image.src = albumList[initialNum].imageUrl + "?timestamp=" + (new Date().getTime());
        //image.crossOrigin = 'Anonymous';

        try{
            image.onload = () => {
                const canvasWidth = window.innerWidth - 40 > 460 ? 460 * 2 : (window.innerWidth - 40) * 2;
                const canvasHeight = 535 * 2;
    
                // 이미지 그리기
                const aspectRatio = canvasWidth / canvasHeight;
                let drawWidth = image.width;
                let drawHeight = image.height;
                let offsetX = 0;
                let offsetY = 0;
    
                if(image.width / image.height > aspectRatio){
                    drawWidth = drawHeight * aspectRatio;
                    offsetX = (image.width - drawWidth) / 2;
                }
                else{
                    drawHeight = drawWidth / aspectRatio;
                    offsetY = (image.height - drawHeight) / 2;
                }
    
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                
                // 이미지를 그릴 때 border-radius를 적용하여 원 모양으로 자릅니다.
                const borderRadius = 20;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(borderRadius, 0);
                ctx.lineTo(canvasWidth - borderRadius, 0);
                ctx.quadraticCurveTo(canvasWidth, 0, canvasWidth, borderRadius);
                ctx.lineTo(canvasWidth, canvasHeight - borderRadius);
                ctx.quadraticCurveTo(canvasWidth, canvasHeight, canvasWidth - borderRadius, canvasHeight);
                ctx.lineTo(borderRadius, canvasHeight);
                ctx.quadraticCurveTo(0, canvasHeight, 0, canvasHeight - borderRadius);
                ctx.lineTo(0, borderRadius);
                ctx.quadraticCurveTo(0, 0, borderRadius, 0);
                ctx.closePath();
                ctx.clip();    
                
                ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight, 0, 0, canvasWidth, canvasHeight);
    
                // 텍스트 스타일 설정
                ctx.font = '28px normal Pretendard';
                ctx.fillStyle = '#FCFCFC';
    
                // 텍스트 추가
                const createdAt = dayjs(albumList[initialNum].albumCreatedDate);
                const formattedCreatedAt = createdAt.format('YYYY.MM.DD');
                ctx.fillText(formattedCreatedAt, 40, 68);
    
                ctx.restore(); // clip 상태를 해제하여 다음 그림을 영향받지 않게 합니다.
    
                // 캔버스의 이미지 데이터를 가져옴
                const imageDataUrl = canvas.toDataURL('image/png');
    
                // a 태그 이용해서 이미지 다운로드
                var link = document.createElement('a');
                link.href = imageDataUrl;
                link.download = `zenga_${dayjs().format('YYMMDDHHmmss')}`;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setPopupState(true);
            }
        } catch(err) {
            alert('현재 브라우저에서는 이미지 다운로드가 불가능하여 다른 브라우저에서 이용해 주시길 바랍니다');
        }
    };


    const [albumList, setAlbumList] = useState<Array<any>>([]);

    const getAlbumInfo = async () => {
        await axios.get(`${SERVER_URL}/album/list?memberId=${memberId}`, CONFIG).then((res) => {
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
                        onSlideChange={(e) => {setInitialNum(e.activeIndex); window.history.replaceState({}, '', `${window.location.origin}${window.location.pathname}?who=${who}&index=${e.activeIndex}`); }}
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
                    {popupState && (
                        <Popup1
                            title="저장 완료"
                            text={"카드에 있는 텍스트는 제외하고\n모임 날짜만 함께 저장했어요"}
                            btnText="확인"
                            func={() => setPopupState(false)}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default Album;