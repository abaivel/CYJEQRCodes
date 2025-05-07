import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useRef, useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@mui/material';
import {useParams } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import QRCodeForm from '../../components/QRCodeForm';
import { LineChart } from '@mui/x-charts/LineChart';
import '../../style/QRCode.css';

function QRCode() {
  const {idQRCode} = useParams();
  const [qrCode, setQrCode] = useState({id:0,nom:"",lien:"",sharelink:""});
  const qrRef = useRef();
  const [openQRCodeForm, setOpenQRCodeForm] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    link.click();
  };

  function handleOpenQRCodeForm(){
    setOpenQRCodeForm(true);
  }
  const handleCloseQRCodeForm = () => {
    setOpenQRCodeForm(false);
  };

  function handleOpenDeleteConfirmation(){
    setOpenDeleteConfirmation(true);
  }
  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 car janvier = 0
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  const handleDelete = async (e) => {
    const csrfToken = getCookie("csrftoken");
    console.log(csrfToken)
    const response = await fetch("http://localhost:8000/api/qrcodes/"+idQRCode+"/", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    if (response.ok){
      window.location.replace('/mesqrcodes');
    }else{
      setOpenDeleteConfirmation(false)
    }
  };

  useEffect(() => {
    console.log(qrCode)
    //const csrfToken = getCookie("csrftoken");
    fetch(`http://localhost:8000/api/qrcodes/`+idQRCode+"/",{
      method: "GET",
      credentials: "include",
      })
        .then((response) => response.json()
        .then(( data ) => {
          data.qrcodeId = idQRCode
          setQrCode(data)
        })
        .catch((error) => console.log(error))
    )
  }, [])

  return (
    <div className='qrcode_page'>
      <div className='qrcode-container white-container'>
        <IconButton aria-label="retour" href='/mesqrcodes'>
          <ArrowBackIcon />
        </IconButton>
        <div className='qrcode_page_details'>
          <div className='qrcode-page-qrcode'>
          <div ref={qrRef}>
            <QRCodeCanvas value={window.location.origin+"/link/"+qrCode.sharelink} size={350} level="H" />
          </div>
          <Button color="secondary" onClick={handleDownload} variant="contained" size="large">Télécharger</Button>
          </div>
          <div className='qrcode_page_infos'>
            <h2>{qrCode.nom}</h2>
            <p>Lien : {qrCode.lien}</p>
            <p>Créé le : {formatDate(qrCode.dateCreation)}</p>
            <Button color="secondary" style={{ marginTop: 16}} fullWidth variant="contained" size="large" onClick={handleOpenQRCodeForm}>Modifier</Button>
            <Button color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large" onClick={handleOpenDeleteConfirmation}>Supprimer</Button>
          </div>
        </div>
        <h2>Statistiques</h2>
        <LineChart
          series={[
            { curve: "linear", data: [1, 5, 2, 6, 3, 9.3] },
            { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
          ]}
        />
      </div>
      <Dialog open={openQRCodeForm} onClose={handleCloseQRCodeForm}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCodeForm qrcode= {qrCode} setQrCode={setQrCode} setDialogOpen={setOpenQRCodeForm}/>
         </DialogContent>
      </Dialog>

      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <h3 style={{margin:0}}>Etes vous sûr de vouloir supprimer ce QR Code ? Tous les statistiques associés seront supprimés</h3>
              <div style={{ display: 'flex', gap: 10, marginTop:15 }}>
              <Button color='secondary' variant='outlined' style={{flex:1}}>Annuler</Button>
              <Button onClick={handleDelete} color='secondary' variant='contained' style={{flex:1}}>Confirmer</Button>
              </div>
            </div>
         </DialogContent>
      </Dialog>
    </div>
   );
 }
 
 export default QRCode;