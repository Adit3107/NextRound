import { useAuth } from "@clerk/clerk-react"
import { cn } from "@/lib/utils"
import Container from "./container"
import { NavigationRoutes } from "./navigation-routes"
import {LogoContainer} from "./LogoContainer"
import { NavLink } from "react-router-dom"
import ProfileContainer from "./profile-container"
import ToggleContainer from "./toggle-conatiner"


const Header = () => {

  const { userId } = useAuth()
  return (
    <header  className={cn("w-full h-18 border-b duration-150 transition-all ease-in-out")}>
      
      <Container className="">
        <div className="flex items-center justify-between gap-4 w-full">
          {/* logo section */}
          <div>
          <LogoContainer />
          </div>
          

          {/* navigation section */}
          <nav className="hidden md:flex items-center gap-3">
            <NavigationRoutes />
            {userId && (
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  cn(
                    "text-base text-neutral-600",
                    isActive && "text-neutral-900 font-semibold"
                  )
                }
              >
                Start Interview
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-6">
            
            <ProfileContainer />

            
            <ToggleContainer />
          </div>
        </div>
      </Container>

    </header>
  )
}

export default Header
