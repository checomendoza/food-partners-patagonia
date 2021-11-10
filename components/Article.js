/** @format */

import Link from "next/link"

export default function Article(props) {
	var bg_prioidad = ""
	switch (props.item.prioridad.toLowerCase()) {
		case "baja":
			bg_prioidad = "bg-green-400"
			break
		case "media":
			bg_prioidad = "bg-yellow-400"
			break
		case "alta":
			bg_prioidad = "bg-red-400"
			break
	}

	return (
		<div className="bg-white rounded-xl shadow-md py-2 px-10 border my-1 mx-2 cursor-pointer w-11/12 lg:w-1/4 md:h-56">
			<Link href={{ pathname: "../hallazgos/detallehallazgo", query: { item: JSON.stringify(props.item) } }}>
				<a className="flex flex-col py-2 px-2">
					<h3># {props.item.id}</h3>
					<div className="flex flex-wrap items-center mb-3 w-full">
						<p className="text-gray-400 text-sm">{props.item.created_at.slice(0, 10)}</p>
						<span className={`${bg_prioidad} text-sm text-gray-100 px-5 py-1 rounded-full text-center ml-5`}>
							{props.item.prioridad}
						</span>
					</div>
					<h1 className="font-bold">{props.item.titulo.slice(0, 30)}...</h1>
					<p>{props.item.detalle && props.item.detalle.slice(0, 50)}...</p>
					<span className="bg-gray-100 border border-gray-200 text-gray-400 text-center px-1 py-1 w-full rounded-full mt-5">
						{props.item.nombre}
					</span>
				</a>
			</Link>
		</div>
	)
}
