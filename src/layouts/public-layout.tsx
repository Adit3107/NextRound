
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import AuthHandler from "@/handlers/auth-handler";
import { Outlet } from "react-router-dom";


const PublicLayout = () => {
  return (
    <div>
      <AuthHandler/>
      <Header/>

      <Outlet/>

      <Footer/>
    </div>
  )
}

export default PublicLayout;
