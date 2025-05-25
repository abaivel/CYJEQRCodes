import CircularProgress from '@mui/material/CircularProgress';
import {useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { getCookie } from '../../utils/cookies';

function Link() {
  const {sharelink} = useParams();
  const [loading, setLoading] = useState(true)
  const [link, setLink] = useState("")
  const [ignore, setIgnore] = useState(false)
  const queryParameters = new URLSearchParams(window.location.search)
  const lieu = queryParameters.get("lieu")
  const design = queryParameters.get("design")

  useEffect(() => {
    const csrfToken = getCookie("csrftoken");
    console.log(sharelink)
    if (!ignore){
    fetch("http://localhost:8000/api/qrcodevisits/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        sharelink: sharelink,
        lieu : lieu,
        design : design
      }),
    })
    .then((response) => response.json())
      .then(( data ) => {
        console.log(data)
        setLoading(false)
        setLink(data.lien)
      })
      .catch((error) => console.log(error));
    }
      setIgnore(true)
    }, [])

    if (!loading && link !== undefined && link.length>0){
      console.log(link)
      window.location=link;
    }

   return (
     <div className='link-layout'>
      <CircularProgress color="primary" />
     </div>
   );
 }
 
 export default Link;