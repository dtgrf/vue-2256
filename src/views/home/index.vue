
<template>
  <el-row class="home" :gutter="20">
    <el-col class="colleft" :span="8" >
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <img class="userimg" :src="userimg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="logininfo">
          <p>上次登录时间<span>2022-2-2</span></p>
          <p>上次登录地点<span>成都</span></p>
        </div>
      </el-card>
      <el-card class="tablecon">
        <el-table  :data="tableData">
          <el-table-column v-for="(val,key,index) in tablabel" :key="index" :prop="key" :label="val" width="110"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col class="colright" style="margin-top:20px" :span="16">
      <div class="payment">
        <el-card class="paycard" v-for="item in countData" :key="item.name" :body-style="{ display:'flex' , padding:0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <!-- <div style="height:280px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height:280px"/>
      </el-card>
      <div class="graph">
        <el-card class="lgraph" style="height:279px">
          <!-- <div style="height:240px" ref="userEcharts"></div> -->
          <echart :chartData="echartData.user" style="height:240px"/>
        </el-card>
        <el-card class="rgraph" style="height:279px">
          <!-- <div style="height:240px" ref="videoEcharts"></div> -->
          <echart :chartData="echartData.video" :isAxisChart="false" style="height:240px"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

import {getData} from "../../../api/data.js"//加花括号命名必须与export中名字对应，不加可以随意取名：import S from '.....'
import Echart from '../../components/Echart.vue'

export default {
  name: 'home',
  components:{
    Echart
  },
  data () {
    return {
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      tablabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      echartData:{
        order:{
          xdata:[],
          series:[]
        },
        user:{
          xdata:[],
          series:[]
        },
        video:{
          series:[]
        }
      },
      userimg: require('../../assets/images/user.jpg')
    }
  },
  mounted(){
    // this.$http.get('/user?ID=12345')
    //   .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    getData().then(res=>{
      const {code,data}=res
      if(code===20000){
        console.log(res)
        this.tableData=data.tableData
        const order=data.orderData
        // const xdata=order.date
        const keyArry=Object.keys(order.data[0])
        const series=[];
        keyArry.forEach(key=>{
          series.push({
            name:key,
            data:order.data.map(item=>item[key]),
            type: 'line'
          })
        })
        // const option={
        //   xAxis:{
        //     data:xdata
        //   },
        //   yAxis:{

        //   },
        //   legend:{
        //     data:keyArry
        //   },
        //   series
        // }

        this.echartData.order.xdata=data.orderData.date;
        this.echartData.order.series=series;
        // const E= this.$echarts.init(this.$refs.echarts)
        // E.setOption(option)

        //用户图
        // const userOption= {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: data.userData.map(item=>item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name:'新增用户',
        //       data:data.userData.map(item=>item.new),
        //       type:'bar'
        //     },
        //     {
        //       name:'活跃用户',
        //       data:data.userData.map(item=>item.active),
        //       type:'bar'
        //     }
        //   ],
        // }
        this.echartData.user.xdata=data.userData.map(item=>item.date);
        this.echartData.user.series=[
            {
              name:'新增用户',
              data:data.userData.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item=>item.active),
              type:'bar'
            }
          ];
        // const U= this.$echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)

        //饼图
        // const videoOption={
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       data:data.videoData,
        //       type:'pie'
        //     }
        //   ]
        // }
        // const V= this.$echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)
        this.echartData.video.series=[
            {
              data:data.videoData,
              type:'pie'
            }
        ]

      }
      else{
        console.log(code+'sdsd')
        console.log(res)
      }
      
    })
  }
}
</script>
