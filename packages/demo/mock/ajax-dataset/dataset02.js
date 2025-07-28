export default [
  {
    url: /ajax-test\/api\/mock-request-03/,
    type: "get", //get请求可省略type配置
    template: { data: "mock data 03", code: 200, state: "mock success 03" },
  },
  {
    url: /ajax-test\/api\/mock-request-04/,
    type: "delete",
    template: { data: "mock data 04", code: 201, state: "mock failed 04" },
  },
];
