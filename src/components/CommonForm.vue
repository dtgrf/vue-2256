<template>
        <el-form ref="form" :model="form" :inline="inline" label-width="80px">
            <el-form-item v-for="item in formlabel" :key="item.label" :label="item.label">
                <el-input v-if="item.type==='input'" :placeholder="'请輸入'+item.label" v-model="form[item.model]"></el-input>
                <el-switch v-if="item.type==='switch'" v-model="form[item.model]"></el-switch>
                <el-date-picker v-if="item.type==='date'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form[item.model]"></el-date-picker>
                <el-select v-if="item.type==='select'" placeholder="请选择" v-model="form[item.model]">
                    <el-option v-for="secitem in item.opts" :key="secitem.value" :label="secitem.label" :value="secitem.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item ><slot></slot></el-form-item>
        </el-form>
</template>

<script>
export default {
    name: 'CommonForm',
    data() {
        return{}
    },
    props:{
        formlabel:Array,
        form:Object,
        inline:Boolean
    },
    methods:{
       
    },
    computed:{
      
    }
    
}
</script>
