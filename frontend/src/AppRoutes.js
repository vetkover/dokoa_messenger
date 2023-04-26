import Auth from "./components/Pages/Auth/Auth"
import Main from "./components/Pages/Main/Main"
import SignIn from "./components/Pages/Sign-in/SignIn"

const AppRoutes = [
{
  index: true,
  element: <Main />
}
,{
    path: "auth",
    element: <Auth />
  },
  {
  path: "main",
  element: <Main />
  },
  {
    path: "sign-in",
    element: <SignIn />
  }

];

export default AppRoutes;
