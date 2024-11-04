import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

const userToken = Cookies.get("userToken");

window.Pusher = Pusher;
// Function to extract the host without protocol or port
const getWsHost = (url) => {
  const urlObj = new URL(url);
  return urlObj.hostname; // Gets only the hostname (e.g., "192.168.0.116")
};
const echo = new Echo({
  broadcaster: "pusher",
  key: "ABCDE",
  cluster: "mt1",
  // Use the function to get the wsHost without protocol and port
  wsHost: getWsHost(process.env.REACT_APP_LARAVEL_URL),
  wsPort: 6001, //
  disableStats: true, //
  forceTLS: false, //
  authEndpoint: `${process.env.REACT_APP_LARAVEL_URL}/api/user`,
  auth: {
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: "application/json",
    },
  },
});

export default echo;
