import React from "react";
import BrowserInfo from "./browserInfo";


const smartTagComponents = {
  browserInfo: () => <BrowserInfo />,
  // Add more: tagName: () => <Component />
};

export function processSmartTags(html) {
  const parts = [];
  let remaining = html;

  while (remaining.includes("[[")) {
    const startIndex = remaining.indexOf("[[");
    const endIndex = remaining.indexOf("]]", startIndex);

    if (startIndex === -1 || endIndex === -1) break;

    const before = remaining.slice(0, startIndex);
    const tagContent = remaining.slice(startIndex + 2, endIndex).trim();
    const after = remaining.slice(endIndex + 2);

    // Push the HTML before the tag
    if (before) {
      parts.push(
        <span
          key={parts.length + "-text"}
          dangerouslySetInnerHTML={{ __html: before }}
        />
      );
    }

    // Handle the smart tag component
    const tagName = tagContent.split(/\s+/)[0]; // In case props later
    if (smartTagComponents[tagName]) {
      parts.push(
        <React.Fragment key={parts.length + "-comp"}>
          {smartTagComponents[tagName]()}
        </React.Fragment>
      );
    } else {
      parts.push(
        <span key={parts.length + "-unknown"}>[Unknown tag: {tagName}]</span>
      );
    }

    // Update the remaining HTML
    remaining = after;
  }

  // Push the final bit of HTML
  if (remaining) {
    parts.push(
      <span
        key={parts.length + "-final"}
        dangerouslySetInnerHTML={{ __html: remaining }}
      />
    );
  }

  return parts;
}
