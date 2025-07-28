import App from "./App.vue";
import { createApp } from "vue";
import setupAJAXMocker from "multi-mocker/ajax";

/**
 * ajax request demo 1
 */

/**
await setupAJAXMocker({
  useMock: true, //是否开启ajax使用mock数据
  config: {
    mockData: [
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
      {
        url: /mock-request-03/,
        type: "get",
        template: { data: "mock data 03", code: 203, state: "mock success 03" },
      },
      {
        url: /mock-request-04/,
        type: "delete",
        template: { data: "mock data 04", code: 200, state: "mock success 04" },
      },
    ],
  },
});
 */

/**
 * ajax request demo 2 【Recommended usage】
 */
await setupAJAXMocker({
  useMock: true,
  config: {
    mockData: () => import("./mock/ajax.js"),
  },
});
/**
 * ajax request demo 3 - disable ajax mock
 */
/*
await setupAJAXMocker({
  useMock: false, //关闭ajax mock, 此时mock不会拦截请求，直接发送请求到服务器，忽略ajaxOptions配置
  config: {
    mockData: () => import("./mock/ajax.js"),
  },
});
*/
const app = createApp(App);

app.mount("#app");
