import React from 'react'

const Spotify = ({Data,Input}) => {
    if(Input==="" ){
        return (
            <h3 className='my-4 text-light text-bolder'>Nothing to Search  </h3>
        )
    }
    return (
        <>
            <div>  
                {
                    Data.length!==0 && Input!=="" ?  <h3 className='my-4 text-light'>Spotify Searched items : {Input} </h3> :<h3 className='my-4 text-light'>Search not found : {Input} </h3>
                }
                
                <div className='container row justify-content-between align-items-center gy-4 text-dark'>
                    {Data===""?<div className='text-light col-12'></div>:
                        Data.map((artist) => {
                            return (

                                <div className="card col-5" key={artist.id}>
                                    {artist.images.length? 
                                    <img src={artist.images[0].url} className="card-img-top w-100 h-75" alt="..." />:<div>No Images</div>  
                                }
                                    <div className="card-body">
                                        <h5 className="card-title">{artist.name}</h5>
                                        {
                                            artist.hasOwnProperty('artists')? 
                                            <p className="card-text fw-bold">By : {artist.artists.map((val)=>{
                                                    return (<span>{val.name} &nbsp;</span>)
                                            })}</p>
                                            :
                                            <p className="card-text fw-bold">Type : {artist.type}</p>
                                        }
                                        {/* <p className="card-text fw-bold">By : {artist.type}</p> */}
                                        <a href={artist.external_urls.spotify} className="btn btn-primary" target="_blank" rel="noreferrer">Play Song</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Spotify


