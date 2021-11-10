/** @format */

import { useState, useEffect } from "react"
import { ExclamationCircleIcon, CloudDownloadIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { checkToken } from "../api/Token"
import { LoginApi } from "../api/Users"
import Loader from "../components/Loader"

export default function Index() {
	const [formStatus, setFormStatus] = useState(false)
	const [error, setError] = useState(null)
	const [showInstall, setShowInstall] = useState(false)
	const [query, setQuery] = useState({
		email: "",
		password: "",
	})
	const router = useRouter()

	const beforePrompInstal = () => {
		window.addEventListener("beforeinstallprompt", (event) => {
			setShowInstall(true)
			console.log("👍", "beforeinstallprompt", event)
			window.deferredPrompt = event
			// Remove the 'hidden' class from the install button container
		})
	}
	const prompInstall = async () => {
		const promptEvent = window.deferredPrompt
		if (!promptEvent) {
			// The deferred prompt isn't available.
			return
		}
		// Show the install prompt.
		promptEvent.prompt()
		// Log the result
		const result = await promptEvent.userChoice
		// Reset the deferred prompt variable, since
		// prompt() can only be called once.
		window.deferredPrompt = null
		// Hide the install button.
	}
	useEffect(() => {
		beforePrompInstal()
		checkToken().then((resp) => {
			if (resp && resp.data.success == 1) {
				setFormStatus(true)
				router.push("/dashboard")
			}
		})
	}, [])

	const handleChange = () => (e) => {
		const name = e.target.name
		const value = e.target.value
		setQuery((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		setFormStatus(true)
		setError(false)
		e.preventDefault()
		LoginApi(query)
			.then(function (response) {
				console.log("RESPUESTA", response)
				if (response.data.success == 0) {
					setFormStatus(false)
					setError(response.data.mensaje)
					setTimeout(() => {
						setError(null)
					}, 10000)
				}
				if (response.data.success == 1) {
					router.push("/dashboard")
				}
				setQuery({
					email: "",
					password: "",
				})
			})
			.catch(function (error) {
				setFormStatus(null)
				setError(error)
				setTimeout(() => {
					setError(null)
				}, 10000)
			})
	}
	return (
		<div className="w-full h-screen flex flex-col items-center bg-blue-500">
			<div className="flex justify-center items-center pt-40">
				<img src="/img/logo.png" width={250} className="self-center" />
			</div>
			{formStatus ? (
				<Loader msg="Cargando..." color="white" />
			) : (
				<form acceptCharset="UTF-8" method="POST" onSubmit={handleSubmit} className="w-full lg:w-1/3">
					<div className="flex flex-col items-center my-10">
						<input
							name="email"
							required
							type="email"
							placeholder="E-Mail"
							className="w-9/12 rounded-xl py-2 my-2 px-2 outline-none ring-4 focus:ring-blue-400"
							onChange={handleChange()}
						/>
						<input
							name="password"
							required
							type="password"
							placeholder="Password"
							className="w-9/12 rounded-xl py-2 my-2 px-2 outline-none ring-4 focus:ring-blue-400"
							onChange={handleChange()}
						/>
						<button type="submit" className="bg-blue-700 px-20 rounded-xl py-2 text-white my-3 focus:outline-none">
							Aceptar
						</button>
					</div>
				</form>
			)}
			{error && (
				<div className="flex flex-col text-center items-center">
					<ExclamationCircleIcon className="w-8 text-white" />
					<h1 className="text-md text-white mb-3 font-light">{error}</h1>
				</div>
			)}
			{showInstall && (
				<div className="flex justify-center p-3 mx-2 rounded-sm text-white text-center">
					<button
						className="bg-blue-700 rounded-2xl px-5 py-3 w-80 text-xl flex flex-col align-center items-center"
						onClick={() => prompInstall()}
					>
						<CloudDownloadIcon className="w-12" />
						Instalar App
					</button>
				</div>
			)}
		</div>
	)
}
