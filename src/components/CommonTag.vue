<template>
    <div class="tab">
        <el-tag v-for="(tag,index) in tags" :key="tag.name" size="small" :closable="tag.name!='首页'" 
        :effect="$route.name===tag.name ? 'dark' : 'plain' " @click="changeMenu(tag)" @close="handleClose(tag,index)" 
        :type="tag.type">
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'CommonTag',
    data() {
        return{}
    },
    methods:{
        ...mapMutations(['closeTag']),
        changeMenu(e){
            this.$router.push({name:e.name})
        },
        handleClose(tag,index){
            const length=this.tags.length-1;
            this.closeTag(tag)
            if(tag.name!==this.$route.name){
                return;
            }
            if(index===length){
                this.$router.push({name:this.tags[index-1].name})
            }else{
                this.$router.push({name:this.tags[index].name})
            }
        }
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabsList
        })
    }
    
}
</script>
