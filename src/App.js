
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
  const [loading, setloading] = useState(false)
  const [filters, setfilter] = useState('artist')
  const [totalitem, settotalitem] = useState(0)

  const Activecls = "nav-link active mx-2 text-white fw-bold";
  const Inactivecls = "nav-link mx-2 text-white fw-bold";
  const [next,setnext]=useState('')
  const [activeclass, setactiveclass] = useState([
    { name: "Artist", classn: Activecls },
    { name: "Album", classn: Inactivecls },
    { name: "Playlist", classn: Inactivecls },
    { name: "Audiobook", classn: Inactivecls },
  ])
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
    setloading(true);
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
        offset:0,
        limit: 5,
      }
    }).catch((e) => {
      console.log("Error" + e)
    })
    try {
      const add = `${filters}s`;
      setData(dat.data[add].items)
      setnext(dat.data[add].next)
      settotalitem(dat.data[add].total)
    } catch (error) {
      console.log("Data Fetched But Items not in object")
    }
    console.log(dat)
    setloading(false)
  }
  // Type navbar bg Color
  const FilterSelected = (val, evnt) => {
    setfilter(val);
    const updated = activeclass.filter((elme) => {
      return elme.name.toLowerCase() === val ? elme.classn = Activecls : elme.classn = Inactivecls
    })
    setactiveclass(updated)
  }
  

// Automate Next Search 

  const next_data = async ()=>{
    if(next===""){
      return false
    }
    const dat =await axios.get(next,{
      headers: {
        Authorization: `Bearer ${Token}`
      },
    }).catch((e)=>{
      console.log()
    })
    try {
      const add = `${filters}s`;
      setData([...Data , ...dat.data[add].items])
      setnext(dat.data[add].next)
    } catch (error) {
      console.log()
    }
    // setoffsetadd(offsetadd + 5)
    
  }
  
  let totaldocumentH ;
  let documentH;
  window.addEventListener('scroll',function(event){
    totaldocumentH = window.innerHeight + window.pageYOffset;
    documentH = document.querySelector('body').scrollHeight
    // console.log(totaldocumentH + "\t" + documentH)
    if(totaldocumentH === documentH && totalitem>0){
      console.log(totalitem)
      if(totalitem<=0){
        setnext('')
      }else{
        next_data();
        const change = totalitem-5;
        settotalitem(change);
        // console.log(change);
      }
    }
  })
  return (

    <>

      <Navbar Token={Token} Inputd={Inputd} fetched={fetched} Logout={Logout} filters={filters} />
      {
        loading ?
          <div className='d-flex align-items-center justify-content-center vh-100'>
            <div class="spinner-grow text-primary text-center" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>

          </div>
          :

          <div className="container text-center text-light">
            {!Token ?
              <>
                <h1 className='my-5'>Login to Search on Spotify</h1>
              </>
              : <>
                <Filters FilterSelected={FilterSelected} activeclass={activeclass} />
                <Spotify Data={Data} Input={Input}/>
              </>}

          </div>
      }
    </>
  );
}

export default App;
