exports.setKey = (access, refresh) => {
  localStorage.setItem("a-t", access);
  localStorage.setItem("r-t", refresh);
};

exports.getAccess = () => {
  if (localStorage.getItem("a-t") == null) return false;

  return localStorage.getItem("a-t");
};

exports.getRefresh = () => {
  if (localStorage.getItem("a-r") == null) return false;

  return localStorage.getItem("a-r");
};

exports.getDataKey = (ar) => {
  const d = JSON.parse(localStorage.getItem("d"));
  return d;
};

exports.resetKey = () => {
  localStorage.setItem("a-t", null);
  localStorage.setItem("r-t", null);
  localStorage.setItem("d", null);
};
