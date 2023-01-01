import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

// tbc props availabitity: https://stackoverflow.com/questions/72735944/is-there-an-alternative-of-withrouter-from-react-router

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
export default withRouter;