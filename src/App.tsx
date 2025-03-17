import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import router from "./routes";
import routes from "tempo-routes";

function App() {
  // Tempo routes are only included in development mode
  const tempoRoutesElement =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;
  // Get the main app routes from the router
  const appRoutesElement = useRoutes(router.routes);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {tempoRoutesElement}
      {appRoutesElement}
    </Suspense>
  );
}

export default App;
