import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../components/pages/HomePage";
import { SearchPage } from "../components/pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/search",
    element: <SearchPage />
  }
]);

export default router;