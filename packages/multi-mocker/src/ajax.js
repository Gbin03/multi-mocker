import createAjaxMocker from "./ajax/index.js";
function setupAJAXMocker(options = {}) {
  const { useMock = false, config = {} } = options;
  if (!useMock) {
    return;
  }
  const ajaxMocker = createAjaxMocker({
    useMock,
    config,
  });
  ajaxMocker.loadAjaxMock();
}
export default setupAJAXMocker;
