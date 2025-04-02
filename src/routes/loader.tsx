import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"


const LoaderPage = ({classname }:{ classname?: string }) => {
  return (
    <div className={cn("flex justify-center items-center h-screen w-screen z-50 bg-transparent", classname)}>

        <Loader className="w-6 h-6 min-w-6 min-h-6 animate-spin"/>
      
    </div>
  )
}

export default LoaderPage
