import React from "react";

function Unauthorized() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "50vh",
				backgroundColor: "#ccc",
			}}
		>
			<h2
				style={{
					color: "darkred",
					textAlign: "center",
				}}
			>
				Sorry, You don't have the authorization to access the page you requested
			</h2>
		</div>
	);
}

export default Unauthorized;
