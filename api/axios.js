import axios from 'axios'
import config from '../config'
const baseUrl =process.env.NODE_ENV==='development'?config.baseUrl.dev:config.baseUrl.pro

class HttpRquest{
    constructor(baseUrl){
        this.baseUrl=baseUrl
    }
    getInsideConfig(){
        const config={
            baseUrl:this.baseUrl,
            header:{
 
            }
        }
     }
     interceptors(instance){
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
        
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response.data;
          }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
          });
     }
     request(options){
         const instance=axios.create()
         options={...this.getInsideConfig(),...options}//三点指es6中的扩展运算符，意在遍历对象属性放入当前对象
         this.interceptors(instance)
         return instance(options)//instance({config:1,config2:2,config3:3})
     }
}
 export default new HttpRquest(baseUrl)