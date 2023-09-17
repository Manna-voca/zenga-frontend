import React, { useState, useEffect } from "react";
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
import testImg from '../images/jun.png';
import Card from "../components/Card";
import axios from "axios";


interface cardProps{
    date: string;
    title: string;
    text: string;
    image: string | ArrayBuffer | null | undefined;
}


const Album = () => {
    const location = useLocation();
    const who = location.state.who;
    const { channelCode, memberId } = useParams();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };


    const [initialNum, setInitialNum] = useState<number>(location.state.initialNum);

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
                    <MeetupMember></MeetupMember>
                </>
            ) : (
                <>
                    <Header type="card" download={who === "my" ? undefined : false} func={handleParticipantImgClick}></Header>
                    <div style={{ height: '20px' }}></div>
                    <Swiper
                        className="album"
                        style={{ width: '100%', height: '600px' }}
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
                        onSlideChange={(e) => setInitialNum(e.activeIndex)}
                    >
                        {albumList.map((item, index) => {
                            return (
                                <SwiperSlide style={{ width: 'calc(100% - 40px)' }}>
                                    <Card
                                        key={index}
                                        date={item.date}
                                        title={item.title}
                                        text={item.text}
                                        image={item.image}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </>
            )}
        </>
    )
}

export default Album;