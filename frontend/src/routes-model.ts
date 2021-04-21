import Layout from "layouts/index.vue";
import axios from "./utils/request";
import store from "./store";
import router from "./router";

axios.get("/models/list").then((res) => {
  // 模型列表路由定义
  const modelListRoute = {
    path: "/models",
    component: Layout,
    meta: { title: "模型定义" },
    name: "modelsDef",
    children: res.data.map((model: string) => ({
      path: model,
      props: { modelName: model },
      component: () => import("views/models/ModelEdit.vue"),
      meta: { title: model },
    })),
  };
  router.addRoute(modelListRoute);
  store.commit("routes/addRoute", modelListRoute);

  // 模型数据管理路由定义
  const dataListRoute = {
    path: "/list",
    component: Layout,
    meta: { title: "数据管理" },
    name: "dataMgt",
    children: res.data.map((model: string) => ({
      path: model,
      props: { modelName: model },
      component: () => import("views/models/DataList.vue"),
      meta: { title: model },
    })),
  };
  router.addRoute(dataListRoute);
  store.commit("routes/addRoute", dataListRoute);
});
