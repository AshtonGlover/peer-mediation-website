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

  // SKIP THE LOGIN BUTTON IF YOU HAVE ALREADY LOGGED IN.
  if (!loggedIn && getLoginCookie() !== undefined) {
    setLogin(true);
  }

  return (
    <>
      <LoginLogout loggedIn={loggedIn} setLogin={setLogin} isAdmin={isAdmin} setAdmin={setAdmin} />

      {loggedIn ? (
        isAdmin ? (
          <AdminDashboard />  // Render admin component if user is an admin
        ) : (
          <>{props.gatedContent}</>  // Render gated content for non-admin users
        )
      ) : null}
    </>
  );
}

export default AuthRoute;
