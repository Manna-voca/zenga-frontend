/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { color } from "../styles/color";
import whaleX from "../images/whaleX.png";
import whaleDefault from "../images/whaleDefault.png";

interface Props{
    type: "X" | "O";
    text: string;
    func: any;
};

const Toast = ({type, text, func}: Props) => {

    const [animationState, setAnimationState] = useState<boolean>(true);

    useEffect(() => {
        let timer2;
        let timer = setTimeout(() => {
            setAnimationState(false);
            timer2 = setTimeout(() => {
                func();
            }, 500);
        }, 2000);

        return () => { clearTimeout(timer) }
    }, []);

    return(
        <>
            <ToastContainer css={animationState ? openAnimation : closeAnimation}>
                <img
                    src={type === "X" ? whaleX : whaleDefault}
                    alt=""
                    width={30}
                    height={30}
                />
                <div>{type === "X" ? "복사에 실패했어요ㅠㅠ" : text}</div>
            </ToastContainer>
        </>
    );
}

export default Toast;

const ToastContainer = styled.div`
    color: var(--light-text-text-active, var(--light-text-text-active, #0D0D0D));
    background-color: ${color.primary50};
    border: 1px solid ${color.primary100};
    border-radius: 15px;
    height: 36px;
    width: 298px;
    padding: 17px 30px;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    lien-height: 150%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    position: fixed;
    top: 3px;
    left: calc(50% - 179px);
    z-index: 4;
`;

const slideIn = keyframes`
    from{
        transform: translateY(-100%);
    }
    to{
        transform: translateY(0%);
    }
`;

const slideOut = keyframes`
    from{
        transform: translateY(0%);
    }
    to{
        transform: translateY(-300%);
    }
`;

const openAnimation = css`
    animation: ${slideIn} 0.5s ease-in-out 0s 1 normal forwards;
`;

const closeAnimation = css`
    animation: ${slideOut} 0.5s ease-in-out 0s 1 normal forwards;
`;