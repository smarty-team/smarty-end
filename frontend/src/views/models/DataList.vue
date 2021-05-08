<script lang="tsx">
import { defineComponent, PropType, reactive, nextTick, ref } from "vue";
import { Message, Msgbox } from 'element3'
import request from "../../utils/request";
import Pagination from "../../components/Pagination.vue";
import { Model } from '../../routes-model'

export default defineComponent({
  props: {
    model: {
      type: Object as PropType<Model>,
      required: true,
    },
  },
  components: {
    Pagination,
  },
  setup(props) {
    // 数据列表、分页信息等
    const state = reactive({
      schema: {},
      list: [],
      pagination: {
        total: 0,
        pageNo: 1,
        pageSize: 5,
      },
      loading: false,
    });
    // 数据模型
    const model = reactive({
      temp: {} as any // 临时数据模型，用于创建
    })
    // 获取meta
    request("/metadata/" + props.model.id).then((res) => {
      // res.data:
      // {
      //   name:'',
      //   schema:{
      //     avatar:{ default:'', name:'' },
      //     created:{ name:'' },
      //     mobile:{ name:'', required: true, unique:true }
      //   }
      // }
      state.schema = res.data.schema;
      resetTemp()
    });

    // 重置临时数据模型
    function resetTemp() {
      // 遍历schema，根据type和default确定临时数据模型的默认值
      Object.keys(state.schema).forEach(key => {
        const field = state.schema[key]
        if (field.default) {
          // 有默认值就用默认值
          model.temp[key] = field.default
        } else {
          // 没有默认值，根据type设置
          let val
          switch (field.type) {
            case "String":
              val = ''
              break;
            case "Number":
              val = 0
              break;
            case "Boolean":
              val = true
              break;
            case "Date":
              val = new Date()
              break;
            default:
              val = undefined
              break;
          }
          model.temp[key] = val
        }
      })
    }

    function getList() {
      request("/resource/" + props.model.id, {
        params: {
          pageNo: state.pagination.pageNo,
          pageSize: state.pagination.pageSize,
        },
      }).then((res) => {
        state.list = res.data.list;
        const { pagination } = res.data;
        state.pagination.pageNo = Number(pagination.pageNo);
        state.pagination.total = pagination.total;
        console.log(state.pagination);
        state.loading = false;
      });
    }

    // 获取数据
    state.loading = true;
    getList();

    // 创建数据项:
    // 对话框状态
    const dialog = reactive({
      title: "创建",
      visible: false,
      status: 'create'
    });

    // 表单
    const dataForm = ref(null)

    // 点击创建按钮
    function handleCreate() {
      resetTemp()
      dialog.visible = true
      dialog.status = 'create'
      nextTick(() => {
        dataForm.value.clearValidate()
      })
    }

    function handleUpdate(row) {
      console.log('handleupdate', row);
      model.temp = Object.assign({}, row) // copy obj
      dialog.visible = true
      dialog.status = 'update'
      nextTick(() => {
        dataForm.value.clearValidate()
      })
    }

    function handleDelete(row, index) {
      Msgbox
        .confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          deleteData(row, index)
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }

    // 创建项目
    function createData() {
      // 校验todo
      request({
        method: 'post',
        url: '/resource/' + props.model.id,
        data: model.temp
      }).then((res) => {
        if (res.data) {
          state.list.unshift(res.data)
          dialog.visible = false
          Message.success('恭喜，创建成功！')
        } else {
          Message.error('创建失败，请重试！')
        }
      })
    }
    // 更新项目
    function updateData() {
      request({
        method: 'put',
        url: '/resource/' + props.model.id + '/' + model.temp._id,
        data: model.temp
      }).then((res) => {
        if (res.data) {
          const index = state.list.findIndex(v => v._id === model.temp._id)
          state.list.splice(index, 1, model.temp)
          dialog.visible = false
          Message.success('恭喜，更新成功！')
        } else {
          Message.error('更新失败，请重试！')
        }
      })
    }
    // 删除项目
    function deleteData(row, index) {
      request({
        method: 'delete',
        url: '/resource/' + props.model.id + '/' + row._id,
        data: model.temp
      }).then((res) => {
        if (res.data) {
          state.list.splice(index, 1)
          dialog.visible = false
          Message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          Message.error('更新失败，请重试！')
        }
      })
    }

    return () => {
      const columns = [], items = [];
      const keys = Object.keys(state.schema)
      keys.forEach((key, index) => {
        // model meta
        const { description, type } = state.schema[key];

        // 构建数据列
        const column = <el-table-column label={description} prop={key}></el-table-column>
        columns.push(column)

        // 构建操作按钮
        if (index === keys.length - 1) {
          columns.push(
            <el-table-column label={description} v-slots={{default: ({row, index_}) => (
              <>
                <el-button
                  type="primary" size="mini"
                  onClick={() => handleUpdate(row)}>
                  更新
                </el-button>
                <el-button
                  size="mini" type="danger"
                  onClick={() => handleDelete(row, index_)}>
                  删除
                </el-button>
              </>
            )}}></el-table-column>
          )
        }

        // 构建formItems
        let item = null
        // 类型不同对应不同表单项
        if (type === 'String') {
          item = (
            <el-form-item label={description} prop={key}>
              <el-input
                v-model={model.temp[key]}
                placeholder={description}/>
            </el-form-item>
          )
        }
        items.push(item)
      });
      // 操作按钮
      const slots = {
        footer: () => (
          <div class="dialog-footer">
            <el-button onClick={ () => dialog.visible = false }>
              取消
            </el-button>
            <el-button type="primary"
              onClick={ dialog.status === 'create' ? createData : updateData}>
              确定
            </el-button>
          </div>
        )
      }
      return (
        <>
          <div>DataList: {props.model.description}</div>
          <div class="btn-container">
            <el-button type="primary" plain size="small" onClick={handleCreate}>
              创建用户
            </el-button>
          </div>
          <el-table
            v-loading={state.loading}
            data={state.list}
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            {columns}
          </el-table>
          <pagination
            v-show={state.pagination.total > 0}
            total={state.pagination.total}
            v-models={[
              [state.pagination.pageNo, "page"],
              [state.pagination.pageSize, "limit"],
            ]}
            onPagination={getList}
          ></pagination>
          <el-dialog
            title={dialog.title}
            width="50%"
            visible={dialog.visible}
            onUpdate:visible={v => dialog.visible = v}
            v-slots={slots}
          >
            <el-form ref={dataForm}>
              {items}
            </el-form>
          </el-dialog>
        </>
      );
    };
  },
});
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>
