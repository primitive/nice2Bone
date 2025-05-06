import React from "react";
import Loader from "react-spinners/PacmanLoader";

const PreLoader = (props) => {
  return (
      <div className="d-inline-block py-3" style={{paddingRight: 50 + 'px' }}>
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
