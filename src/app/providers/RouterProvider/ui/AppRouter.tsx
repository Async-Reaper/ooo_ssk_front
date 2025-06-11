import { memo, Suspense, useCallback } from "react";
import { AppRoutesProps } from "@shared/types/router";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "@shared/ui";
import { routeConfig } from "../config/configRouter";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={element}
        // element={route.authOnly
        //   ? <NoAuth>{element}</NoAuth>
        //   : element}
      />
    );
  }, []);

  return (
    <Routes>
      {
        Object.values(routeConfig).map(renderWithWrapper)
      }
    </Routes>
  );
};

export default memo(AppRouter);
