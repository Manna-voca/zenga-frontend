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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const CONFIG = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};
const CHANNEL_ID = localStorage.getItem("channelId");

interface CommentData {
  id: string;
  author: string;
  content: string;
  createdBefore: string;
  isReply: boolean;
  authorImage: string;
  isChannelAdmin: boolean;
  isMine: boolean;
  parentId: string | null;
}

interface CommentWrapperProps {
  comment: CommentData;
  setShowMyReplyControl: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOthersReplyControl: React.Dispatch<React.SetStateAction<boolean>>;
  setReadyState: React.Dispatch<React.SetStateAction<string>>;
  setPreviousComment: React.Dispatch<React.SetStateAction<string>>;
  setCommentId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setParentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentWrapper = ({
  comment,
  setShowMyReplyControl,
  setShowOthersReplyControl,
  setReadyState,
  setPreviousComment,
  setCommentId,
  setParentId,
}: CommentWrapperProps) => {
  const { meetupId } = useParams();
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
                setCommentId(comment.id);
              }
            : () => {
                setShowOthersReplyControl(true);
                setReadyState(comment.author);
                setCommentId(comment.id);
                if (comment.parentId) {
                  setParentId(comment.parentId);
                }
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
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  isFocused: boolean;
  replyTo: string | null;
  setReplyTo: React.Dispatch<React.SetStateAction<string | null>>;
  commentId?: string;
  setCommentId: React.Dispatch<React.SetStateAction<string | undefined>>;
  parentId: string | null;
  setParentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentCreator = ({
  comment,
  setComment,
  isFocused,
  replyTo,
  setReplyTo,
  commentId,
  setCommentId,
  parentId,
  setParentId,
}: CommentCreatorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { meetupId } = useParams();
  const [myImage, setMyImage] = useState<string>("");

  const getMyImage = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/members/info?channelId=${CHANNEL_ID}`,
        CONFIG
      );
      setMyImage(res.data.data.profileImageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyImage();
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

  const postComment = async () => {
    if (comment.length === 0) {
      alert("댓글을 입력해주세요.");
      return;
    }
    console.log(comment);
    console.log(replyTo);
    console.log(commentId);
    const URL = `${SERVER_URL}/comment`;
    try {
      // 새로운 댓글 작성
      if (replyTo === null && commentId === undefined) {
        const res = await axios.post(
          URL,
          {
            channelId: CHANNEL_ID,
            partyId: meetupId,
            content: comment,
          },
          CONFIG
        );
        console.log(res);
        window.location.reload();
      }
      // 내 댓글 수정
      else if (replyTo === null && commentId !== undefined) {
        const res = await axios.patch(
          URL,
          {
            channelId: CHANNEL_ID,
            commentId: commentId,
            content: comment,
          },
          CONFIG
        );
        console.log(res);
        window.location.reload();
      }
      // 남의 댓글에 대댓글
      else if (replyTo !== null && commentId !== undefined) {
        const res = await axios.post(
          URL,
          {
            channelId: CHANNEL_ID,
            partyId: meetupId,
            parentId: parentId ? parentId : commentId,
            content: comment,
          },
          CONFIG
        );
        console.log(res);
        window.location.reload();
      } else {
        const res = await axios.patch(
          URL,
          {
            channelId: CHANNEL_ID,
            commentId: commentId,
            content: comment,
          },
          CONFIG
        );
        console.log(res);
        window.location.reload();
      }

      setReplyTo(null);
      setCommentId(undefined);
      setParentId(null);
    } catch (error) {
      console.log(error);
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
              onClick={() => {
                setReplyTo(null);
                setCommentId(undefined);
                setParentId(null);
              }}
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
          <CommentButton onClick={postComment}>등록</CommentButton>
        </div>
      </div>
    </>
  );
};

const Comment = () => {
  // const comments: CommentData[] = [
  //   {
  //     author: "박세원",
  //     content: "이 시간에 라면 먹으면 안되겠지?",
  //     createdBefore: "2시간 전",
  //     isReply: false,
  //     authorImage: exImage1,
  //     isChannelAdmin: false,
  //     isMine: false,
  //   },
  //   {
  //     author: "윤석민",
  //     content: "당연하지",
  //     createdBefore: "2시간 전",
  //     isReply: true,
  //     authorImage: exImage1,
  //     isChannelAdmin: true,
  //     isMine: true,
  //   },
  //   {
  //     author: "윤석민",
  //     content:
  //       "우다다다다다다다다닫다다다다다다다다다다우더ㅜ아두ㅏㅇ다ㅏ다아두ㅏ우다ㅜ아다우ㅏ어ㅏㅜㅁㅇ런애ㅑ러매냐어램널애먀ㅓ램너ㅐ러내야ㅓ랴ㅓㄴ매ㅓ",
  //     createdBefore: "2시간 전",
  //     isReply: false,
  //     authorImage: exImage1,
  //     isChannelAdmin: true,
  //     isMine: true,
  //   },
  // ];

  // 댓글 데이터
  const [comments, setComments] = useState<CommentData[]>([]);
  // 댓글 수정 시 이전 내용
  const [previousComment, setPreviousComment] = useState<string>("");
  // 댓글 작성 및 수정 시 현재 내용
  const [comment, setComment] = useState<string>("");
  const [isCommentFocused, setIsCommentFocused] = useState<boolean>(false);
  // 누구에게 대댓글을 쓰고있는지 케밥을 클릭했을 때 설정해놓음
  const [readyState, setReadyState] = useState<string>("");
  // 누구에게 댓글을 쓰고있는지
  const [replyTo, setReplyTo] = useState<string | null>(null);
  // 본인 댓글 클릭시 버튼
  const [showMyReplyControl, setShowMyReplyControl] = useState<boolean>(false);
  // 다른 사람 댓글 클릭시 버튼
  const [showOthersReplyControl, setShowOthersReplyControl] =
    useState<boolean>(false);
  //신고하기 모달
  const [showReport, setShowReport] = useState<boolean>(false);
  // 댓글 삭제 모달
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const { meetupId } = useParams();

  // 수정 혹은 대댓글을 작성하려는 댓글 ID
  const [commentId, setCommentId] = useState<string>();
  // 대댓글 부모 댓글 ID
  const [parentId, setParentId] = useState<string | null>(null);

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  function formatDate(date: Date) {
    const now = dayjs();
    const duration = now.diff(date, "minute");
    if (duration > 1440) return `${Math.floor(duration / 1440)}일전`;
    else if (duration > 60) {
      return `${Math.floor(duration / 60)}시간전`;
    } else if (duration > 0) {
      return `${duration}분전`;
    } else {
      return `1분전`;
    }
  }
  const deleteComment = async () => {
    try {
      await axios.delete(
        `${SERVER_URL}/comment?channelId=${CHANNEL_ID}&commentId=${commentId}`,
        CONFIG
      );
      setReadyState("");
      setParentId(null);
      setCommentId(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/comment/${meetupId}`, CONFIG);
      console.log(res.data);
      let newComment: any = [];
      if (res.data && res.status === 200) {
        for (let i = 0; i < res.data.data.content.length; i++) {
          newComment.push({
            id: res.data.data.content[i].commentId,
            author: res.data.data.content[i].writerName,
            content: res.data.data.content[i].content,
            createdBefore: formatDate(
              new Date(res.data.data.content[i].createdAt)
            ),
            isReply: res.data.data.content[i].parentId !== null,
            authorImage: res.data.data.content[i].writerProfileImageUrl,
            isChannelAdmin: false,
            isMine:
              res.data.data.content[i].writerId ===
              Number(localStorage.getItem("memberId")),
            parentId: res.data.data.content[i].parentId,
          });
          if (res.data.data.content[i].childComments.length !== 0) {
            for (
              let j = 0;
              j < res.data.data.content[i].childComments.length;
              j++
            ) {
              newComment.push({
                id: res.data.data.content[i].childComments[j].commentId,
                author: res.data.data.content[i].childComments[j].writerName,
                content: res.data.data.content[i].childComments[j].content,
                createdBefore: formatDate(
                  new Date(res.data.data.content[i].childComments[j].createdAt)
                ),
                isReply:
                  res.data.data.content[i].childComments[j].parentId !== null,
                authorImage:
                  res.data.data.content[i].childComments[j]
                    .writerProfileImageUrl,
                isChannelAdmin: false,
                isMine:
                  res.data.data.content[i].childComments[j].writerId ===
                  Number(localStorage.getItem("memberId")),
                parentId: res.data.data.content[i].childComments[j].parentId,
              });
            }
          }
        }
        setComments(newComment);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
            setCommentId={setCommentId}
            setParentId={setParentId}
          />
        );
      })}
      <CommentCreator
        comment={comment}
        isFocused={isCommentFocused}
        setComment={setComment}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        commentId={commentId}
        setCommentId={setCommentId}
        parentId={parentId}
        setParentId={setParentId}
      />
      {showMyReplyControl && (
        <ButtonMultiple
          closeHandler={() => setShowMyReplyControl(false)}
          textList={["댓글 수정", "댓글 삭제", "취소"]}
          onClickList={[
            async () => {
              setIsCommentFocused(true);
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
              setReadyState("");
              setParentId(null);
              setCommentId(undefined);
              setShowOthersReplyControl(false);
              setShowReport(true);
            },
            () => {
              setShowOthersReplyControl(false);
              setReadyState("");
              setParentId(null);
              setCommentId(undefined);
            },
          ]}
        />
      )}
      {showReport && <PopupComplaint func={() => setShowReport(false)} />}
      {showDeletePopup && (
        <Popup2
          title="알림"
          text="댓글을 삭제하시나요?"
          leftBtnText="취소"
          rightBtnText="삭제"
          leftFunc={() => {
            setShowDeletePopup(false);
            setReadyState("");
            setParentId(null);
            setCommentId(undefined);
          }}
          rightFunc={() => {
            deleteComment();
            setShowDeletePopup(false);
            window.location.reload();
          }}
        />
      )}
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
  color: ${color.onSurfaceDefault};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
`;
