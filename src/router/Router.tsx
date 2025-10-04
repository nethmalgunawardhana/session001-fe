import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import * as routes from "../constants/routes";
import { Lazy } from "../components/base";
import { AppLayout } from "layouts";
import routeItems from "./routes";
import { isAuthenticated } from "store/auth/selector";

export const ClientRouter: React.FC = () => {
  const isAuthorized = useSelector(isAuthenticated);

  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (!isAuthorized) {
      return <Navigate to={routes.LOGIN} replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LOGIN} element={<Lazy page="Login" />} />
        <Route path={routes.REGISTER} element={<Lazy page="Register" />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {routeItems.map((route, key) => {
            const isPermission = true; // You can add permission checking here later

            return (
              <Route
                path={route?.path}
                index
                key={key}
                element={
                  isPermission ? (
                    route?.component ? (
                      <Lazy page={route.component} />
                    ) : null
                  ) : (
                    <Lazy page="UnAuthorized" />
                  )
                }
              />
            );
          })}
        </Route>
        <Route path="*" element={<Lazy page="NotFound" />} />
      </Routes>
    </BrowserRouter>
  );
};
