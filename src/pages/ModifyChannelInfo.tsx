import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import CircularImage from "../components/CircularImage";
import cameraImg from "../images/camera.svg";
import InputText from "../components/InputText";
import BtnInfoDuplicate from "../components/BtnInfoDuplicate";
import ButtonBasic from "../components/ButtonBasic";

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

    return(
        <>
            <Header type="back" text="채널 정보 수정"></Header>
            <div style={{ height: '30px' }}></div>
            <div
                style={{ display: 'flex', alignItems: 'center',
                        justifyContent: 'center', height: '98px'
            }}>
                <CircularImage
                    size="98"
                    image={cameraImg}
                    alt="image"
                />
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