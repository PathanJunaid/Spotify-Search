import React from 'react'

const Filters = ({ FilterSelected ,activeclass}) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark rounded-pill box-shadow-filter mt-5">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav text-dark mx-auto">
                            <ul className="nav nav-pills">
                                {
                                    activeclass.map((elem)=>{
                                        return (
                                            <li key={elem.name} className={elem.classn} role='button' onClick={(e) => {FilterSelected(elem.name.toLowerCase(),e)}}>{elem.name} </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Filters
