<template>
    <el-menu default-active="/" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{isCollapse?'后台':'通用后台管理系统'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="(items,indexs) in hasChildren" :index="String(indexs)" :key="items.path">
            <template slot="title">
                <i :class="'el-icon-'+items.icon"></i>
                <span slot="title">{{items.label}}</span>
            </template>
            <el-menu-item-group v-for="(subitem,subkey,subindex) in items.children" :key="subitem.path">
                <el-menu-item :index="subindex" @click="clickMenu(subitem)">{{subitem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        
    </el-menu>
</template>
<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
      height: 100vh;
      border:none;
      h3 {
          color: #fff;
          text-align:center;
          line-height:48px;
      }
  }
</style>
<script>
  export default {
    data() {
      return {
        // menu: [
        //     {
        //     path: '/',
        //     name: 'home',
        //     label: '首页',
        //     icon: 's-home',
        //     url: 'Home/Home'
        //     },
        //     {
        //     path: 'mall',
        //     name: 'mall',
        //     label: '商品管理',
        //     icon: 'video-play',
        //     url: 'MallManage/MallManage'
        //     },
        //     {
        //     path: 'user',
        //     name: 'user',
        //     label: '用户管理',
        //     icon: 'user',
        //     url: 'UserManage/UserManage'
        //     },
        //     {
        //     label: '其他',
        //     icon: 'location',
        //     children: [
        //         {
        //         path: '/page1',
        //         name: 'page1',
        //         label: '页面1',
        //         icon: 'setting',
        //         url: 'Other/PageOne'
        //         },
        //         {
        //         path: '/page2',
        //         name: 'page2',
        //         label: '页面2',
        //         icon: 'setting',
        //         url: 'Other/PageTwo'
        //         }
        //     ]
        //     }
        // ],
      };
    },
    methods: {
      handleOpen( key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose( key, keyPath) {
        console.log( key, keyPath);
      },
      clickMenu(e){
          this.$router.push({
              name:e.name
          })
          this.$store.commit('selectMenu',e)
      },
    },
    //计算属性；对于任何复杂逻辑，你都应当使用计算属性；computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义.
    //然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；实时更新
    computed:{
          asyncMenu(){
            return this.$store.state.tab.menu
          },
          noChildren(){
             return this.asyncMenu.filter(item=>!item.children)
          },
          hasChildren(){
              return this.asyncMenu.filter(item=>item.children)
          },
          isCollapse(){
            return this.$store.state.tab.isCollapse
          },
         
    }
    
  }
</script>