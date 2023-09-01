import { color } from "../styles/color";
import { typography } from "../styles/typography";

interface OwnProps {
  textList: string[];
  onClickList: React.MouseEventHandler<HTMLButtonElement>[];
  closeHandler: React.MouseEventHandler<HTMLDivElement>;
}

const ButtonMultiple = ({ textList, onClickList, closeHandler }: OwnProps) => {
  if (textList.length !== onClickList.length)
    console.error("버튼의 개수와 핸들러 함수의 개수가 일치하지 않습니다.");
  return (
    <>
      <div
        onClick={closeHandler}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          width: "calc(100% - 40px)",
          margin: "0 auto",
          maxWidth: "460px",
          left: "0",
          right: "0",
          bottom: "33px",
          zIndex: "2",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {textList.map((item, index) => {
          return (
            <button
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "47px",
                cursor: "pointer",
                color: `${color.onSurfaceDefault}`,
                backgroundColor: `${color.surface}`,
                ...typography.body1Medium,
                padding: "0",
                border: "none",
                borderRadius: "8px",
                fontFamily: "Pretendard",
              }}
              onClick={onClickList[index]}
            >
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ButtonMultiple;
