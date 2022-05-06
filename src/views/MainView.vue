<template>
  <div class="main">
    <el-container style="height:100%">
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
import CommonAside from '../components/CommonAside'
import CommonTag from '../components/CommonTag'
export default {
  name: 'Main',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data () {
    return { }
  }
}
</script>

