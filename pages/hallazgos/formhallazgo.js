/** @format */

import Header from "../../components/Header"
import { CameraIcon, CheckCircleIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import Axios from "axios"
import Link from "next/link"
import imageCompression from "browser-image-compression"
import Loader from "../../components/Loader"
import { getAreas } from "../../api/Areas"

export default function FormHallazgo() {
	const FORM_ENDPOINT = "https://api-foodpartnerspatagonia.herokuapp.com/api/newIncidencia"
	const [photo, setPhoto] = useState(null)
	const [formStatus, setFormStatus] = useState(null)
	const [areas, setAreas] = useState(null)
	const [query, setQuery] = useState({
		titulo: "",
		detalle: "",
		id_area: "",
		id_user: "",
		prioridad: "",
		foto: "",
	})

	useEffect(() => {
		getAreas().then((resp) => {
			setAreas(resp.data)
		})
		const camera = document.querySelector("#camera")
		camera &&
			camera.addEventListener("change", function (e) {
				if (e.target.files.length !== 0) {
					setPhoto(URL.createObjectURL(e.target.files[0]))
				}
			})
	}, [])

	const handleFileChange = () => async (e) => {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1024,
			useWebWorker: true,
			fileType: "image/png",
		}
		try {
			const compressedFile = await imageCompression(e.target.files[0], options)
			setQuery((prevState) => ({
				...prevState,
				foto: compressedFile,
			}))
		} catch (error) {
			console.log(error)
		}
	}
	const handleChange = () => (e) => {
		const name = e.target.name
		const value = e.target.value
		const user = JSON.parse(localStorage.getItem("userData"))
		setQuery((prevState) => ({
			...prevState,
			[name]: value,
			id_user: user.id,
		}))
	}
	const handleSubmit = (e) => {
		setFormStatus("sending")
		e.preventDefault()
		const formData = new FormData()
		Object.entries(query).forEach(([key, value]) => {
			formData.append(key, value)
		})
		Axios.post(FORM_ENDPOINT, formData, { headers: { Accept: "application/json" } })
			.then(function (response) {
				setFormStatus("complete")
				setQuery({
					titulo: "",
					detalle: "",
					id_area: "",
					id_user: "",
					prioridad: "",
					foto: "",
				})
				console.log(response)
			})
			.catch(function (error) {
				setFormStatus(null)
				alert("Ocurrió un error al guardar los datos. Intento nuevamente")
				console.log("error upload", error)
			})
	}
	return (
		<div className=" w-screen h-screen justify-center relative">
			<Header />
			<h1 className="text-2xl font-bold text-gray-700 text-center pt-3 pb-1">Nuevo Hallazgo</h1>
			<p className="font-light text-gray-700 text-md px-3 text-center">
				Especifique un nombre y describa el hallazgo detectado adjuntando una fotografía del mismo
			</p>
			{formStatus == "complete" && (
				<div className="flex flex-col justify-center items-center text-center text-xl text-green-600 my-20">
					<CheckCircleIcon className="w-10" />
					Se ha registrado el hallazgo
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
				<div className="flex flex-col items-center">
					<form
						acceptCharset="UTF-8"
						method="POST"
						enctype="multipart/form-data"
						onSubmit={handleSubmit}
						className="w-full md:w-1/2 flex flex-col"
					>
						<input
							name="titulo"
							placeholder="Titulo"
							required
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-xl p-3 mx-3 my-2"
							onChange={handleChange()}
							value={query.titulo}
						/>
						<textarea
							name="detalle"
							placeholder="Detalle"
							required
							className="w-11/12 focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-xl p-3 mx-3 my-2"
							rows="5"
							onChange={handleChange()}
							value={query.detalle}
						></textarea>
						<div className="relative w-11/12 mx-3">
							<svg
								className="w-3 h-5 absolute top-1 right-0 m-4 pointer-events-none"
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
								name="id_area"
								required
								className="border border-gray-200 rounded-full text-gray-600 h-10 pl-5 pr-9 my-2 w-full  bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none"
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
						<div className="w-full md:w-8/12 self-center my-5 mx-3">
							{/* <p className='text-gray-400 m-3'>Prioridad</p> */}
							<div className="flex items-center justify-around md:w-12/12">
								<label>
									<input type="radio" name="prioridad" value="baja" class="hidden" onChange={handleChange()} />
									<div class="flex items-center py-3 px-7 rounded-xl bg-white label-checked:bg-yellow-400 label-checked:text-white text-center">
										Baja
									</div>
								</label>
								<label>
									<input type="radio" name="prioridad" value="media" class="hidden" onChange={handleChange()} />
									<div class="flex items-center py-3 px-7 rounded-xl bg-white label-checked:bg-green-400 label-checked:text-white text-center">
										Media
									</div>
								</label>
								<label>
									<input type="radio" name="prioridad" value="alta" class="hidden" onChange={handleChange()} />
									<div class="flex items-center py-3 px-7 rounded-xl bg-white label-checked:bg-red-400 label-checked:text-white text-center">
										Alta
									</div>
								</label>
							</div>
						</div>
						<label className="flex justify-center self-center mt-5 w-full md:w-7/12">
							{!photo ? (
								<CameraIcon className="w-6/12 text-gray-700 cursor-pointer" />
							) : (
								<img height={200} width={300} src={photo} className="rounded-xl" />
							)}
							<input
								required
								name="foto"
								type="file"
								accept="image/*"
								id="camera"
								className="h-0 w-0"
								onChange={handleFileChange()}
							/>
						</label>

						<button
							type="submit"
							className="w-11/12 md:w-7/12 self-center p-4 bg-blue-400 text-white text-xl mt-7 mb-3 mx-3 rounded-xl focus:outline-none "
						>
							Aceptar
						</button>
					</form>
				</div>
			)}
		</div>
	)
}
