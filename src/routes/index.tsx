import { useRoutes } from "react-router-dom";
import FormRoutes from "./form";

export default function Routes() {
  const routes = [FormRoutes];
  return useRoutes(routes);
}
