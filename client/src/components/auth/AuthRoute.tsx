import { useState } from "react";
import { getLoginCookie } from "../../utils/cookie";
import LoginLogout from "./LoginLogout";
import AdminDashboard from "./AdminDashboard";

interface AuthRouteProps {
  gatedContent: React.ReactNode;
}

function AuthRoute(props: AuthRouteProps) {
  const [loggedIn, setLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  return (
    <>
      <LoginLogout loggedIn={loggedIn} setLogin={setLogin} isAdmin={isAdmin} setAdmin={setAdmin} />

      {loggedIn ? (
        isAdmin ? (
          <AdminDashboard /> 
        ) : (
          <>{props.gatedContent}</> 
        )
      ) : null}
    </>
  );
}

export default AuthRoute;
