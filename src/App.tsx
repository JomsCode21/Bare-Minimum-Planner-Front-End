import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage";
// function Home() {
//   return (
//     <div>
//       <h1 className="text-2xl text-center">React Router DOM Setup</h1>
//     </div>
//   );
// }
function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   Component: Home,
    // },
    {
      path: "/",
      Component: LandingPage,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
