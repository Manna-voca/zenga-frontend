import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputText from "../components/InputText";
import BtnInfoDuplicate from "../components/BtnInfoDuplicate";
import ButtonBasic from "../components/ButtonBasic";
import InputProfile from "../components/InputProfile";

const ModifyChannelInfo = () => {

    const [clubname, setClubname] = useState<string>("큐시즘 28기 모임");
    const handleClubnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClubname(event.target.value);
    };

    const handleChannelDeleteBtnClick = () => {
        alert("채널 삭제!!!");
    };

    const handleChannelModifyBtnClick = () => {
        alert("채널 수정!!!");
    };

    const [channelProfileImage, setChannelProfileImage] = useState<string | ArrayBuffer | null>();
    const [channelImageFile, setChannelImageFile] = useState<File | null>();

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
                    label="동아리명"
                    placeholder="이름을 입력해 주세요."
                    value={clubname}
                    onChange={handleClubnameChange}
                />
                <div style={{ height: '30px' }}></div>
                <BtnInfoDuplicate
                    label='링크'
                    text='www.zenga/kusitms4834'
                    message='링크를 누르면 생성한 채널로 들어갈 수 있어요.'
                ></BtnInfoDuplicate>
                <div style={{ height: '30px' }}></div>
                <BtnInfoDuplicate
                    label='코드'
                    text='ad3f78e1'
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
        </>
    );
}

export default ModifyChannelInfo;