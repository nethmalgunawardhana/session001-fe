import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as routes from "../constants/routes";
import { Lazy } from "../components/base";
import { AppLayout } from "layouts";
import routeItems from "./routes";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export const ClientRouter: React.FC = () => {
  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to={routes.LOGIN} replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LOGIN} element={<Lazy page="Login" />} />
        <Route path="/register" element={<Lazy page="Register" />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {routeItems.map((route, key) => {
            // Add role/permission checks here if needed
            return (
              <Route
                path={route?.path}
                index
                key={key}
                element={route?.component ? <Lazy page={route.component} /> : null}
              />
            );
          })}
        </Route>
        <Route path="*" element={<Navigate to={routes.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
