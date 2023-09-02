import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import exImage1 from "../assets/images/profile-1.png";
import kebabIcon from "../assets/icons/ic-kebab.svg";
import xIcon from "../assets/icons/ic-x16.svg";
import { typography } from "../styles/typography";
import { color } from "../styles/color";
import CircularImage from "../components/CircularImage";
import styled from "@emotion/styled";
import ButtonMultiple from "../components/ButtonMultiple";
import PopupComplaint from "../components/PopupComplaint";
import Popup2 from "../components/Popup2";

interface CommentData {
  author: string;
  content: string;
  createdBefore: string;
  isReply: boolean;
  authorImage: string;
  isChannelAdmin: boolean;
  isMine: boolean;
}

interface CommentWrapperProps {
  comment: CommentData;
  setShowMyReplyControl: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOthersReplyControl: React.Dispatch<React.SetStateAction<boolean>>;
  setReadyState: React.Dispatch<React.SetStateAction<string>>;
  setPreviousComment: React.Dispatch<React.SetStateAction<string>>;
}

const CommentWrapper = ({
  comment,
  setShowMyReplyControl,
  setShowOthersReplyControl,
  setReadyState,
  setPreviousComment,
}: CommentWrapperProps) => {
  return (
    <div
      style={{
        padding: comment.isReply ? "12px 20px 12px 44px" : "12px 20px",
        display: "flex",
        gap: "12px",
        justifyContent: "space-between",
        backgroundColor: comment.isReply ? `${color.surface}` : "",
      }}
    >
      <CircularImage
        image={comment.authorImage}
        size={"36"}
        isChannelAdmin={comment.isChannelAdmin ? true : undefined}
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <span
          style={{
            ...typography.caption1Regular,
            color: `${color.onSurfaceMuted}`,
          }}
        >
          {comment.createdBefore}
        </span>
        <span
          style={{
            ...typography.body2Medium,
            color: `${color.onSurfaceDefault}`,
            margin: "2px 0 1px 0",
          }}
        >
          {comment.author}
        </span>
        <span
          style={{
            ...typography.body2Regular,
            color: `${color.onSurfaceDefault}`,
          }}
        >
          {comment.content}
        </span>
      </div>
      <img
        src={kebabIcon}
        alt=""
        onClick={
          comment.isMine
            ? () => {
                setShowMyReplyControl(true);
                setPreviousComment(comment.content);
              }
            : () => {
                setShowOthersReplyControl(true);
                setReadyState(`${comment.author}`);
              }
        }
        width="18px"
        height="18px"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

interface CommentCreatorProps {
  myImage: string;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  replyTo: string | null;
  setReplyTo: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentCreator = ({
  myImage,
  comment,
  setComment,
  isFocused,
  replyTo,
  setReplyTo,
}: CommentCreatorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
    window.addEventListener("resize", adjustTextareaHeight);
    return () => {
      window.removeEventListener("resize", adjustTextareaHeight);
    };
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
    if (isFocused) {
      textareaRef.current?.focus();
    }
  }, [isFocused]);

  const handleTextareaChange = (event: any) => {
    setComment(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    const div = divRef.current;
    if (textarea && div) {
      textarea.style.height = "36px";
      textarea.style.height = `${textarea.scrollHeight}px`;
      div.style.height = `calc(${textarea.scrollHeight}px +  21px)`;
    }
  };
  // 댓글관련 끝
  return (
    <>
      <div ref={divRef} style={{ maxHeight: "99px" }}></div>
      <div
        style={{
          margin: "0",
          left: "0",
          right: "0",
          bottom: "0",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          maxWidth: "100%",
          boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.10)",
          background: `${color.background}`,
        }}
      >
        <div
          style={{
            display: replyTo ? "flex" : "none",
            position: "absolute",
            top: "-39px",
            width: "100%",
            justifyContent: "center",
            background: `${color.surface}`,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              boxSizing: "border-box",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                ...typography.body3Regular,
                color: `${color.onSurfaceDefault}`,
              }}
            >
              <b style={{ fontWeight: "600" }}>{replyTo}</b>님에게 쓰는 대댓글
            </span>
            <img
              src={xIcon}
              alt=""
              onClick={() => setReplyTo(null)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            boxSizing: "border-box",
            padding: "14px 20px",
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <CircularImage image={myImage} size="36" />
          <CommentArea
            ref={textareaRef}
            value={comment}
            onChange={handleTextareaChange}
            placeholder="댓글을 입력해주세요."
          />
          <CommentButton>등록</CommentButton>
        </div>
      </div>
    </>
  );
};

const Comment = () => {
  const myImage = exImage1;
  const comments: CommentData[] = [
    {
      author: "박세원",
      content: "이 시간에 라면 먹으면 안되겠지?",
      createdBefore: "2시간 전",
      isReply: false,
      authorImage: exImage1,
      isChannelAdmin: false,
      isMine: false,
    },
    {
      author: "윤석민",
      content: "당연하지",
      createdBefore: "2시간 전",
      isReply: true,
      authorImage: exImage1,
      isChannelAdmin: true,
      isMine: true,
    },
    {
      author: "윤석민",
      content:
        "우다다다다다다다다닫다다다다다다다다다다우더ㅜ아두ㅏㅇ다ㅏ다아두ㅏ우다ㅜ아다우ㅏ어ㅏㅜㅁㅇ런애ㅑ러매냐어램널애먀ㅓ램너ㅐ러내야ㅓ랴ㅓㄴ매ㅓ",
      createdBefore: "2시간 전",
      isReply: false,
      authorImage: exImage1,
      isChannelAdmin: true,
      isMine: true,
    },
  ];
  const [previousComment, setPreviousComment] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isCommentFocused, setIsCommentFocused] = useState<boolean>(false);
  const [readyState, setReadyState] = useState<string>(""); // 누구에게 대댓글을 쓰고있는지 케밥을 클릭했을 때 설정해놓음
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showMyReplyControl, setShowMyReplyControl] = useState<boolean>(false);
  const [showOthersReplyControl, setShowOthersReplyControl] =
    useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  return (
    <>
      <Header type="back" text={`댓글 ${comments.length}`} />
      {comments.map((item, index) => {
        return (
          <CommentWrapper
            key={index}
            comment={item}
            setShowMyReplyControl={setShowMyReplyControl}
            setShowOthersReplyControl={setShowOthersReplyControl}
            setReadyState={setReadyState}
            setPreviousComment={setPreviousComment}
          />
        );
      })}
      <CommentCreator
        myImage={myImage}
        comment={comment}
        isFocused={isCommentFocused}
        setComment={setComment}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
      {showMyReplyControl && (
        <ButtonMultiple
          closeHandler={() => setShowMyReplyControl(false)}
          textList={["댓글 수정", "댓글 삭제", "취소"]}
          onClickList={[
            async () => {
              await setIsCommentFocused((prev) => !prev);
              setComment(previousComment);
              setReplyTo(null);
              setIsCommentFocused(true);
              setShowMyReplyControl(false);
            },
            () => {
              setShowDeletePopup(true);
              setShowMyReplyControl(false);
            },
            () => setShowMyReplyControl(false),
          ]}
        />
      )}
      {showOthersReplyControl && (
        <ButtonMultiple
          closeHandler={() => setShowOthersReplyControl(false)}
          textList={["대댓글 남기기", "댓글 신고하기", "취소"]}
          onClickList={[
            async () => {
              await setIsCommentFocused((prev) => !prev);
              setComment("");
              setIsCommentFocused(true);
              setReplyTo(readyState);
              setShowOthersReplyControl(false);
            },
            () => {
              setShowOthersReplyControl(false);
              setShowReport(true);
            },
            () => setShowOthersReplyControl(false),
          ]}
        />
      )}
      {showReport && <PopupComplaint func={() => setShowReport(false)} />}
      {showDeletePopup && <Popup2 func={() => setShowDeletePopup(false)} />}
    </>
  );
};

export default Comment;

const CommentArea = styled.textarea`
  align-items: center;
  width: 100%;
  resize: none;
  height: 36px;
  max-height: 63px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: ${color.onSurfaceActive};
  padding: 7.5px;
  font-family: "Pretendard", sans-serif;
  border: none;
  &:focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${color.onSurfaceMuted};
  }
`;

const CommentButton = styled.button`
  font-family: "Pretendard", sans-serif;
  padding: 0;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  min-width: 28px;
  width: 28px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
`;
