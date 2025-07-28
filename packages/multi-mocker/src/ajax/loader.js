import Mock from "mockjs";

function load(options) {
  const timeout = options.timeout || 50;
  const mockData = options.mockData;
  Mock.setup({ timeout });

  mockData.forEach((item) => {
    Mock.mock(item.url, item.type, item.template);
  });
}

export { load };
