import Cookies from "js-cookie";

const CookieService = (function () {
  function _setToken(access_token) {
    Cookies.set("access_token", access_token, { expires: 7 });
  }

  function _getToken() {
    return Cookies.get("access_token");
  }

  return {
    setToken: _setToken,
    getToken: _getToken,
  };
})();

export default CookieService;
