import Auth from "./components/Pages/Auth/Auth"
import Main from "./components/Pages/Main/Main"
import SignIn from "./components/Pages/Sign-in/SignIn"
import Recovery from "./components/Pages/Recovery/Recovery.js"
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
  },
  {
    path: "recovery",
    element: <Recovery />
  }

];

export default AppRoutes;
