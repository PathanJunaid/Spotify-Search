import React from 'react'

const Navbar = ({ Token, Inputd, fetched, Logout }) => {
    const Client_ID = "e70d95578b724f8d8b628db5d28333a8";
    const Redirect = "http://localhost:3000/";
    const End_P = "https://accounts.spotify.com/authorize";
    const Resp_T = "token";
    return (
        <>
            <nav className="navbar navbar-light py-3 bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand fs-3 fw-bold">Spotify</span>
                    {
                        Token === "" || Token === null ?
                        <>
                            <div className="d-flex me-5">
                                <a className="btn btn-primary px-4 fs-5"
                                    href={`${End_P}?client_id=${Client_ID}&redirect_uri=${Redirect}&response_type=${Resp_T}`}
                                > Login
                                </a>
                            </div>
                            </>
                            :
                            <>
                                <div className="d-flex justify-content-center w-75">
                                    <input type="text" className="form-control w-50 text-center" onChange={(e) => { Inputd(e); fetched(e)}} placeholder='Enter Artists Name' />
                                </div>
                                <div className="d-flex me-5">
                                    <button className='btn btn-primary' onClick={() => { Logout() }}>Logout</button>

                                </div>
                            </>
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbar
