export default [
  {
    url: /ajax-test\/api\/mock-request-01/,
    type: "get", //get请求可省略type配置
    template: { data: "mock data 01", code: 200, state: "mock success 01" },
  },
  {
    url: /ajax-test\/api\/mock-request-02/,
    type: "post",
    template: { data: "mock data 02", code: 201, state: "mock failed 02" },
  },
];
