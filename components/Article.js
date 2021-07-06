import Link from "next/link"

export default function Article(props){
    var bg_prioidad=''
    switch(props.item.prioridad.toLowerCase()){
        case 'baja':
            bg_prioidad='bg-green-400'
            break
        case 'media':
            bg_prioidad='bg-yellow-400'
            break
        case 'alta':
            bg_prioidad='bg-red-400'
        break

    }

    return(
        <div className='bg-white rounded-xl shadow-md w-11/12 py-2 px-10 border my-1 cursor-pointer'>
            <Link href={{pathname: '../hallazgos/detallehallazgo', query: {item: JSON.stringify(props.item)}}}>
                <a className='flex flex-col py-2 px-2'>
                <div className='flex flex-wrap items-center mb-3 w-full'>
                    <p className='text-gray-400 text-sm'>{props.item.created_at.slice(0, 10)}</p>
                    <span className={`${bg_prioidad} text-sm text-gray-100 text-center px-5 py-1 rounded-full text-center ml-5`}>{props.item.prioridad}</span>
                </div>
                <h1 className='font-bold'>{props.item.titulo}</h1>
                <p>{props.item.detalle.slice(0,70)}...</p>
                <span className='bg-gray-100 border border-gray-200 text-gray-400 text-center px-1 py-1 w-full rounded-full mt-5'>{props.item.nombre}</span>
                </a>
            </Link>
        </div>
    )
}