
import React from "react";
import { Link } from "react-router-dom";
import avatar from  "../assets/icons/avatar.png"
import { logOut } from "../auth/firebase";
import { useAuthContext } from "../context/AuthContext";
import Switch from "./Switch"



const Navbar = () => {

  const { isCurrentUser } = useAuthContext()
  const {displayName,photoURL} = isCurrentUser
  return (
    <>
      <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 shadow-lg navbar navbar-expand-lg fixed-top">
        <div className="container-fluid w-full flex items-center justify-between px-6">
          <Link to="/" className="text-2xl text-white pr-2 font-semibold">
            Movie App
          </Link>

          <div className="flex items-center relative">
            {isCurrentUser && (
              <h5 className="text-white mr-2 capitalize">
                {displayName}
              </h5>
            )}
            <Switch/>
            <div className="dropdown relative">
              <span
                className="dropdown-toggle flex items-center hidden-arrow"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={photoURL || avatar}
                  className="rounded-full"
                  style={{ height: "25px", width: "25px" }}
                  alt="user"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
              <ul
                className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <span
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    role={"button"}
                    onClick={()=>logOut()}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Right elements */}
        </div>
      </nav>
      <div className="h-[52px]"></div>
    </>
  );
};

export default Navbar;
