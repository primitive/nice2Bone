import React, { useEffect, useState } from "react";

const getBasicBrowserInfo = () => ({
  userAgent: navigator.userAgent,
  language: navigator.language,
  platform: navigator.platform,
  cookiesEnabled: navigator.cookieEnabled,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  colorDepth: window.screen.colorDepth,
  browserWidth: window.innerWidth,
  browserHeight: window.innerHeight,
});


// const getLocationInfo = () =>
//   new Promise((resolve) => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) =>
//           resolve({
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//             accuracy: pos.coords.accuracy,
//           }),
//         (err) => resolve({ error: err.message })
//       );
//     } else {
//       resolve({ error: "Geolocation not supported." });
//     }
//   });



const getLocationInfo = () =>
  new Promise((resolve) => {
    console.log("[Geo] Attempting to get location...");
    if (!("geolocation" in navigator)) {
      console.warn("[Geo] Not supported");
      resolve({ error: "Geolocation not supported." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        console.log("[Geo] Success:", coords);
        resolve(coords);
      },
      (err) => {
        console.error("[Geo] Error:", err.message);
        resolve({ error: err.message });
      }
    );
  });


const BrowserInfo = () => {
  const [info, setInfo] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    setInfo(getBasicBrowserInfo());
  }, []);

  const handleShowLocation = async () => {
    setShowLocation(true);
    setLoadingLocation(true);
    console.log("[Geo] Button clicked");
    const loc = await getLocationInfo();
    console.log("[Geo] Setting location:", loc);
    setLocation(loc);
    setLoadingLocation(false);
  };

  if (!info) return null;

  return (
    <div className="mt-4">
      <h5>Browser Info</h5>
      <ul className="list-unstyled small">
        <li><strong>User Agent:</strong> {info.userAgent}</li>
        <li><strong>Language:</strong> {info.language}</li>
        <li><strong>Platform:</strong> {info.platform}</li>
        <li><strong>Cookies Enabled:</strong> {info.cookiesEnabled ? "Yes" : "No"}</li>
        <li><strong>Screen:</strong> {info.screenWidth} x {info.screenHeight} ({info.colorDepth}-bit)</li>
        <li><strong>Browser Window:</strong> {info.browserWidth} x {info.browserHeight}</li>
      </ul>

      {!showLocation ? (
        <button
          onClick={handleShowLocation}
          className="btn btn-outline-secondary btn-sm"
        >
          Show Location Info
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
  );
};

export default BrowserInfo;
