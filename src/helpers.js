export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const handleBeforeUnload = () => {
  window.scrollTo(0, 0);
  console.log("before unload");
};

/*
  export function convertUnicode(input) {
    return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
      var charcode = parseInt(b,16);
      return String.fromCharCode(charcode);
    });
  }
*/

export const displayBrowserInfo = () => {
  // Browser information
  console.log('Browser Information:');
  console.log('---------------------');
  console.log('User Agent: ' + navigator.userAgent);
  console.log('Language: ' + navigator.language);
  console.log('Platform: ' + navigator.platform);
  console.log('Cookies Enabled: ' + navigator.cookieEnabled);

  // Location information
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('Location Information:');
      console.log('---------------------');
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
      console.log('Accuracy: ' + position.coords.accuracy + ' meters');
    }, function(error) {
      console.log('Error getting location: ' + error.message);
    });
  } else {
    console.log('Geolocation is not supported in this browser.');
  }

  // User information
  console.log('User Information:');
  console.log('---------------------');
  console.log('Screen Width: ' + window.screen.width);
  console.log('Screen Height: ' + window.screen.height);
  console.log('Color Depth: ' + window.screen.colorDepth);
  console.log('Browser Width: ' + window.innerWidth);
  console.log('Browser Height: ' + window.innerHeight);
}

// Call the function to display the information
//displayBrowserInfo();

/*
  Logs the browser information such as the user agent, language, platform, and cookie status.
  It also retrieves the location information if the browser supports geolocation.
  Finally, it logs the user information, including the screen width, screen height, color depth, and browser window size.
  The availability and accuracy of location information may vary depending on the user's device, browser settings, and network conditions.
*/