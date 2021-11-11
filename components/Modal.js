import { useRouter } from "next/router"

export default function Modal({title, msg, route, accept, cancel}){
    const router = useRouter();
    const handleAction =()=>{
        if(route){
        router.push(route);
        }
        if(accept){
            accept();
        }
    }
    const handleCancel =()=>{
        cancel()
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
                <div className="flex w-full justify-around">
                <button className="flex bg-blue-700 rounded-2xl py-2 text-white px-10 mx-1 focus:outline-none" 
                onClick={()=>handleAction()}>Aceptar</button>
                {cancel && <button className="flex bg-gray-300 rounded-2xl py-2 text-blue-700 px-10 mx-1 focus:outline-none" 
                onClick={()=>handleCancel()}>Cancelar</button>}
                </div>
            </div>
                
            
        </div>
    )
}