import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as routes from "../constants/routes";
import { Lazy } from "../components/base";
import { AppLayout } from "layouts";
import routeItems from "./routes";

export const ClientRouter: React.FC = () => {
  // Authentication bypassed - always authorized for dashboard access
  const isAuthorized = true;

  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    // Always allow access since we're bypassing authentication
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect login to dashboard */}
        <Route path={routes.LOGIN} element={<Navigate to={routes.DASHBOARD} replace />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {routeItems.map((route, key) => {
            const isPermission = true;

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
        {/* Redirect any unknown routes to dashboard */}
        <Route path="*" element={<Navigate to={routes.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
