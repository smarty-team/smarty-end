module.exports = [
  {
    url: "/api/models/list",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: ['user', 'role'],
      };
    },
  },
];