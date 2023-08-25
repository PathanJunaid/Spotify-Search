This is Project to fetch Data from Spotify Api


Token: It is provided by spotify By using Authorization link

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

Login href 
  href={`${End_P}?client_id=${Client_ID}&redirect_uri=${Redirect}&response_type=${Resp_T}`}


we are using axios to fetch data
<!-- >>>npm i axios -->

we are just searching with only artists name

const dat = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${Token}`
            },
            params: {
                q: Input,
                type: "artist,album,playlist,track,show,episode,audiobook",

            }
        }).catch((e) => {
            console.log("Error" + e)
        })

        Input is carry the typed input value

        
