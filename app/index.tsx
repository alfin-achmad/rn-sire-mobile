import {Redirect} from "expo-router";
import {APP_ROUTES} from "@/constants/urls";

export default function Index() {
  const isAuthenticated = false;

  return <Redirect href={isAuthenticated ? APP_ROUTES.MAIN.DASHBOARD : APP_ROUTES.AUTH.SIGN_IN} />;
}
