
import { useEffect, useState } from 'react';
import './App.css';
import Spotify from './Components/Spotify';
import Navbar from './Components/Navbar';
import Filters from './Components/Filters';
import axios from 'axios';
function App() {

  const [Input, setInput] = useState("")
  const [Token, setToken] = useState("")
  const [Data, setData] = useState([])
  const [filters, setfilter] = useState('artist')
  // Token Access from Spotify 
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find((ele) => ele.startsWith("access_token")).split("=")[1];
      window.localStorage.setItem("token", token);
    }
    setToken(token)
  }, [])
  // Input value Function onchange 
  const Inputd = (e) => {
    let type = e.target.value;
    setInput(type);
  }
  // Logout from Spotify account 
  const Logout = () => {
    window.localStorage.removeItem("token")
    setToken("")
    window.location = ("http://localhost:3000/")
  }
  // Search Function 
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
        // type: 'artist,album,playlist,track,show,episode,audiobook',
        type: filters,
        limit: 8,
      }
    }).catch((e) => {
      console.log("Error" + e)
    })
    try {
      const add = `${filters}s`;
      setData(dat.data[add].items)
    } catch (error) {
      console.log("Data Fetched But Items not in object")
    }
  }
const FilterSelected=(val,evnt)=>{
  setfilter(val);

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
              <Filters FilterSelected={FilterSelected}/>
            <Spotify Data={Data} Input={Input}/>
          </>}

      </div>
    </>
  );
}

export default App;
