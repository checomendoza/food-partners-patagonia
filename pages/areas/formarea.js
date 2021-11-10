/** @format */

import { useState } from "react"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import { newArea } from "../../api/Areas"
export default function FormArea() {
	const [formStatus, setFormStatus] = useState(false)
	const [query, setQuery] = useState({
		name: "",
	})

	const handleChange = () => (e) => {
		const name = e.target.name
		const value = e.target.value
		setQuery((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setFormStatus(true)
		newArea(query.nombre).then((resp) => {
			setFormStatus(false)
		})
	}

	return (
		<div className="w-full">
			<Header />
			<h1 className="text-2xl font-bold text-gray-700 text-center pt-3 pb-1">Nueva Area</h1>
			<p className="font-light text-gray-700 text-md px-3 text-center">
				Especifique un nombre para la nueva área, la cual podrá asignar cualquier usuario
			</p>
			{formStatus ? (
				<Loader msg="Cargando" color="blue-400" />
			) : (
				<container className="w-full flex flex-col lg:justify-center lg:items-center">
					<form
						acceptCharset="UTF-8"
						method="POST"
						enctype="multipart/form-data"
						onSubmit={handleSubmit}
						className="w-full lg:w-1/2"
					>
						<input
							name="nombre"
							placeholder="Nombre"
							required
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-xl p-3 mx-3 my-2"
							onChange={handleChange()}
							value={query.titulo}
						/>
						<button
							type="submit"
							className="w-11/12 p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none "
						>
							Aceptar
						</button>
					</form>
				</container>
			)}
		</div>
	)
}
