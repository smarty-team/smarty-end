import Layout from "layouts/index.vue";
import axios from "./utils/request";
import store from "./store";
import router from "./router";

export interface Model {
  id: string;
  description: string;
}

axios.get("/metadata").then((res) => {
  // 模型列表路由定义
  const modelListRoute = {
    path: "/models",
    component: Layout,
    meta: { title: "模型定义" },
    alwaysShow: true,
    name: "modelsDef",
    children: res.data.map((model: Model) => ({
      path: model.id,
      props: { model },
      component: () => import("views/models/ModelEdit.vue"),
      meta: { title: model.description },
    })),
  };
  router.addRoute(modelListRoute);
  store.commit("routes/addRoute", modelListRoute);

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
