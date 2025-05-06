import React from "react";
import Loader from "react-spinners/PacmanLoader";

const PreLoader = (props) => {
  return (
      <div className="justify-content-center">
        <Loader
          color={props.color || "darkslategray"}
          size={props.size || 25}
          loading={props.loading || true}
          //wrapperClass="justify-content-center"
        />
      </div>
  );
};

export default PreLoader;
