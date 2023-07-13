import React from "react";
import { Rings as Loader } from "react-loader-spinner";
// import { Dna as Loader } from "react-loader-spinner";
// see: https://mhnpd.github.io/react-loader-spinner/

const PreLoader = (props) => {
   return (
     <Loader
       color={props.color || "slategray"}
       height={props.height || "100"}
       width={props.width || "100"}
       wrapperClass="justify-content-center"
     />
   );
 };
 
 export default PreLoader;