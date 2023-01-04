import React from "react";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

// tbc props availabitity: https://stackoverflow.com/questions/72735944/is-there-an-alternative-of-withrouter-from-react-router

const withRouter = WrappedComponent => props => {

    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

  console.log(location, navigate, params );

    return (
      <WrappedComponent
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }
  export default withRouter;