<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color:#fff;float: right;">首页</h3> -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
          <el-dropdown trigger="click" szie="mini">
            <span class="el-dropdown-link">
              <img class="user" :src="userimg" alt="暂无">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </header>
</template>
<style lang="less" scoped>
 
</style>
<script>
import {mapState} from 'vuex';

  export default {
    name: 'CommonHeader',
    data() {
        return {
          userimg: require('../assets/images/user.jpg')
        }
    },
    methods: {
     handleMenu(){
       this.$store.commit('collapseMenu')
     },
     logOut (){
       this.$store.commit('clearToken')
       this.$store.commit('clearMenu')
       this.$router.push('/login')
     }
    },
    computed:{
      ...mapState({
        tags:state=>state.tab.tabsList
      })
    }
    
  }
</script>