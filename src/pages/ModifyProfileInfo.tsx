import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import InputProfile from "../components/InputProfile";
import defaultProfile from '../images/defaultchannelprofile.png';
import InputText from "../components/InputText";
import { color } from "../styles/color";
import TextField from "../components/TextField";
import ButtonBasic from "../components/ButtonBasic";
import DropDown from "../components/DropDown";
import DatePicker from "../components/DatePicker";

const ModifyProfileInfo = () => {

    const [nickname, setNickname] = useState<string>("");
    const [intro, setIntro] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const genderChoices = ["여자", "남자"];

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };
    const handleIntroChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length > 50) {
          event.target.value = event.target.value.slice(0, 50);
        }
        setIntro(event.target.value);
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
            <div style={{ height: '12px' }}></div>
            <div style={{ margin: '0 20px 0 20px' }}>
                <div
                    style={{ height: '44px',display: 'flex',
                            padding: '14px 106px 14px 20px',
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'flex-start', gap: '4px',
                            borderRadius: '8px',
                            background: 'var(--surface-surface, #FAFAFA)'
                }}>
                    <div
                        style={{ height: '20px', fontSize: '14px',
                                fontStyle: 'normal', fontWeight: '500',
                                lineHeight: '150%',
                                color: 'var(--on-surface-active, #0A0A0A)'
                    }}>
                        채널 프로필
                    </div>
                    <div
                        style={{ height: '20px', fontSize: '12px',
                                fontStyle: 'normal', fontWeight: '400',
                                lineHeight: '160%',
                                color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                    }}>
                        현재 채널에서 보여지는 프로필이에요
                    </div>
                </div>
            </div>
            <div style={{ height: '32px' }}></div>
            <div
                style={{ display: 'flex', alignItems: 'center',
                        justifyContent: 'center', height: '98px'
            }}>
                <InputProfile
                    image={profileImage}
                    handleProfileImageUpload={handleProfileImageUpload}
                ></InputProfile>
            </div>
            <div style={{ height: '40px' }}></div>
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
            </div>
            <div style={{ height: '20px' }}></div>
            <div
                style={{ background: 'var(--surface-surface, #FAFAFA)',
                        height: '8px', width: '100%'
            }}></div>
            <div style={{ height: '20px' }}></div>
            <div style={{ margin: '0 20px 0 20px' }}>
                <div
                    style={{ height: '44px',display: 'flex',
                            padding: '14px 106px 14px 20px',
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'flex-start', gap: '4px',
                            borderRadius: '8px',
                            background: 'var(--surface-surface, #FAFAFA)'
                }}>
                    <div
                        style={{ height: '20px', fontSize: '14px',
                                fontStyle: 'normal', fontWeight: '500',
                                lineHeight: '150%',
                                color: 'var(--on-surface-active, #0A0A0A)'
                    }}>
                        ZENGA 프로필
                    </div>
                    <div
                        style={{ height: '20px', fontSize: '12px',
                                fontStyle: 'normal', fontWeight: '400',
                                lineHeight: '160%',
                                color: 'var(--on-surface-default, rgba(10, 10, 10, 0.70))'
                    }}>
                        젠가 서비스에 등록된 프로필이에요
                    </div>
                </div>
            </div>
            <div
                style={{ margin: '0 20px 0 20px', display: 'flex',
                        flexDirection: 'column', gap: '32px'
            }}>
                <InputText
                    isNecessary={true}
                    label="이름"
                    placeholder="이름을 입력해 주세요."
                    value={name}
                    onChange={handleNameChange}
                />
                <DropDown
                    isNecessary={true}
                    label="성별"
                    placeholder="성별을 선택해 주세요."
                    dropdownMenu={genderChoices}
                    onChange={setGender}
                    value={gender}
                />
                <DatePicker
                    isNecessary={false}
                    label="생년월일"
                    placeholder="생년월일을 선택해 주세요."
                    value={birthDate}
                />
            </div>
            <div style={{ height: '100px' }}></div>


            <div
                style={{ margin: '0', background: `${color.background}`,
                        position: 'fixed', bottom: '0', maxWidth: '500px',
                        width: '100%', display: 'flex', justifyContent: 'center',
                        height: '47px', padding: '8px 0', zIndex: '2'
            }}>
                <div style={{ width: "calc(100% - 40px)", maxWidth: "460px" }}>
                    <ButtonBasic
                        innerText='수정'
                        onClick={handleModifyBtnClick}
                        disable={!(nickname && name && gender)}
                    ></ButtonBasic>
                </div>
            </div>
        </>
    );
}

export default ModifyProfileInfo;