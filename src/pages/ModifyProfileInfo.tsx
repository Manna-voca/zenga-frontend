import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputProfile from "../components/InputProfile";
import defaultProfile from '../images/defaultchannelprofile.png';
import InputText from "../components/InputText";
import { color } from "../styles/color";
import TextField from "../components/TextField";
import ButtonBasic from "../components/ButtonBasic";

const ModifyProfileInfo = () => {

    const [nickname, setNickname] = useState<string>("");
    const [intro, setIntro] = useState<string>("");

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };
    const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIntro(event.target.value);
    };

    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(defaultProfile);
    const [profileImageFile, setProfileImageFile] = useState<File | null>();

    const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if(files.length > 0){
            setProfileImageFile(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
        }
        event.target.value = "";
    };

    const handleModifyBtnClick = () => {
        alert("수정하기 클릭!!");
    };

    return(
        <>
            <Header type="back" text="프로필 수정"></Header>
            <div style={{ height: '30px' }}></div>
            <div
                style={{ display: 'flex', alignItems: 'center',
                        justifyContent: 'center', height: '98px'
            }}>
                <InputProfile
                    image={profileImage}
                    handleProfileImageUpload={handleProfileImageUpload}
                ></InputProfile>
            </div>
            <div style={{ height: '30px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px'
            }}>
                <InputText
                    isNecessary={true}
                    label="닉네임"
                    placeholder="닉네임을 입력해 주세요."
                    value={nickname}
                    onChange={handleNicknameChange}
                />
                <div style={{ height: '32px' }}></div>
                <TextField
                    label='자기소개'
                    placeholder='나를 한줄로 소개해 보세요.'
                    value={intro}
                    onChange={handleIntroChange}
                    maxLength={50}
                />
                <div style={{ height: '60px' }}></div>
            </div>
            <div
                style={{ margin: '0', background: `${color.background}`,
                        position: 'fixed', bottom: '0', maxWidth: '500px',
                        width: '100%', display: 'flex', justifyContent: 'center',
                        height: '47px', padding: '8px 0'
            }}>
                <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
                    <ButtonBasic
                        innerText='수정'
                        onClick={handleModifyBtnClick}
                        disable={nickname === ""}
                    ></ButtonBasic>
                </div>
            </div>
        </>
    );
}

export default ModifyProfileInfo;