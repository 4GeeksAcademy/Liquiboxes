import React from "react";

export default function SearchBar() {
    return (
        <form className="d-flex align-items-center p-2" role="search">
            <input
                className="form-control border-0 border-bottom shadow"            
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
            <button className="btn btn-primary ms-2 px-4" type="submit">Search</button>
        </form>


    )
}


