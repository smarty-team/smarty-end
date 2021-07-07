<template>
  <div>
    <div>{{ model.description }} {{ model.id }}</div>

    <el-button>添加字段</el-button>

    <!-- 字段列表 -->
    <el-dialog width="50%" :title="dialog.title" :visible.sync="dialog.visible">
      <template>
        <!-- 模型表单 -->
        <el-form>
          <el-form-item label="" form-item></el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="dialog.visible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialog.status === 'create' ? createData : updateData"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { PropType } from "vue";
import type { Model } from "../../types";

defineProps({
  model: {
    type: Object as PropType<Model>,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
