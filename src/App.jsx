import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLear from "./Leayer/RootLear";
import Homel from "./Components/Homel";
import Massage from "./Components/Massage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/" element={<RootLear />}>
        <Route index element={<Homel />}></Route>
        <Route path="/massage" element={<Massage></Massage>}></Route>
      </Route>
    </>
  )
);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
