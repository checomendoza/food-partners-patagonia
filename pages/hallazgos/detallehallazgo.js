/** @format */

import { useRouter } from "next/router"
import Header from "../../components/Header"
import { useState, useEffect } from "react"
import { getNovedades, newNovedadDeriva } from "../../api/Novedades"
import { getAreas } from "../../api/Areas"
import { ClipboardListIcon, ClipboardCopyIcon, ArrowRightIcon } from "@heroicons/react/solid"
import Loader from "../../components/Loader"
import axios from "axios"

export default function DetalleHallazgo(props) {
	const FORM_ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api"

	const router = useRouter()
	const item = JSON.parse(props.item ? props.item : null)
	const [novedades, setNotvedades] = useState(null)
	const [user, setUser] = useState(null)
	const [areas, setAreas] = useState(null)
	const [derivar, setDerivar] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [query, setQuery] = useState({
		id_tipo: 1,
		id_area: item.id_area,
		id_incidencia: item.id,
		id_user: null,
		comentarios: null,
		id_area_deriva: null,
	})

	var bg_prioidad = ""
	if (item) {
		switch (item.prioridad.toLowerCase()) {
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
	}

	const handleDerivar = () => {
		setDerivar(true)
		// location.hash = "#div_derivar"
		setTimeout(() => {
			window.scrollTo(0,document.body.scrollHeight);

		}, 100)

	}
	const handleChange = () => (e) => {
		const name = e.target.name
		const value = e.target.value
		setQuery((prevState) => ({
			...prevState,
			id_user: user.id,
			[name]: value,
		}))
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setIsLoading(true)
		newNovedadDeriva(query).then((respuesta) => {
			setIsLoading(false)
			alert("Hallazgo derivado al área especificada")
			router.push("/hallazgos/listhallazgos")
		})
	}

	const handleAccion = () => {
		router.push({
			pathname: "formaccion",
			query: { item: JSON.stringify(item) },
		})
	}
	const handleNovedad = (novedad) => {
		router.push({
			pathname: "../novedades/detallenovedad",
			query: { item: JSON.stringify(novedad) },
		})
	}
	const handleFinishInstancia = () => {
		let date = new Date().toLocaleString()
		axios
			.post(FORM_ENDPOINT + "/cierreIncidencia", {
				id: item.id,
			})
			.then((response) => {
				alert("Hallazgo finalizado")
				router.push("/hallazgos/listhallazgos")
			})
	}

	const handleDeleteInstancia = () => {
		if (confirm("Desea eliminar este hallazgo?")) {
			axios
				.post(FORM_ENDPOINT + "/deleteIncidencia", {
					id: item.id,
				})
				.then((response) => {
					alert("Hallazgo eliminado")
					router.push("/hallazgos/listhallazgos")
				})
		}
	}
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("userData")))
		getNovedades(item.id).then((respuesta) => {
			console.log("NOVEDADES", respuesta)
			setNotvedades(respuesta.data)
		})
		getAreas().then((resp) => {
			setAreas(resp.data)
		})
	}, [])

	return (
		item && (
			<div className="w-full justify-center relative">
				<Header />
				<container className="w-full md:flex md:flex-col items-center">
					<h1 className="text-xl text-center text-gray-700 font-regular mt-3 font-semibold">{item.titulo}</h1>
					<h3 className={`text-sm text-center text-gray-500 font-regular mb-3`}>{item.created_at.slice(0, 10)}</h3>
					<main className="w-full md:w-6/12">
						<div className="flex flex-col w-full border-b border-gray-300 pb-1">
							<div className="flex w-11/12 mx-3 mb-1">
								<span className={` bg-blue-300 w-1/2 text-sm text-blue-900 px-5 py-2 rounded-full text-center ml-5`}>
									{item.nombre}
								</span>
								<span className={`${bg_prioidad} w-1/2 text-sm text-gray-100  px-5 py-2 rounded-full text-center ml-5`}>
									{item.prioridad}
								</span>
							</div>
							<h3 className={`text-sm text-center text-gray-600 font-bold m-3 bg-gray-300 py-2 rounded-md`}>
								{item.estado}
							</h3>
						</div>
						<p className="text-md mx-3 my-3">{item.detalle}</p>
						<div className="flex flex-col items-center text-center my-3">
							<img src={`${item.url}`} className="w-8/12" />
						</div>
						<div className="mt-5">
							<h1 className="text-xl text-center text-blue-700 font-bold py-3 border-t border-gray-300 bg-blue-200">Novedades</h1>
							{novedades &&
								novedades.map((novedad) =>
									novedad.id_tipo == 2 ? (
										<div
											className="flex flex-col bg-white mx-2 px-3 py-1 my-3 rounded-md text-sm border border-gray-300"
											key={novedad.id}
											onClick={() => handleNovedad(novedad)}
										>
											<div className="flex justify-between text-xs">
												<p className="text-gray-500">Fecha: {novedad.created_at.slice(0, 10)}</p>
												<p className="text-gray-500">Plazo: {novedad.plazo} dias</p>
											</div>
											<div className="flex justify-between">
												<p className="text-yellow-500 p-1 bg-yellow-200 rounded-md">
													{areas.filter((area) => area.id == novedad.id_area)[0].nombre}
												</p>
												<p className="text-gray-500 p-1 bg-gray-200 rounded-md">{novedad.ayn}</p>
											</div>
											<p className="my-2">{novedad.descripcion}</p>
										</div>
									) : (
										<div
											className="flex flex-col bg-gray-300 mx-2 px-3 py-1 my-3 rounded-md text-sm border border-white"
											key={novedad.id}
										>
											<div className="flex justify-between text-xs">
												<p className="text-gray-500">Fecha: {novedad.created_at.slice(0, 10)}</p>
												<p className="text-gray-500">Derivado</p>
											</div>
											<div className="flex p-1 justify-evenly">
												<p className="text-gray-700 bg-gray-400 p-1 rounded-md">
													{areas.filter((area) => area.id == novedad.id_area)[0].nombre}
												</p>
												<ArrowRightIcon className="w-7 text-gray-500" />
												<p className="text-gray-700 bg-gray-400 p-1 rounded-md">
													{areas.filter((area) => area.id == novedad.id_area_deriva)[0].nombre}
												</p>
											</div>
											<p className="my-2">{novedad.comentarios}</p>
										</div>
									),
								)}
						</div>
						{user && user.rol == "Admin" ? (
							<div className="md:flex-row flex flex-col justify-center mt-7">
								<button
									type="button"
									className="w-11/12 lg:w-3/12 self-center p-4 bg-blue-400 text-white text-xl  lg:mb-0 mb-3 mx-3 rounded-xl focus:outline-none"
									onClick={() => handleFinishInstancia()}
								>
									Finalizar Hallazgo
								</button>
								<button
									type="button"
									className="w-11/12 lg:w-3/12 self-center p-4 bg-gray-150 text-red-500  text-xl  mx-3 rounded-xl focus:outline-none hover:bg-red-300 hover:text-white"
									onClick={() => handleDeleteInstancia()}
								>
									Eliminar Hallazgo
								</button>
							</div>
						) : (
							<div className="flex justify-center">
								<button
									type="button"
									className="flex flex-col justify-center items-center w-6/12 p-3 border bg-green-100 border-green-600 text-green-600 text-lg mt-5 mb-3 mx-3 rounded-xl focus:outline-none"
									onClick={() => handleAccion()}
								>
									<ClipboardListIcon className="w-10" />
									Acción
								</button>
								<button
									type="button"
									className="flex flex-col justify-center items-center w-6/12 p-3 border bg-yellow-100 border-yellow-600 text-yellow-600 text-lg mt-5 mb-3 mx-3 rounded-xl focus:outline-none"
									onClick={() => handleDerivar()}
								>
									<ClipboardCopyIcon className="w-10" />
									Derivar
								</button>
							</div>
						)}
						{derivar && (
							<div className="w-full flex flex-col text-center mt-10" id="div_derivar">
								<form onSubmit={handleSubmit}>
									<p className="text-gray-600 text-md mx-5 md:pt-10">
										Seleccione el área al que desea derivar este hallazgo para que tome una acción y un comentario
									</p>
									<div className="relative w-11/12 mx-5 md:mx-10 text-center">
										<svg
											className="w-2 h-5 absolute top-0 right-0 m-4 pointer-events-none"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 412 232"
										>
											<path
												d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
												fill="#648299"
												fillRule="nonzero"
											/>
										</svg>
										<select
											name="id_area_deriva"
											required
											className="border border-gray-200 rounded-full text-gray-600 h-10 pl-5 pr-10 my-2 w-full bg-white ring-2 ring-blue-300 outline-none appearance-none"
											onChange={handleChange()}
										>
											<option value="">Seleccione el área...</option>
											{areas &&
												areas.map((area) => (
													<option key={area.id} value={area.id}>
														{area.nombre}
													</option>
												))}
										</select>
									</div>
									<textarea
										name="comentarios"
										placeholder="Comentarios"
										className="w-11/12 focus:outline-none ring-1 ring-gray-400  rounded-xl p-3 mx-1 my-2"
										rows="5"
										onChange={handleChange()}
									></textarea>
									{isLoading ? (
										<Loader msg="Guardando Datos..." color="blue-400" />
									) : (
										<button
											type="submit"
											className="w-11/12 lg:w-5/12 self-center p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none"
										>
											Aceptar
										</button>
									)}
								</form>
							</div>
						)}
					</main>
				</container>
			</div>
		)
	)
}
DetalleHallazgo.getInitialProps = ({ query }) => {
	return query
}
