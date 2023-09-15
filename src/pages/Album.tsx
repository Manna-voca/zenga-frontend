import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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


interface cardProps{
    date: string;
    title: string;
    text: string;
    image: string | ArrayBuffer | null | undefined;
}


const Album = () => {
    const location = useLocation();
    const who = location.state.who;
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

    const cardDummy: Array<cardProps> = [
        {date: "2023.02.26",
        title: "1맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "2맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "3맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "4맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "5맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "6맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "7맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "8맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "9맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "10맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
        {date: "2023.02.26",
        title: "11맞짱 뜰 사람~!",
        text: "일이삼사오육칠팔구십일이삼사오육1111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaa11111111111111111111111111111111111칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
        image: testImg
        },
    ];

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
                        {cardDummy.map((item, index) => {
                            return (
                                <SwiperSlide style={{ width: 'calc(100% - 40px)' }}>
                                    <Card
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