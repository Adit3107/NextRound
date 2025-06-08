import { useAuth, UserButton } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const ProfileContainer = () => {

    const {isSignedIn, isLoaded} = useAuth();

    if(!isLoaded){
        return(
            <div className="flex items-center">
                <Loader className="min-w-4 min-h-4 animate-spin "/>
            </div>
        )
    }

  return (
    <div className="flex items-center gap-6">
  {isSignedIn ? (
    <>
      <Link to="/profile">
        <Button size="sm" variant="outline">Profile</Button>
      </Link>
      <UserButton />
    </>
  ) : (
    <Link to="/signin">
      <Button size="sm">Get Started</Button>
    </Link>
  )}
</div>

    )
}

export default ProfileContainer
