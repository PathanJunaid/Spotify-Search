
import { useEffect, useState } from 'react';
import './App.css';
import Spotify from './Components/Spotify';
import Navbar from './Components/Navbar';
import axios from 'axios';
function App() {

  const [Input, setInput] = useState("")
  const [Token, setToken] = useState("")
  const [Data, setData] = useState([])
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find((ele) => ele.startsWith("access_token")).split("=")[1];
      window.localStorage.setItem("token", token);
    }
    setToken(token)
  }, [])

  const Inputd = (e) => {
    let type = e.target.value;
    setInput(type);
  }

  const Logout = () => {
    window.localStorage.removeItem("token")
    setToken("")
    window.location=("http://localhost:3000/")
  }
  const fetched = async (e) => {
    e.preventDefault();
    if (Input === "") {
      setData([]);
      return 0;
    }
    const dat = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${Token}`
      },
      params: {
        q: Input,
        type: "artist,album,playlist,track,show,episode,audiobook",
        limit: 8,
      }
    }).catch((e) => {
      console.log("Error" + e)
    })
    try {
      setData(dat.data.albums.items)
    } catch (error) {
      console.log("Data Fetched But Items not in object")
    }
  }
  return (

    <>
      <Navbar Token={Token} Inputd={Inputd} fetched={fetched} Logout={Logout} />
      <div className="container text-center text-light">
        {!Token ?
          <>
            <h1 className='my-5'>Login to Search on Spotify</h1>
          </>
          : <>
            <Spotify Data={Data} Input={Input} />
          </>}

      </div>
    </>
  );
}

export default App;
