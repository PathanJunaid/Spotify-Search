import React, { useState } from 'react'
import axios from 'axios';

const Spotify = ({Token}) => {

    const [Input, setInput] = useState("")
    const [Data, setData] = useState([])
    const fetched = async (e) => {
        e.preventDefault();
        if(Input===""){
            setData([]);
            return 0;
        }
        const dat = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${Token}`
            },
            params: {
                q: Input,
                // , album , playlist, track, show, episode, audiobook
                type: "artist,album,playlist,track,show,episode,audiobook",    
                limit: 8,
            }
        }).catch((e) => {
            console.log("Error" + e)
        })
        try {
            console.log(dat)
            setData(dat.data.albums.items)
        } catch (error) {
            console.log("Data Fetched But Items not in object")
        }
    }
    const Inputd = (e) => {
        let type = e.target.value;
        setInput(type);
    }
    console.log(Data)
    return (
        <>
            <form onSubmit={(e) => { fetched(e) }} className='mt-4 w-100 text-center'>
                <input type="text" className="form-control w-50 text-center mx-auto" onChange={(e) => { Inputd(e) }} placeholder='Enter Artists Name' />
                <button type='submit' className='btn btn-primary input-group mt-3 w-50' onClick={(e) => {Inputd? fetched(e):console.log("Enter Something") }}>Search</button>
            </form>
            <div>  
                {
                        Data===[] ? <h5 className='my-4 text-light'>Search not found : {Input} </h5> : <h5 className='my-4 text-light'>Spotify Searched items : {Input} </h5>
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
                                        {/* <h5 className="card-title"></h5> */}
                                        <p className="card-text fw-bold">By : {artist.artists[0].name}</p>
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


