import { useState } from "react";
import Layout from "./Layout";
import Home from "./components/Home";
import Pastes from "./components/Pastes";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import View from "./components/View";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pastes" element={<Pastes />}></Route>
        <Route path="/pastes/:id" element={<View />}></Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
