import { Outlet } from "react-router-dom"

const AuthenticationLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden relative">
        <img src="/assets/img/bg.png" alt="" className="absolute w-full h-full object-cover opacity-20" />
      <Outlet/>
    </div>
  )
}

export default AuthenticationLayout
