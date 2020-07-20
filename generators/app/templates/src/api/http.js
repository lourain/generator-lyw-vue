import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] = 'application/json';
// 拦截器
Axios.interceptors.request.use((config) => {
  const reqUrl = config.url
// 若请求地址不是signIn 则携带token
  if(reqUrl.indexOf('signIn')==-1){
    config.headers.Authorization = localStorage.riskSys;
  }
  return config;
}, ((err) => {
  return Promise.reject(err);
}));

export default {
  get(url,params,responseType) {
    return new Promise((resolve, reject) => {
      Axios({
        method: 'get',
        url,
        params,
        responseType
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }).catch(err=>{
      alert(err.message)
    });

  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      Axios({
        method: 'post',
        url,
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }).catch(err=>{
      alert(err.message)
    });
  },
};
