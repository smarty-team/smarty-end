import { routes } from "../router";

export default {
  namespaced: true,
  state: {
    routes,
  },
  mutations: {
    addRoute(state, route) {
      state.routes.push(route);
    },
  },
};
