<template>
  <div class="box">
    <el-button>新增模型</el-button>
    <!-- 模型列表 -->
    <div class="model-list">
      <div class="model" v-for="model in state.models" :key="model.id">
        <span style="float: left">{{ model.description }}</span>
        <span style="float: left; padding-left: 10px">{{ model.id }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
        <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from "../../utils/request";
import { reactive } from "vue";

const state = reactive({
  models: [],
});

// 获取模型列表
request("/metadata").then((res) => {
  state.models = res.data;
});
</script>

<style scoped>
.box {
  text-align: left;
  padding: 10px;
}
.model {
  border: 1px solid #ccc;
  overflow: hidden;
  margin: 10px 0;
  padding: 10px 15px;
}
</style>
