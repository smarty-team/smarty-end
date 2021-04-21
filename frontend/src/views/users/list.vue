<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="/users/create">
        <a-button type="primary">
          <template #icon>
            <PlusSquareOutlined />
          </template>
          创建用户
        </a-button>
      </router-link>
    </div>

    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="账户名" prop="name">
      </el-table-column>
      <el-table-column align="center" label="年龄" prop="age">
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <a @click="handleEdit(scope)">更新</a>
          <a @click="handleDelete(scope)">删除</a>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              更多
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { Message } from "element3";
import Pagination from "comps/Pagination.vue";
import { useList } from "./model/userModel";

export default {
  name: "UserList",
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表数据
    const router = useRouter();
    const { state, getList, delItem } = useList();

    // 用户更新
    function handleEdit({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id },
      });
    }

    // 删除玩家
    function handleDelete({ row }) {
      delItem(row.id).then(() => {
        // todo:删除这一行，或者重新获取数据
        // 通知用户
        Message.success("删除成功！");
      });
    }

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>
