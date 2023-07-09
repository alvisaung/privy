import CookieService from "./CookieService";

const LocalStorage = (function () {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
    }
    return _service;
  }

  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }

  function _getUser(type) {
    return JSON.parse(localStorage.getItem("user"));
  }

  function _saveUser(user, access_token) {
    localStorage.setItem("user", JSON.stringify(user));
    CookieService.setToken(access_token);
  }
  function _updateUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  async function checkUserAuthentication() {
    if (!_getUser()) {
      return false;
    }
    return true;
  }
  function _saveMenuSlug(slug) {
    localStorage.setItem("menu_slug", slug);
  }

  function _getMenuSlug() {
    return localStorage.getItem("menu_slug");
  }
  function _clearUser() {
    localStorage.setItem("user", null);
    localStorage.setItem("access_token", null);
  }

  return {
    getService: _getService,
    getUser: _getUser,
    saveUser: _saveUser,
    updateUser: _updateUser,
    clearUser: _clearUser,
    checkUserAuthentication: checkUserAuthentication,
    saveMenuSlug: _saveMenuSlug,
    getMenuSlug: _getMenuSlug,
  };
})();

export default LocalStorage;
