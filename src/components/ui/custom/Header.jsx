import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-4 px-6 flex justify-between shadow-md">
      <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
      {isSignedIn ? 
        <div className="flex gap-2 items-center">
          <Link to={'/dashboard'}>
          <Button variant="outline" className="cursor-pointer">Dashboard</Button>
          </Link>
          <UserButton /> // asdas
        </div> :
      
        <Link to={'/auth/sign-in'}>
          <Button className="h-10 px-6 text-lg">Get Started</Button>
        </Link>
      }
    </div>
  ) 
}

export default Header;
