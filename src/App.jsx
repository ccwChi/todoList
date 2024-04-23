import { Outlet } from "react-router-dom";
import Header from "./component/Header";

const App = () => {
  return (
    <div className="w-full h-screen flex bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col flex-1 p-2 overflow-hidden">
        <div className="">
          <Header />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;

