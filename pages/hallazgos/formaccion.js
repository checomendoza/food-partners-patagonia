/** @format */

import Header from "../../components/Header"
import { CheckCircleIcon } from "@heroicons/react/solid"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Loader from "../../components/Loader"
import { newNovedadAccion } from "../../api/Novedades"

export default function FormAccion(props) {
	const router = useRouter()
	const item = JSON.parse(props.item ? props.item : null)
	const [formStatus, setFormStatus] = useState(null)
	const [user, setUser] = useState(null)
	const numdias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const [query, setQuery] = useState({
		id_area: item.id_area,
		id_user: null,
		id_incidencia: item.id,
		plazo: "",
		descripcion: "",
		id_tipo: 2,
	})

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
		setFormStatus("sending")
		e.preventDefault()
		newNovedadAccion(query).then((respuesta) => {
			setFormStatus(null)
			alert("Se ha registrado la acción a tomar")
			router.push("/hallazgos/listhallazgos")
		})
	}
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("userData")))
	})
	return (
		<div className=" w-screen h-screen justify-center relative">
			<Header />
			<container className="w-11/12 flex flex-col items-center justify-items-center mx-5">
				<h1 className="text-2xl font-bold text-gray-700 text-center pt-3 pb-1">Realizar Acción</h1>
				<p className="font-light text-gray-700 text-md px-3 text-center">
					Especifique la acción a realizar para tratar este hallazgo y el tiempo en dias a finalizar la misma
				</p>
				{formStatus == "complete" && (
					<div className="flex flex-col justify-center items-center text-center text-xl text-green-600 my-20">
						<CheckCircleIcon className="w-10" />
						Se ha registrado la acción
						<Link href="listhallazgos">
							<a>
								<button
									type="button"
									className="w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none "
								>
									Ir al listado
								</button>
							</a>
						</Link>
					</div>
				)}
				{formStatus == "sending" && <Loader msg="Guardando Datos..." color="blue-400" />}
				{!formStatus && (
					<div className="flex flex-col items-center w-full md:w-5/12 self-center justify-items-center">
						<form
							acceptCharset="UTF-8"
							method="POST"
							enctype="multipart/form-data"
							onSubmit={handleSubmit}
							className="w-full flex flex-col items-center"
						>
							<textarea
								name="descripcion"
								placeholder="Descripción de la acción a realizar"
								required
								className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-xl p-3 mx-3 my-2"
								rows="5"
								onChange={handleChange()}
								value={query.detalle}
							></textarea>
							<div className="relative w-full mx-3">
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
									name="plazo"
									required
									className="border border-gray-200 rounded-full text-gray-600 h-10 pl-5 pr-10 my-2 w-full bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none"
									onChange={handleChange()}
								>
									<option value="">Cantida de dias...</option>
									{numdias.map((dia) => (
										<option key={dia} value={dia}>
											{dia}
										</option>
									))}
								</select>
							</div>
							<button
								type="submit"
								className="w-11/12 md:w-6/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3  rounded-xl focus:outline-none "
							>
								Aceptar
							</button>
						</form>
					</div>
				)}
			</container>
		</div>
	)
}

FormAccion.getInitialProps = ({ query }) => {
	return query
}
