import createSseMocker from "./sse/index.js";
import createWsMocker from "./ws/index.js";
import { singleton } from "./utils";
class Mocker {
  constructor(options = {}, config) {
    Mocker._sseMockerInst = this.setupSSEMocker(options, config);
    Mocker._wsMockerInst = this.setupWSMocker(options, config);
  }

  static _sseMockerInst = null;
  static _wsMockerInst = null;
  setupSSEMocker(options, pluginConfig) {
    const { sse = {} } = options;
    const { useMock = false, config = {} } = sse;
    const sseMk = createSseMocker(
      {
        useMock,
        config,
      },
      pluginConfig
    );
    return sseMk;
  }

  setupWSMocker(options = {}, pluginConfig) {
    const { ws = {} } = options;
    const { useMock = false, config = {} } = ws;
    const wsMocker = createWsMocker(
      {
        useMock,
        config,
      },
      pluginConfig
    );
    return wsMocker;
  }

  static getSSEMocker() {
    if (!Mocker._sseMockerInst) {
      console.warn(
        "[multi-mocker] SSEMocker is not created!, please call createMocker first."
      );
      return null;
    }
    return Mocker._sseMockerInst;
  }

  static getWSMocker() {
    if (!Mocker._wsMockerInst) {
      console.warn(
        "[multi-mocker] WSMocker is not created!, please call createMocker first."
      );
      return null;
    }
    return Mocker._wsMockerInst;
  }
}

const MockerSingleton = singleton(Mocker);

function createMocker(options, pluginConfig) {
  return new MockerSingleton(options, pluginConfig);
}

const getSSEMocker = Mocker.getSSEMocker;
const getWSMocker = Mocker.getWSMocker;
export { getSSEMocker, getWSMocker };
export default createMocker;
