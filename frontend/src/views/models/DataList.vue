<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div>
        DataList: { props.modelName }
        <div class="btn-container">
          <router-link to="/users/create">
            <el-button type="primary" plain size="small">
              创建用户
            </el-button>
          </router-link>
        </div>
      </div>
    )
  }
});
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>
