/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { color } from "../styles/color";
import whaleX from "../images/whaleX.png";
import whaleDefault from "../images/whaleDefault.png";

interface Props{
    type: "X" | "O";
    func: any;
};

const Toast = ({type, func}: Props) => {

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
                <div>{type === "X" ? "복사에 실패했어요ㅠㅠ" : "복사에 성공했습니다!!!"}</div>
            </ToastContainer>
        </>
    );
}

export default Toast;

const ToastContainer = styled.div`
    background-color: ${color.primary50};
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    height: 40px;
    width: 178px;
    padding: 5px;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    position: fixed;
    top: 10px;
    left: calc(50% - 89px);
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