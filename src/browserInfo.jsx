import React, { useEffect, useState } from "react";
import { getBrowserInfo } from "../utils/browserInfo";

const BrowserInfo = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getBrowserInfo().then(setInfo);
  }, []);

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
        {info.location ? (
          <>
            <li><strong>Latitude:</strong> {info.location.latitude}</li>
            <li><strong>Longitude:</strong> {info.location.longitude}</li>
            <li><strong>Accuracy:</strong> {info.location.accuracy} meters</li>
          </>
        ) : (
          <li><strong>Location Error:</strong> {info.locationError}</li>
        )}
      </ul>
    </div>
  );
};

export default BrowserInfo;