<template>
<!--   <el-select-->
<!--      v-model="statusLists"-->
<!--      placeholder="请选择"-->
<!--      class="filter-item"-->
<!--      style="width: 130px">-->
<!--      <el-option-->
<!--         v-for="item in statusLists"-->
<!--         :key="item.key"-->
<!--         :label="item.status_name"-->
<!--         :value="item.id"/>-->
<!--   </el-select>-->
   <el-select v-model="value" filterable placeholder="请选择">
      <el-option
         v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value">
      </el-option>
   </el-select>
</template>

<script>
export default {
   name: "SelectDefault",
   data() {
      return {
         statusLists: [{id: 1, status_name: '上线'}, {id: 2, status_name: '下线'}],
         formData: '1',
         options: [{
            value: '选项1',
            label: '黄金糕'
         }, {
            value: '选项2',
            label: '双皮奶'
         }, {
            value: '选项3',
            label: '蚵仔煎'
         }, {
            value: '选项4',
            label: '龙须面'
         }, {
            value: '选项5',
            label: '北京烤鸭'
         }],
         value: ''
      }
   },
   created() {
      // this.formData.status = this.statusLists[0].id
   },
}
</script>

<style scoped>

</style>
