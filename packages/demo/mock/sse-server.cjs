const express = require("express");
const mockDataStr = require("./sse-dataset/01/sse-data.cjs");
const app = express();
const sseMockTime = 100;

function getSSEData() {
  const tempStr = mockDataStr
    .match(/(data:|event:).*?(?=data:|event:|$)/gs)
    .filter((str) => str.trim() !== "")
    .map((str) => str.trim());

  const allData = [];
  let iterData = {};
  for (const item of tempStr) {
    if (item.startsWith("data:")) {
      iterData.data = item + "\n";
    } else if (item.startsWith("event:")) {
      iterData.type = item + `\n\n`;
      allData.push(iterData);
      iterData = {};
    }
  }
  return allData;
}

const SSE_RESPONSE_HEADER = {
  Connection: "keep-alive",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

app.post("/sse-test/api/mock-request-chat", async function (req, res) {
  console.log("sse request received");
  res.writeHead(200, SSE_RESPONSE_HEADER);
  const prepareData = getSSEData();
  let iterIndex = 0;

  const runFun = function () {
    if (iterIndex < prepareData.length) {
      res.write(prepareData[iterIndex].data);
      res.write(prepareData[iterIndex].type);
      iterIndex++;
    }
  };

  let intervalId = setInterval(runFun, sseMockTime);

  req.on("close", function () {
    console.log("*** Close ***");
    clearInterval(intervalId);
  });
  req.on("end", function () {
    console.log("*** End ***");
  });
});

app.listen(3005, function () {
  console.log("SSE mock server listening on port 3005!");
});
