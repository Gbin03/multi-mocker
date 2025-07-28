function isViteDev() {
  try {
    if (typeof import.meta !== "undefined") {
      return import.meta.env.DEV;
    }
    return false;
  } catch (e) {}
  return false;
}

function isNodeDev() {
  const isDev =
    typeof process !== "undefined" && process.env?.NODE_ENV === "development";
  return !!isDev;
}

// const defineDev = typeof __DEV__ !== "undefined" && __DEV__;

const isDevelopment =
  isViteDev() || // Vite
  isNodeDev() || // Webpack
  // !!defineDev || //global
  false;

const env = {
  DEV: isDevelopment,
  PROD: !isDevelopment,
};

export default env;
