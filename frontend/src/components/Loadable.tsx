import React, { ComponentType, Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
const Loadable = <T extends object>(
  Component: React.LazyExoticComponent<ComponentType<T>>
) => {
  const WrappedComponent = (props: T) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

  return WrappedComponent;
};

export default Loadable;
