import React from "react";
import { Rings as Loader } from "react-loader-spinner";
// import { Dna as Loader } from "react-loader-spinner";
// see: https://mhnpd.github.io/react-loader-spinner/

const PreLoader = () => {
   return (
     <Loader
       type="Puff"
       color="#00BFFF"
       height="100"	
       width="100"
       wrapperClass="justify-content-center"
     />
   );
 };
 
 export default PreLoader;