/** @format */

import Header from "../../components/Header"

export default function DetalleNovedad(props) {
	const item = JSON.parse(props.item ? props.item : null)
	return (
		<div className="w-screen justify-center relative">
			<Header />
			<p>{item.descripcion}</p>
		</div>
	)
}

DetalleNovedad.getInitialProps = ({ query }) => {
	return query
}
