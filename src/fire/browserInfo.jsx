import React, { useEffect, useState } from "react";

const getBasicBrowserInfo = () => {
  const touchSupport =
    "ontouchstart" in window ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

  const cookieCount = document.cookie ? document.cookie.split(";").length : 0;

  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cookiesEnabled: navigator.cookieEnabled,
    cookieCount,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,
    browserWidth: window.innerWidth,
    browserHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
    online: navigator.onLine,
    memory: navigator.deviceMemory || "Unknown",
    cpuCores: navigator.hardwareConcurrency || "Unknown",
    touchSupport,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

const getCacheSize = async () => {
  if (!("caches" in window)) return "Unsupported";

  const cacheNames = await caches.keys();
  let totalBytes = 0;

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response && response.body) {
        const reader = response.body.getReader();
        const { value } = await reader.read();
        totalBytes += value ? value.length : 0;
      }
    }
  }

  return (totalBytes / 1024).toFixed(2) + " KB";
};

const getLocationInfo = () =>
  new Promise((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve({ error: "Geolocation not supported." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      (err) => resolve({ error: err.message })
    );
  });

  async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
  


const BrowserInfo = () => {
  const [info, setInfo] = useState(null);
  const [cacheSize, setCacheSize] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    setInfo(getBasicBrowserInfo());
    getCacheSize().then(setCacheSize);
  }, []);

  function getWebGLInfo() {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      return {
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
      };
    } catch {
      return null;
    }
  }
  
  async function getAudioFingerprint() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const compressor = ctx.createDynamicsCompressor();
      oscillator.type = "triangle";
      oscillator.frequency.value = 10000;
  
      oscillator.connect(compressor);
      compressor.connect(ctx.destination);
      oscillator.start(0);
  
      const fingerprint = oscillator.type + compressor.attack.value;
      oscillator.disconnect();
      compressor.disconnect();
      return await hashString(fingerprint);
    } catch {
      return null;
    }
  }
  
  function getCanvasFingerprint() {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillText("🕵️‍♂️ Browser Fingerprint", 2, 2);
      return hashString(canvas.toDataURL());
    } catch {
      return null;
    }
  }
  

  const handleShowLocation = async () => {
    setShowLocation(true);
    setLoadingLocation(true);
    const loc = await getLocationInfo();
    setLocation(loc);
    setLoadingLocation(false);
  };

  const [advanced, setAdvanced] = useState(false);
  const [webgl, setWebgl] = useState(null);
  const [audioHash, setAudioHash] = useState(null);
  const [canvasHash, setCanvasHash] = useState(null);

  const handleShowAdvanced = async () => {
    setAdvanced(true);
    setWebgl(getWebGLInfo());
    setAudioHash(await getAudioFingerprint());
    setCanvasHash(await getCanvasFingerprint());
  };

  if (!info) return null;

  return (
    <div className="mt-4">
      <h5>Browser Info</h5>
      <ul className="list-unstyled small">
        <li><strong>User Agent:</strong> {info.userAgent}</li>
        <li><strong>Language:</strong> {info.language}</li>
        <li><strong>Platform:</strong> {info.platform}</li>
        <li><strong>Timezone:</strong> {info.timezone}</li>
        <li><strong>Online:</strong> {info.online ? "Yes" : "No"}</li>
        <li><strong>Cookies Enabled:</strong> {info.cookiesEnabled ? "Yes" : "No"}</li>
        <li><strong>Cookies Stored:</strong> {info.cookieCount}</li>
        <li><strong>Screen:</strong> {info.screenWidth} x {info.screenHeight} ({info.colorDepth}-bit)</li>
        <li><strong>Browser Window:</strong> {info.browserWidth} x {info.browserHeight}</li>
        <li><strong>Pixel Ratio:</strong> {info.pixelRatio}</li>
        <li><strong>Touch Support:</strong> {info.touchSupport ? "Yes" : "No"}</li>
        <li><strong>CPU Cores:</strong> {info.cpuCores}</li>
        <li><strong>Device Memory:</strong> {info.memory} GB</li>
        <li><strong>Cache Size:</strong> {cacheSize || "Calculating..."}</li>
      </ul>

      <div
      className="d-block my-4"
      >
      <h5>Location Info</h5>
      {!showLocation ? (
          <button
          onClick={handleShowLocation}
          className="btn btn-outline-secondary btn-sm"
        >
          Request Location Info
        </button>
      ) : loadingLocation ? (
        <p className="small">Requesting location…</p>
      ) : location ? (
        <ul className="list-unstyled small mt-2">
          {location.error ? (
            <li><strong>Location Error:</strong> {location.error}</li>
          ) : (
            <>
              <li><strong>Latitude:</strong> {location.latitude}</li>
              <li><strong>Longitude:</strong> {location.longitude}</li>
              <li><strong>Accuracy:</strong> {location.accuracy} meters</li>
            </>
          )}
        </ul>
      ) : null}
      </div>

      <h5>Advanced Browser Info</h5>
      {!advanced ? (
        <button
          onClick={handleShowAdvanced}
          className="btn btn-outline-secondary btn-sm mt-2"
        >
          Run Fingerprinting
        </button>
      ) : (
        <ul className="list-unstyled small mt-2">
          <li><strong>WebGL Vendor:</strong> {webgl?.vendor || "Unavailable"}</li>
          <li><strong>WebGL Renderer:</strong> {webgl?.renderer || "Unavailable"}</li>
          <li><strong>AudioContext Hash:</strong> {audioHash || "Unavailable"}</li>
          <li><strong>Canvas Fingerprint:</strong> {canvasHash || "Unavailable"}</li>
        </ul>
      )}

    </div>
  );
};

export default BrowserInfo;
