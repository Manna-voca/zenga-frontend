import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { ReactComponent as CameraImg } from "../images/camera.svg";
import ButtonBasic from "../components/ButtonBasic";
import MeetupMember from "./MeetupMember";
import Card from "../components/Card";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

const CreateCard = () => {
    const navigate = useNavigate();
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
    const now = dayjs();
    const { channelCode, meetupId } = useParams();
    const CHANNEL_ID = localStorage.getItem("channelId");
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [cardState, setCardState] = useState<boolean>(false);
    const [memberState, setMemberState] = useState<boolean>(false);
    const [meetupData, setMeetupData] = useState<any>();

    const handleCardMakingBtnClick = async () => {
        if(cardImageFile !== null){
            const cardImgFormData = new FormData();
            cardImgFormData.append('image', cardImageFile);
            const uploadCardImgResponse = await axios.post(`${SERVER_URL}/image/upload`, cardImgFormData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(uploadCardImgResponse.status === 200){
                setCardImage(uploadCardImgResponse.data.data.url);
                axios.patch(`${SERVER_URL}/party/finish`, {
                    "channelId": CHANNEL_ID,
                    "partyId": meetupId,
                    "partyCardImageUrl": uploadCardImgResponse.data.data.url
                }, CONFIG).then((res) => {
                    console.log(res.data.data);
                    setMeetupData(res.data.data);
                    setCardState(true);
                })
            }
        }
    };

    const handleParticipantImgClick = () => {
        setPreventPopstate(true);
        setMemberState(true);
    };

    const handleConfirmBtnClick = () => {
        // 앞으로 가기 기록 안 남기기(아직 해결 못함)
        navigate(-1);
    };

    const [cardImage, setCardImage] = useState<string | ArrayBuffer | null>();
    const [cardImageFile, setCardImageFile] = useState<File | null>(null);

    const handleCardImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if(files.length > 0){
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                const uploadImg = new Image();
                if(typeof(reader.result) === "string"){
                    uploadImg.src = reader.result;
                    uploadImg.onload = () => {
                        const canvas = canvasRef.current;
                        if(canvas !== null){
                            const context = canvas.getContext('2d');
                            if((uploadImg.width / uploadImg.height) > 1.3){
                                canvas.width = uploadImg.height;
                                canvas.height = uploadImg.width;
                                context?.rotate(Math.PI / 2);
                                context?.drawImage(uploadImg, 0, (uploadImg.height * -1));
                            }
                            else{
                                canvas.width = uploadImg.width;
                                canvas.height = uploadImg.height;
                                context?.drawImage(uploadImg, 0, 0);
                            }
                            setCardImage(canvas.toDataURL("image/jpeg"));
                            setCardImageFile(convertBase64IngoFile(canvas.toDataURL("image/jpeg"), "1.jpeg"));
                        }
                    }
                }
            };
        }
        event.target.value = "";
    };


    function convertBase64IngoFile(image: any, fileName: any){
        const mimeType = image?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
        const realData = image.split(',')[1];
        const blob = b64toBlob(realData, mimeType);
        if(blob !== undefined){
            const raw = new File([blob], fileName, { type: mimeType });
            return raw;
        }
        return cardImageFile;
    }

    function b64toBlob(b64Data: any, contentType = '', sliceSize = 512){
        if (b64Data === '' || b64Data === undefined) return;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const handleDownloadImgClick = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const image = new Image();

        if(typeof(cardImage) !== 'string') return;
        image.src = cardImage + "?timestamp=" + (new Date().getTime());;
        image.crossOrigin = 'Anonymous';

        image.onload = () => {
            const canvasWidth = window.innerWidth - 40 > 460 ? 460 : window.innerWidth - 40;
            const canvasHeight = 535;

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
            const borderRadius = 10;
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
            ctx.font = '14px normal Pretendard';
            ctx.fillStyle = '#FCFCFC';

            // 텍스트 추가
            ctx.fillText(now.format('YYYY.MM.DD'), 20, 34);

            ctx.restore(); // clip 상태를 해제하여 다음 그림을 영향받지 않게 합니다.


            // 캔버스의 이미지 데이터를 가져옴
            const imageDataUrl = canvas.toDataURL('image/png');

            // a 태그 이용해서 이미지 다운로드
            const a = document.createElement('a');
            a.href = imageDataUrl;
            a.download = 'zengaAlbum.png';
            
            // 다운로드를 시도합니다.
            if (document.createEvent) {
                const event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                a.dispatchEvent(event);
            } else {
                a.click();
            }
        }
    };


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

    return(
        <>
            {memberState ? (
                <>
                    <MeetupMember></MeetupMember>
                </>
            ) : (
                <>
                    <Header type={cardState ? "card" : "back"} text="카드 만들기" downloadFunc={handleDownloadImgClick} func={handleParticipantImgClick}></Header>
                    <div style={{ height: '20px' }}></div>
                    <div style={{ margin: '0 20px 0 20px' }}>
                        {cardState ? (
                            <>
                                <Card
                                    date={now.format('YYYY.MM.DD')}
                                    title={meetupData.title}
                                    text={meetupData.content}
                                    image={cardImage}
                                />
                                <div style={{ height: '39px' }}></div>
                                <ButtonBasic
                                    innerText="확인"
                                    onClick={handleConfirmBtnClick}
                                    disable={false}
                                ></ButtonBasic>
                            </>
                        ) : (
                            <>
                                <div
                                    style={{ height: '535px', width: '100%',
                                            borderRadius: '10px',
                                            background: 'var(--surface-surface, #FAFAFA)',
                                            display: 'flex', justifyContent: 'center',
                                            alignItems: 'center'
                                }}>
                                    <label
                                        htmlFor="ex_file"
                                        style={{ width: '100%', height: '100%',
                                                display: 'flex', justifyContent: 'center',
                                                alignItems: 'center', cursor: 'pointer'
                                    }}>
                                        {cardImage ? (
                                            <div
                                                style={{ backgroundImage: `url(${cardImage})`, height: '100%',
                                                        width: '100%', borderRadius: '10px',
                                                        backgroundPosition: '50% 50%', backgroundSize: 'cover'
                                            }}></div>
                                        ) : (
                                            <div
                                                style={{ 
                                                        display: 'flex', flexDirection: 'column',
                                                        gap: '20px', alignItems: 'center'
                                            }}>
                                                <CameraImg width={52} height={52}/>
                                                <div
                                                    style={{ display: 'flex', flexDirection: 'column',
                                                            gap: '4px', alignItems: 'center',
                                                            color: 'var(--on-surface-muted, rgba(10, 10, 10, 0.45))',
                                                }}>
                                                    <div
                                                        style={{ textAlign: 'center', fontSize: '21px',
                                                                fontStyle: 'normal', fontWeight: '600',
                                                                lineHeight: '150%'
                                                    }}>
                                                        모임 사진 업로드
                                                    </div>
                                                    <div
                                                        style={{ textAlign: 'center', fontSize: '14px',
                                                                fontStyle: 'normal', fontWeight: '400',
                                                                lineHeight: '150%'
                                                    }}>
                                                        모임 카드를 만든 이후에는<br></br>사진을 변경할 수 없어요
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <input
                                            style={{ width: '0', height: '0', position: 'absolute', padding: '0', margin: '-1', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0' }}
                                            type="file"
                                            id='ex_file'
                                            name="cardImage"
                                            accept="image/*"
                                            onChange={handleCardImageUpload}
                                        />
                                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                                    </label>
                                </div>
                                <div style={{ height: '39px' }}></div>
                                <ButtonBasic
                                    innerText="카드 만들기 완료"
                                    onClick={handleCardMakingBtnClick}
                                    disable={cardImage === undefined}
                                ></ButtonBasic>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default CreateCard;