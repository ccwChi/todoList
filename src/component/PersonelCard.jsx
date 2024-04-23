import { DarkThemeToggle } from "flowbite-react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { todoStore } from "../store/todoStore";

const PersonelCard = () => {
  const loginInform = todoStore((store) => store.loginInform);
  const [passwordKeys] = Object.keys(loginInform).filter((key) =>
    Object.prototype.hasOwnProperty.call(loginInform[key], "password")
  );

  console.log(passwordKeys);
  return (
    <div className="max-w-sm mt-5">
      <div className="flex flex-col items-center pb-10 relative">
       
        <img
          alt="Bonnie_mage"
          height="96"
          src="/src/assets/image/cala.png"
          width="96"
          className="mb-3 border rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-md font-bold text-gray-900 dark:text-white">
          {Object.keys(loginInform).filter((key) =>
            Object.prototype.hasOwnProperty.call(loginInform[key], "password")
          )}
        </h5>

        <div className="mt-4 flex space-x-3 lg:mt-6"></div>
      </div>
    </div>
  );
};

export default PersonelCard;
