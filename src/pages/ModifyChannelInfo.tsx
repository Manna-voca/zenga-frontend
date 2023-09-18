import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputText from "../components/InputText";
import BtnInfoDuplicate from "../components/BtnInfoDuplicate";
import ButtonBasic from "../components/ButtonBasic";
import InputProfile from "../components/InputProfile";
import Popup2 from "../components/Popup2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ModifyChannelInfo = () => {
    const navigate = useNavigate();
    const { channelCode } = useParams();
    const CHANNEL_ID = localStorage.getItem("channelId");
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const CONFIG = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type':'application/json'
      },
    };


    const [clubname, setClubname] = useState<string>("");
    const handleClubnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClubname(event.target.value);
    };

    const [showChannelDeletePopup, setShowChannelDeletePopup] = useState<boolean>(false);

    const handleChannelDeleteBtnClick = () => {
        setShowChannelDeletePopup(true);
    };

    const handleChannelDeletePopupClick = async () => {
        setShowChannelDeletePopup(false);
        await axios.delete(`${SERVER_URL}/channels/${CHANNEL_ID}`, CONFIG).then((res) => {
            navigate('/channel-home');
        });
    };

    const handleChannelModifyBtnClick = async () => {
        if(channelImageFile !== null){
            const channelImgFormData = new FormData();
            channelImgFormData.append('image', channelImageFile);
            const uploadChannelImgResponse = await axios.post(`${SERVER_URL}/image/upload`, channelImgFormData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(uploadChannelImgResponse.status === 200){
                axios.put(`${SERVER_URL}/channels/${CHANNEL_ID}`, {
                    "name": clubname,
                    "logoImageUrl": uploadChannelImgResponse.data.data.url
                }, CONFIG).then((res) => {
                    window.location.reload();
                });
            }
        }
        else{
            axios.put(`${SERVER_URL}/channels/${CHANNEL_ID}`, {
                "name": clubname,
            }, CONFIG).then((res) => {
                window.location.reload();
            });
        }
    };

    const [channelProfileImage, setChannelProfileImage] = useState<string | ArrayBuffer | null>();
    const [channelImageFile, setChannelImageFile] = useState<File | null>(null);

    const handleChannelProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if(files.length > 0){
            setChannelImageFile(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setChannelProfileImage(reader.result);
            };
        }
        event.target.value = "";
    };

    const getChannelInfo = () => {
        axios.get(`${SERVER_URL}/channels/${CHANNEL_ID}`, CONFIG).then((res) => {
            console.log(res.data.data);
            setChannelProfileImage(res.data.data.logoImageUrl);
            setClubname(res.data.data.name);
            if(!res.data.data.isOwner){
                window.alert("잘못된 접근입니다");
            }
        })
    };

    useEffect(() => {
        getChannelInfo();
    }, []);

    return(
        <>
            <Header type="back" text="채널 정보 수정"></Header>
            <div style={{ height: '30px' }}></div>
            <div
                style={{ display: 'flex', alignItems: 'center',
                        justifyContent: 'center', height: '98px'
            }}>
                <InputProfile
                    image={channelProfileImage}
                    handleProfileImageUpload={handleChannelProfileImageUpload}
                ></InputProfile>
            </div>
            <div style={{ height: '30px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <InputText
                    isNecessary={true}
                    label="채널명"
                    placeholder="채널명을 입력해 주세요."
                    value={clubname}
                    onChange={handleClubnameChange}
                />
                <div style={{ height: '30px' }}></div>
                <BtnInfoDuplicate
                    label='링크'
                    text={`www.zenga.club/${channelCode}`}
                    message='링크를 누르면 생성한 채널로 들어갈 수 있어요.'
                ></BtnInfoDuplicate>
                <div style={{ height: '30px' }}></div>
                <BtnInfoDuplicate
                    label='코드'
                    text={`${channelCode}`}
                    message='코드를 입력하면 생성한 채널로 들어갈 수 있어요.'
                ></BtnInfoDuplicate>
                <div style={{ height: '51px' }}></div>
                <ButtonBasic
                    innerText="채널 삭제"
                    onClick={handleChannelDeleteBtnClick}
                    btnColor="FAFAFA"
                ></ButtonBasic>
                <div style={{ height: '12px' }}></div>
                <ButtonBasic
                    innerText="수정"
                    onClick={handleChannelModifyBtnClick}
                    disable={clubname === ""}
                ></ButtonBasic>
            </div>
            {showChannelDeletePopup &&
                <Popup2
                    title="채널 삭제"
                    text={"채널을 정말 삭제하시겠어요?"}
                    leftBtnText="취소"
                    rightBtnText="확인"
                    leftFunc={() => setShowChannelDeletePopup(false)}
                    rightFunc={handleChannelDeletePopupClick}
                />
            }
        </>
    );
}

export default ModifyChannelInfo;