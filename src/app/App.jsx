import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import "../styles/index.scss";
import FullPageLoader from "../components/common/FullPageLoader";
import { appRouter } from "./router";
import { trackEntrySource } from "../lib/firebaseAnalytics";

export default function App() {
  useEffect(() => {
    trackEntrySource();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<FullPageLoader />}>
        <RouterProvider router={appRouter} />
      </Suspense>
    </div>
  );
}
