<template>
  <div class="app">
    <div>Demo</div>
    <div class="btns">
      <button @click="ajaxRequest()">AJAX TEST</button>
      <button @click="wsRequest()">WS TEST</button>
      <button @click="sseRequest()">SSE TEST</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";
function sseRequest() {
  const params = {
    id: "01",
    data: "sse data 01",
  };
  fetchEventSource("/sse-test/api/mock-request-chat", {
    method: "POST",
    heartbeatTimeout: 60 * 60 * 1000,
    openWhenHidden: true,
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",
    },
    body: JSON.stringify(params),
    onopen(event) {
      console.log("sse onclose event:", event);
    },
    onerror(error) {
      console.log("sse onclose error:", error);
    },
    onclose(event) {
      console.log("sse onclose event:", event);
    },
    onmessage(event) {
      console.log("sse onmessage event:", event);
    },
  });
}
function wsRequest() {
  const host = location.host;
  const wsUrl = `ws://${host}/ws-test/api/mock-request-01`;
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => {
    console.log(`ws onpen 01`);
    ws.send(
      JSON.stringify({
        from: "client",
        id: "01",
        data: "ws open 01",
        wav_name: "wav01",
      })
    );
  };

  ws.onmessage = (event) => {
    console.log(`ws onmessage 01:`, event.data);
  };

  ws.onerror = (error) => {
    console.log(`ws onerror 01:`, error);
  };

  ws.onclose = () => {
    console.log(`ws onclose 01`);
  };
}
function ajaxRequest() {
  axios
    .get("/ajax-test/api/mock-request-01")
    .then((response) => {
      console.log("mock-request-01-response:", response.data);
    })
    .catch((error) => {
      console.error("mock-request-01-error:", error);
    });

  axios
    .post("/ajax-test/api/mock-request-02")
    .then((response) => {
      console.log("mock-request-02-response:", response.data);
    })
    .catch((error) => {
      console.error("mock-request-02-error:", error);
    });

  axios
    .get("/ajax-test/api/mock-request-03")
    .then((response) => {
      console.log("mock-request-03-response:", response.data);
    })
    .catch((error) => {
      console.error("mock-request-03-error:", error);
    });

  axios
    .delete("/ajax-test/api/mock-request-04")
    .then((response) => {
      console.log("mock-request-04-response:", response.data);
    })
    .catch((error) => {
      console.error("mock-request-04-error:", error);
    });
}
</script>
<style scoped>
.btns {
  margin: 20px;
  display: flex;
}
button {
  margin: 0 10px;
}
</style>
