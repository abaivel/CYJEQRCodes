import { Button} from '@mui/material';
import '../../style/ListQRCodes.css';
import {useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import QRCodeCard from '../../components/QRCodeCard';
import QRCodeForm from '../../components/QRCodeForm';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { getCookie } from '../../utils/cookies';




function ListQRCodes() {
 const [openQRCodeForm, setOpenQRCodeForm] = useState(false);
 const [listQRCodes, setlistQRCodes] = useState([])
 const [listQRCodesFiltres, setlistQRCodesFiltres] = useState([])
 const [loading, setLoading] = useState(true)

function handleOpenQRCodeForm(){
  setOpenQRCodeForm(true);
}

const handleCloseQRCodeForm = () => {
   setOpenQRCodeForm(false);
 };

function search(event){
  let txt = event.target.value;
  setlistQRCodesFiltres(listQRCodes.filter((qr)=> qr.nom.includes(txt)))
}

useEffect(() => {
  const csrfToken = getCookie("csrftoken");
  fetch(`/api/qrcodes/`,{
    method: "GET",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken,
    }
    })
      .then((response) => response.json()
      .then(( data ) => {
        setlistQRCodes(data)
        setlistQRCodesFiltres(data)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  )
}, [])


  return (
    <div className='listqrcodes_page'>
      <div className='listqrcodes-container-top-part'>
         <div className='listqrcodes-container-title'>
         <h2>Mes QR Codes</h2>
         <Button size="medium" variant="contained" color="secondary" onClick={handleOpenQRCodeForm}>Créer un QR Code</Button>
         </div>
         <TextField style={{width:400, maxWidth:"100%"}}
            variant="outlined"
            placeholder="Tapez le nom d'un QR Code"
            onChange={search}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
          }}/>
      </div>
      <div className='listqrcodes-container-list-qr-codes2' >
         {listQRCodesFiltres?.map((qr) => (
                  <QRCodeCard key={qr.id} qrcode={qr}></QRCodeCard>
               ))}
          {listQRCodes.length===0 && !loading ? <p>Vous n'avez pas de QR Codes</p> : null}
      </div>

      <Dialog open={openQRCodeForm} onClose={handleCloseQRCodeForm}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCodeForm qrcode= {{id : 0, nom:"", lien:"", type:""}} setDialogOpen={setOpenQRCodeForm} setQrCode={null} refresh={()=>window.location.reload()}/>
         </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListQRCodes;