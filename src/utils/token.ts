import axios from "./api";

export let ACCESS_TOKEN = localStorage.getItem("accessToken");

window.addEventListener("storage", (event) => {
  if (event.key === "accessToken") {
    // localStorage의 accessToken이 변경되면 이벤트 핸들러 실행
    ACCESS_TOKEN = event.newValue;
    // ACCESS_TOKEN 변수를 업데이트한 후, 필요한 작업을 수행
    console.log("AccessToken이 변경되었습니다:");
  }
});

export const refresh = async () => {
  try {
    console.log("Refreshing");
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/refresh`,
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
      {}
    );
    console.log("Refreshed ", res);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("refreshToken", res.data.data.refreshToken);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
