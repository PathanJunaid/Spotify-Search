
import { useEffect, useState } from 'react';
import './App.css';
import Spotify from './Components/Spotify';

function App() {
  const [Token, setToken] = useState("")
  const Client_ID = "e70d95578b724f8d8b628db5d28333a8";
  const Redirect = "http://localhost:3000/";
  const End_P = "https://accounts.spotify.com/authorize";
  const Resp_T = "token";
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find((ele) => ele.startsWith("access_token")).split("=")[1];
      window.localStorage.setItem("token", token);
    }
      setToken(token)
  }, [])



  const Logout = () => {
    window.localStorage.removeItem("token")
    setToken("")
  }

  return (
    <div className="container text-center text-light">
      {!Token ?
        <>
          <h1 className='my-5'>Spotify Login</h1>
          <a
            className="btn btn-primary"
            href={`${End_P}?client_id=${Client_ID}&redirect_uri=${Redirect}&response_type=${Resp_T}`}
          > Login
          </a>

        </>

        : <>
          <h3 className=' my-5 text-light'>
            Search Song by Name of Artists
            <button className='btn btn-primary my-5 float-end' onClick={() => { Logout() }}>Logout</button>
            </h3>
          <Spotify Token={Token} />
          <button className='btn btn-primary my-5' onClick={() => { Logout() }}>Logout</button>
        </>}

    </div>
  );
}

export default App;
