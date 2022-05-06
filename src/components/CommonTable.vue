<template>
    <div class="common-table">
        <el-table :data="tableData" height="90%" stripe>
            <el-table-column show-overflow-tooltip 
            v-for="item in tableLabel" :key="item.prop" 
            :label="item.label" :width="item.width?item.width:125"
            >
                <template slot-scope="scope">
                    <span style="margin-left:]">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click='handleEdit(scope.row)'>编辑</el-button>
                    <el-button size="mini" @click='handleDelete(scope.row)' type='danger'>删除</el-button>
                </template>    
            </el-table-column>
        </el-table>
        <el-pagination class="pager" layout="prev, pager, next"
            :total="config.total" :current-page.sync='config.page'
            @current-change='changepage' :page-size="20">
        </el-pagination>
    </div>
</template>

<script>

export default {
    name: 'CommonTable',
    data() {
        return{

        }
    },
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object
    },
    methods:{
        handleEdit(row){
            this.$emit('edit',row)
        },
        handleDelete(row){
            this.$emit('del',row)
        },
        changepage(page){
            this.$emit('changePage',page)
        }
    },
    computed:{
        
    }
    
}
</script>
