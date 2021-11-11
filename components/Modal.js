import { useRouter } from "next/router"

export default function Modal({title, msg, route, close}){
    const router = useRouter();
    const handleAction =()=>{
        if(route){
        router.push(route);
        }
        if(close){
            close();
        }
    }
    return(
        <div className="h-screen w-screen z-50 bg-gray-900 absolute bg-opacity-80 flex flex-col items-center justify-items-center justify-center">
            <div className="w-11/12 md:w-3/12 md:h-80 bg-blue-500 rounded-xl p-3 flex flex-col">
                <div>
                    <h2 className="text-blue-900 text-lg font-semibold">{title}</h2>
                </div>
                <div className="py-3 px-1">
                    <p className="text-white text-md">{msg}</p>
                </div>
                <button className="bg-white w-10/12 px-5 py-3 rounded-3xl mt-7 bottom-0 self-center cursor-pointer" 
                onClick={()=>handleAction()}>Aceptar</button>
            </div>
        </div>
    )
}