const { default: API } = require("./API");
const { setKey } = require("./Key");

exports.checkLogin = async () => {
  return new Promise((resolve, reject) => {
    if (!localStorage.getItem("a-t") || !localStorage.getItem("r-t"))
      resolve(false);
    API.get("/check")
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("d", JSON.stringify(res.data));
          resolve(true);
        }
      })
      .catch(async (err) => {
        if (err.response) {
          if (err.response.status == 403) {
            API.post("/v2", {
              r_t: localStorage.getItem("r-t"),
              a_t: localStorage.getItem("a-t"),
            })
              .then((res) => {
                if (res.status == 200) {
                  localStorage.setItem("a-t", res.data.at);
                  resolve(true);
                }
              })
              .catch((err) => {
                if (err.response) {
                  if (err.response.status == 403) {
                    setKey(null, null);
                    localStorage.setItem("d", null);
                    resolve(false);
                  }
                  localStorage.setItem("d", null);
                }
                resolve(false);
              });
          }
        }
      });
  });
};

exports.checkadmin = async () => {
  return new Promise((resolve, reject) => {
    API.get("/validAdmin")
      .then((res) => {
        if (res.status == 200) {
          resolve(true);
        }
      })
      .catch((err) => {
        resolve(false);
      });
  });
};
