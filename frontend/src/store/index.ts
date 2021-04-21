import { createStore } from "vuex";
import routes from "./routes";

const store = createStore({
  modules: {
    routes,
  },
});

export default store;
