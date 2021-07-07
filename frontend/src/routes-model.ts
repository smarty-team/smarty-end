import Layout from "layouts/index.vue";
import axios from "./utils/request";
import store from "./store";
import router from "./router";

axios.get("/metadata").then((res) => {
  // 模型数据管理路由定义
  const dataListRoute = {
    path: "/list",
    component: Layout,
    meta: { title: "数据管理" },
    alwaysShow: true,
    name: "dataMgt",
    children: res.data.map((model: Model) => ({
      path: model.id,
      props: { model },
      component: () => import("views/models/DataList.vue"),
      meta: { title: model.description },
    })),
  };
  router.addRoute(dataListRoute);
  store.commit("routes/addRoute", dataListRoute);
});
