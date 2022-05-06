import Mock from 'mockjs';
import homeApi from './mockServe/home.js';
import userApi from './mockServe/user.js';
import permissionApi from './mockServe/permission.js';

Mock.mock('/home/getData',homeApi.getStatisticalData);
Mock.mock('user/add', 'post' ,userApi.createUser);
Mock.mock('user/edit', 'post' ,userApi.updateUser);
Mock.mock('user/getUser','get',userApi.getUserList);
Mock.mock(/\user\/getUser(|\?\s*)/,'get',userApi.getUserList);

Mock.mock('user/del', 'post' ,userApi.deleteUser)
Mock.mock(/\permission\/getMenu/, 'post' ,permissionApi.getMenu)