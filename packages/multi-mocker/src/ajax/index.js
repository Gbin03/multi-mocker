// import env from "../utils/env";
import { isObject } from "../utils";

class AjaxMocker {
  constructor(options) {
    const { useMock = false, config } = options;
    this.config = config || { mockData: [] };
    this.useMock = !!useMock;
  }

  static _inst = null;

  static getInstance(options) {
    if (!AjaxMocker._inst) {
      AjaxMocker._inst = new AjaxMocker(options);
    }
    return AjaxMocker._inst;
  }
  check(data) {
    if (!Array.isArray(data)) {
      throw new Error("[multi-mocker] AJAX mockData must be an array");
    }
    data.forEach((item) => {
      if (!isObject(item)) {
        throw new Error("[multi-mocker] AJAX mockData[i] must be an object");
      }
      if (
        !item.url ||
        !(item.url instanceof RegExp || typeof item.url === "string")
      ) {
        throw new Error(
          "[multi-mocker] AJAX mockData[i].url must be a url string or RegExp"
        );
      }
      if (!item.type) {
        item.type = "get";
      }
      if (
        typeof item.type !== "string" ||
        !["get", "post", "put", "delete"].includes(item.type.toLowerCase())
      ) {
        throw new Error(
          "[multi-mocker] AJAX mockData[i].type must be valid request method"
        );
      }
      if (
        typeof item.template !== "object" &&
        typeof item.template !== "function"
      ) {
        throw new Error(
          "[multi-mocker] AJAX mockData[i].template must be a object or function"
        );
      }
    });
  }

  async loadAjaxMock() {
    if (this.useMock) {
      let options = { ...this.config };
      if (typeof options.mockData === "function") {
        const res = await options.mockData();
        if (typeof res === "object" && res?.default) {
          options.mockData = res.default;
        } else {
          options.mockData = res;
        }
      }
      this.check(options.mockData);
      const module = await import("./loader.js");
      module.load(options);
      console.info("[multi-mocker] AJAX mock is enabled!");
    } else {
      console.info("[multi-mocker] AJAX mock is disabled!");
    }
  }
}

function createAjaxMocker(options) {
  return AjaxMocker.getInstance(options);
}

export default createAjaxMocker;
