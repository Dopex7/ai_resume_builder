import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
    <Link to={'/'}>
   <img src='/logo.svg' className='cursor-pointer' width={66} height={100} />
   </Link>
   {isSignedIn ?
       <div className='flex gap-2 items-center'>
           <Link to={'/dashboard'}>
               <Button variant="outline" className='cursor-pointer' >Dashboard</Button>
           </Link>
           <UserButton width={40} appearance={{elements:{userButtonAvatarBox:{width:40,height:40}}}}/>
       </div> :
       <Link to={'/auth/sign-in'}>
           <Button className={'cursor-pointer'}>Sign In</Button>
       </Link>
   }

</div>
  ) 
}

export default Header;
