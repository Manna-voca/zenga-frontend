import React from "react";
import { useState } from "react";
import BlockNumber from "./BlockNumber";
import ZengaBlock from "./ZengaBlock";
import blueblockImg from "../images/blueblock.png";
import yellowblockImg from "../images/yellowblock.png";
import greenblockImg from "../images/greenblock.png";
import purpleblockImg from "../images/purpleblock.png";
import orangeblockImg from "../images/orangeblock.png";
import pinkblockImg from "../images/pinkblock.png";
import defaultblockImg from "../images/defaultblock.png";
import ZengaBigBlock from "./ZengaBigBlock";

const ProfileZenga = () => {
    const [helpboxState, setHelpboxState] = useState<boolean>(false);

    const handleBlockListClick = () => {
        setHelpboxState(true);
    };

    return(
        <>
            <div style={{ height: '16px' }}></div>
            <div
                onClick={handleBlockListClick}
                style={{ margin: '0 20px 0 20px', height: '44px',
                        padding: '13px 17px 13px 16px',
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', borderRadius: '8px',
                        background: 'var(--surface-surface, #FAFAFA)',
                        cursor: 'pointer'
            }}>
                <BlockNumber type="Pink" number={2}></BlockNumber>
                <BlockNumber type="Orange" number={12}></BlockNumber>
                <BlockNumber type="Blue" number={21}></BlockNumber>
                <BlockNumber type="Green" number={2}></BlockNumber>
                <BlockNumber type="Yellow" number={2}></BlockNumber>
                <BlockNumber type="Purple" number={2}></BlockNumber>
                <BlockNumber type="Default" number={2}></BlockNumber>
            </div>
            <div style={{ height: '50px' }}></div>
            <div
                style={{ margin: '0 20px 0 20px', display: 'flex',
                        flexWrap: 'wrap', justifyContent: 'space-between',
                        rowGap: '5px'
            }}>
                <div style={{ width: '33%' }}>
                    <ZengaBlock block={blueblockImg} date="2023.08.15" text="첫 칭찬을 받았어요 !"></ZengaBlock>
                </div>
                <div style={{ width: '33%' }}>
                    <ZengaBlock block={yellowblockImg} date="2023.08.15" text="첫 칭찬을 받았어요 !"></ZengaBlock>
                </div>
                <div style={{ width: '33%' }}>
                    <ZengaBlock block={pinkblockImg} date="2023.08.15" text="첫 칭찬을 받았어요 !"></ZengaBlock>
                </div>
                <ZengaBigBlock block={greenblockImg} color="Green"></ZengaBigBlock>

            </div>
        </>
    );
}

export default ProfileZenga;