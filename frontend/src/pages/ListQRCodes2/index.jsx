import { Button} from '@mui/material';
import '../../style/ListQRCodes.css';
import { DataGrid } from '@mui/x-data-grid';
import {frFR} from '@mui/x-data-grid/locales';
import React, { useRef, useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Dialog, DialogContent } from '@mui/material';
import QRCodeCard from '../../components/QRCodeCard';
import QRCodeForm from '../../components/QRCodeForm';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';




function ListQRCodes() {
 const [openQRCodeForm, setOpenQRCodeForm] = useState(false);
const [qrValue, setQrValue] = useState('');
 const qrRef = useRef();
 const [listQRCodes, setlistQRCodes] = useState([])
 const {loading, setLoading} = useState(true)
 const {refresh, setRefresh} = useState(0)

function handleOpenQRCodeForm(){
  setOpenQRCodeForm(true);
}

const handleCloseQRCodeForm = () => {
   setOpenQRCodeForm(false);
 };
 
 function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
}
 /*const rows = [
   {id:1, Nom: 'QRCode1', Lien: 'www.google.com', sharelink: 'www.google.com', nbVisites:50, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '252'},
   {id:2, Nom: 'QRCode2', Lien: 'www.linkedin.com', sharelink: 'www.linkedin.com', nbVisites:5, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '253'},
   {id:3, Nom: 'QRCode3', Lien: 'github.com', sharelink: 'github.com', nbVisites:10, DateCreation: '2025-04-02', Type: 'Site web', qrcodeId: '254'},
   {id:1, Nom: 'QRCode4', Lien: 'www.facebook.com', sharelink: 'www.facebook.com', nbVisites:50, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '255'},
   {id:2, Nom: 'QRCode5', Lien: 'www.instagram.com', sharelink: 'www.instagram.com', nbVisites:5, DateCreation: '2025-04-02', Type: 'Site web', qrcodeId: '256'},
   {id:3, Nom: 'QRCode6', Lien: 'www.spotify.com', sharelink: 'www.spotify.com', nbVisites:10, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '257'},
 
];*/
useEffect(() => {
  const csrfToken = getCookie("csrftoken");
  fetch(`http://localhost:8000/api/qrcodes/`,{
    method: "GET",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken,
    }
    })
      .then((response) => response.json()
      .then(( data ) => {
        setlistQRCodes(data)
      })
      .catch((error) => console.log(error))
  )
}, [])


  return (
    <div className='listqrcodes_page'>
      <div className='listqrcodes-container-title'>
         <div style={{display: "flex",alignItems: "center",gap: 30}}>
         <h2>Mes QR Codes</h2>
         <TextField style={{width: 300}}
        variant="outlined"
        placeholder="Tapez le nom d'un QR Code"
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
         <Button size="medium" variant="contained" color="secondary" onClick={handleOpenQRCodeForm}>Créer un QR Code</Button>
      </div>
      <div className='listqrcodes-container-list-qr-codes2' >
        
         {listQRCodes?.map((qr) => (
                  <QRCodeCard key={qr.id} qrcode={qr}></QRCodeCard>
               ))}
      </div>

      <Dialog open={openQRCodeForm} onClose={handleCloseQRCodeForm}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCodeForm qrcode= {{qrcodeId : 0, nom:"", lien:"", type:""}} setDialogOpen={setOpenQRCodeForm} setQrCode={null} refresh={()=>window.location.reload()}/>
         </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListQRCodes;