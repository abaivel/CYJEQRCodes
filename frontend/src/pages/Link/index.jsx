import CircularProgress from '@mui/material/CircularProgress';
import {useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';

function Link() {
  const {sharelink} = useParams();
  const [loading, setLoading] = useState(true)
  const [link, setLink] = useState("")
  const [ignore, setIgnore] = useState(false)

  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

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
        sharelink: sharelink
      }),
    })
    .then((response) => response.json())
      .then(( data ) => {
        console.log(data)
        setLoading(false)
        setLink(data.lien)
        //window.location.replace(data.link);
      })
      .catch((error) => console.log(error));
    }
      setIgnore(true)
    }, [])

    if (!loading && link !== undefined && link.length>0){
      console.log(link)
      //window.location=link;
    }

   return (
     <div className='link-layout'>
      <CircularProgress color="primary" />
     </div>
   );
 }
 
 export default Link;