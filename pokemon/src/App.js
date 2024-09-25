import { RouterProvider } from "react-router-dom";
import router from "./router.js";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
