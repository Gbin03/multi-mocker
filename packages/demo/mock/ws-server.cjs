const WebSocket = require("ws");

const ws = new WebSocket.Server({ port: 3008 }, () => {
  console.log("WebSocket server is running on ws://localhost:3008");
});

ws.on("connection", (ws, req) => {
  console.log("connection");
  const clientPath = req.url;

  if (clientPath) {
    // if (clientPath === "/largemodel/asr-online-pythonws/stream/") {
    function getOfflineInfo() {
      const random = Math.random() > 0.3;
      return {
        text: random ? "你好~" : "临时转录结果",
        mode: random ? "2pass-offline" : "2pass-xxx",
      };
    }

    ws.on("message", (data) => {
      const content = data.toString();
      console.log("received data:", content);

      try {
        const data = JSON.parse(content);
        setInterval(() => {
          const info = getOfflineInfo();
          const response = {
            if_final: false,
            mode: info.mode,
            request_id: "ec21ec7a",
            text: info.text,
            time_global_end: 111,
            time_global_start: 222,
            wav_name: data.wav_name,
          };
          ws.send(JSON.stringify(response));
        }, 1000);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    });

    ws.on("close", (code, reason) => {
      console.log(`on close code: ${code}, reason: ${reason}`);
    });

    // 处理错误事件
    ws.on("error", () => {
      console.error("WebSocket error");
    });
  } else {
    ws.close(); // 关闭连接
  }
});
