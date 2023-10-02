export let ACCESS_TOKEN = localStorage.getItem("accessToken");

export const getToken = (ACCESS_TOKEN: string | null) => {
  if (ACCESS_TOKEN) return ACCESS_TOKEN;
  else return null;
};

export const refresh = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const calculateTokenExpiration = async (accessToken: string) => {
  const tokenParts = accessToken.split(".");
  if (tokenParts.length !== 3) {
    return 0;
  }

  const payloadBase64 = tokenParts[1];
  const decodedPayload = atob(payloadBase64);
  const payloadObj = JSON.parse(decodedPayload);

  if (!payloadObj.exp) {
    return 0;
  }

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const expirationInSeconds = payloadObj.exp - currentTimeInSeconds;

  console.log(expirationInSeconds);
  return expirationInSeconds;
};
