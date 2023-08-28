import React from 'react'

const Filters = ({FilterSelected}) => {
    // onClick={(e) => { Inputd ? fetched(e) : console.log("Enter Something") }}
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav text-dark mx-auto">
                            <ul className="nav nav-pills">
                                <li className="nav-link active mx-2 text-dark fw-bold" role='button' onClick={(e) => {FilterSelected('artist',e)}}>Artist</li>
                                <li className="nav-link mx-2 text-dark fw-bold" role='button' onClick={(e) => {FilterSelected('album',e)}}>Album</li>
                                <li className="nav-link mx-2 text-dark fw-bold" role='button' onClick={(e) => {FilterSelected('playlist',e)}}>Playlist</li>
                                <li className="nav-link mx-2 text-dark fw-bold" role='button' onClick={(e) => {FilterSelected('audiobook',e)}}>Audiobook</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Filters
