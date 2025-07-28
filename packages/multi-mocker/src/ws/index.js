import { singleton, isObject } from "../utils";
import { normalizePath } from "vite";
import { resolve, normalize, isAbsolute } from "path";
import { existsSync, lstatSync, realpathSync } from "fs";
import { spawn } from "child_process";

class WsMocker {
  constructor(options, pluginConfig) {
    const { useMock = false, config } = options;
    this.config = config || {};
    this.pluginConfig = pluginConfig || {};
    this.useMock = !!useMock;
    this.scriptProcess = null;
  }

  async setupWsServer() {
    if (!this.useMock) {
      return;
    }
    const { serverPath } = this.config;

    const projectRoot = normalizePath(this.pluginConfig.root || process.cwd());

    const scriptPath = isAbsolute(serverPath)
      ? normalize(serverPath)
      : normalize(resolve(projectRoot, serverPath));

    if (!existsSync(scriptPath)) {
      throw new Error(`[multi-mocker] WS serverPath not exit: ${scriptPath}`);
    }
    if (!lstatSync(scriptPath).isFile()) {
      throw new Error(
        `[multi-mocker] WS serverPath is not file: ${scriptPath}`
      );
    }
    const realScriptPath = normalizePath(realpathSync(scriptPath));

    console.log(`[multi-mocker] WS realScriptPath: ${realScriptPath}`);
    this.scriptProcess = spawn("node", [realScriptPath], {
      env: { ...process.env, NODE_ENV: "development" },
      stdio: "pipe",
      cwd: projectRoot,
    });

    this.scriptProcess.stdout.on("data", (data) => {
      console.log(`[multi-mocker] WS script stdout: ${data}`);
    });

    this.scriptProcess.stderr.on("data", (data) => {
      console.warn(`[multi-mocker] WS script stderr: ${data}`);
    });

    this.scriptProcess.on("error", (err) => {
      console.error(`[multi-mocker] WS script error: ${err.message}`);
      throw new Error(`[multi-mocker] WS script error: ${err.message}`);
    });

    //处理脚本异常退出
    this.scriptProcess.on("exit", (code) => {
      if (code !== 0 && code !== null) {
        console.warn(
          `[multi-mocker] WS script exited with error! code:${code}`
        );
      } else {
        console.log(`[multi-mocker] WS script exited with code:${code}`);
      }
    });
  }

  async onCloseBundle(keepAlive) {
    if (this.scriptProcess) {
      if (keepAlive) {
        // 保留脚本运行
        console.log(`[multi-mocker] WS script PID: ${this.scriptProcess.pid}`);
      } else {
        this.scriptProcess.kill("SIGINT");
        console.log(
          `[multi-mocker] closeBundle hook: WS script terminated (PID: ${this.scriptProcess.pid})`
        );
      }
    }
  }

  configureServerCb(server) {
    server.httpServer.on("close", () => {
      if (this.scriptProcess) {
        this.scriptProcess.kill("SIGINT");
        console.log(
          "[multi-mocker] configureServer hook: dev server is closed, WS script terminated"
        );
      }
    });
  }
  getProxy() {
    const { proxy } = this.config;
    if (this.useMock && isObject(proxy)) {
      return proxy;
    }
    return {};
  }
}

const WsMockerSingleton = singleton(WsMocker);

function createWsMocker(options, pluginConfig) {
  return new WsMockerSingleton(options, pluginConfig);
}

export default createWsMocker;
