import React, { ReactNode } from "react";

// 나중에 필요한 요소 추가 예정
interface Props {
  title: string;
  text: string | ReactNode;
  btnText: string;
  func?: any;
  image?: string;
}

const Popup1 = ({ title, text, btnText, func, image }: Props) => {
  const handleButtonClick = () => {
    func();
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.50)",
          zIndex: "2",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "calc(100vw - 43px)",
          margin: "0",
          backgroundColor: "white",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          zIndex: "3",
          maxWidth: "calc(500px - 43px)",
        }}
      >
        {/* <div
                style={{ position: 'fixed', top: '269px', width: 'calc(100vw - 43px)',
                        margin: '0 21px 0 22px', backgroundColor: 'white',
                        height: '187px', borderRadius: '8px',
                        display: 'flex', justifyContent: 'center',
                        zIndex: '3', maxWidth: 'calc(500px - 43px)'
            }}> */}
        <div
          style={{
            margin: "28px 0 16px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: image ? "block" : "none", marginBottom: "10px" }}
          >
            <img width='48px' height='48px' src={image} alt='' />
          </div>
          <div
            style={{
              height: "27px",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "150%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>{title}</span>
          </div>
          <div
            style={{
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "150%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "25px",
              marginTop: "5px",
              whiteSpace: "pre-line",
            }}
          >
            {text}
          </div>
          <div
            onClick={handleButtonClick}
            style={{
              height: "44px",
              width: "282px",
              cursor: "pointer",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--primary-primary-500, #1F94FF)",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "150%",
              color: "var(--on-primary-active, #FCFCFC)",
            }}
          >
            <span>{btnText}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup1;
