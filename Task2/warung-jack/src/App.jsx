import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Layout from "./Layout/Layout";
import InsertProduct from "./pages/InsertProduct";
import Informasi from "./pages/Informasi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "products/insert", element: <InsertProduct /> },
      { path: "informasi", element: <Informasi /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
