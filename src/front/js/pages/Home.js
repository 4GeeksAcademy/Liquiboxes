import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import SearchBar from "../component/Home/SearchBar";



// Este es el componente Home

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		 <div className="text-center mt-5">
		 	<h1>LiquiBoxes</h1>

			<div>
				<SearchBar />
			</div>

		 </div>

	);
};
