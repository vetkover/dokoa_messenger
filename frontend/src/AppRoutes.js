import Auth from "./components/Pages/Auth/Auth"
import Main from "./components/Pages/Main/Main"

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
  }

];

export default AppRoutes;
