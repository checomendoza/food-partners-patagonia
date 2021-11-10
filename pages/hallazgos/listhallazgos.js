/** @format */

import Header from "../../components/Header"
import Article from "../../components/Article"
import Link from "next/link"
import { SearchCircleIcon } from "@heroicons/react/outline"
import Loader from "../../components/Loader"

import { useState, useEffect } from "react"
import Axios from "axios"

export default function ListHallazgos() {
	const [incidencias, setIncidencias] = useState(null)
	const [incidenciasApi, setIncidenciasApi] = useState(null)
	const [isLoading, setisLoading] = useState(true)
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userData"))
		var parametros = {}
		if (user.rol == "Operador") {
			parametros = {
				id_area: user.id_area,
			}
		}
		Axios.post("https://api-foodpartnerspatagonia.herokuapp.com/api/getIncidencias", parametros).then((resp) => {
			setIncidencias(resp.data.data)
			setIncidenciasApi(resp.data.data)
			setisLoading(false)
		})
	}, [])
const handleFilter = (type)=>{
	type=='TODAS' ? setIncidencias(incidenciasApi) : setIncidencias(incidenciasApi.filter(item=>item.prioridad==type))
}
	return (
		<div className="w-full justify-center relative">
			<Header />
			<h1 className="text-2xl font-bold text-gray-700 text-center pt-3 pb-1">Listado de Hallazgos</h1>

			<main className="flex flex-col items-center py-3 w-full">
				<div className="pb-3">
					<h3>Filtros</h3>
					<div className='flex'>
						<div className="cursor-pointer bg-transparent border border-blue-600 py-1 px-4 mx-2 md:py-2 md:px-5 rounded-lg hover:bg-blue-600 hover:text-white text-blue-600" onClick={() =>handleFilter('TODAS')}>
							Todas
						</div>
						<div className="cursor-pointer bg-transparent border border-red-500 py-1 px-4 mx-2 md:py-2 md:px-5 rounded-lg hover:bg-red-500 hover:text-white text-red-500" onClick={() =>handleFilter('ALTA')}>
							Alta
						</div>
						<div className="cursor-pointer bg-transparent border border-yellow-500 py-1 px-4 mx-2 md:py-2 md:px-5 rounded-lg hover:bg-yellow-500 hover:text-white text-yellow-500" onClick={() =>handleFilter('MEDIA')}>
							Media
						</div>
						<div className="cursor-pointer bg-transparent border border-green-500 py-1 px-4 mx-2 md:py-2 md:px-5 rounded-lg hover:bg-green-500 hover:text-white text-green-500" onClick={() =>handleFilter('BAJA')}>
							Baja
						</div>
					</div>
				</div>
				{isLoading && <Loader msg="Cargando..." color="blue-400" />}
				{incidencias && incidencias.length == 0 && (
					<>
						<SearchCircleIcon className="w-20 text-gray-500 font-light mt-24" />
						<h1 className="text-2xl text-gray-600">No existen hallazgos</h1>
					</>
				)}
				<container className="flex flex-col items-center w-full lg:flex-wrap lg:w-9/12 lg:flex-row lg:justify-items-start">
					{incidencias && incidencias.map((item) => <Article key={item.id} item={item} />)}
				</container>
			</main>
			<footer className="flex fixed right-5 bottom-5">
				<Link href="/hallazgos/formhallazgo">
					<a>
						<button className="flex w-20 bg-blue-400  active:bg-indigo-800 focus:outline-none text-white rounded-full right-5 py-5 text-4xl  sticky float-right justify-center">
							+
						</button>
					</a>
				</Link>
			</footer>
		</div>
	)
}
