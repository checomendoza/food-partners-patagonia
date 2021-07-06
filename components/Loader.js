export default function Loader({msg, color}){

    return(
            <div className='flex flex-col items-center justify-center my-20'>
                    <h1 className={`text-xl text-center mb-3 text-${color}`}>{msg}</h1>
                    <div className={`w-12 h-12 border-4 rounded-full loader border-${color}`}></div>
                </div>
    )
}