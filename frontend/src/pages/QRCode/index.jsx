import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@mui/material';
import {useParams } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import QRCodeForm from '../../components/QRCodeForm';
import { LineChart } from '@mui/x-charts/LineChart';
import '../../style/QRCode.css';

function QRCode() {
  const {idQRCode} = useParams();
  const [nom, setNom] = React.useState("Nom du QR Code");
  const [lien, setLien] = React.useState("www.google.com");
  const [type, setType] = React.useState("Page web");
  const [dateCreation, setDateCreation] = React.useState("01/02/2025");
  const [sharelink, setSharelink] = React.useState("gbhrbfgbh");
  const qrRef = useRef();
  const [openQRCodeForm, setOpenQRCodeForm] = React.useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = React.useState(false);

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

  return (
    <div className='qrcode_page'>
      <div className='qrcode-container'>
        <IconButton aria-label="retour" href='/mesqrcodes'>
          <ArrowBackIcon />
        </IconButton>
        <div className='qrcode_page_details'>
          <div className='qrcode-page-qrcode'>
          <div ref={qrRef}>
            <QRCodeCanvas value={window.location.origin+sharelink} size={350} level="H" fgColor='#1e3a84' />
          </div>
          <Button color="secondary" onClick={handleDownload} variant="outlined" size="large">Télécharger</Button>
          </div>
          <div className='qrcode_page_infos'>
            <h2>{nom}</h2>
            <p>Lien : {lien}</p>
            <p>Type : {type}</p>
            <p>Créé le : {dateCreation}</p>
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
            <QRCodeForm qrcode= {{qrcodeId : idQRCode, nom:nom, lien:lien, type:type}}/>
         </DialogContent>
      </Dialog>

      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <h3 style={{margin:0}}>Etes vous sûr de vouloir supprimer ce QR Code ? Tous les statistiques associés seront supprimés</h3>
              <div style={{ display: 'flex', gap: 10, marginTop:15 }}>
              <Button color='secondary' variant='outlined' style={{flex:1}}>Annuler</Button>
              <Button color='secondary' variant='contained' style={{flex:1}}>Confirmer</Button>
              </div>
            </div>
         </DialogContent>
      </Dialog>
    </div>
   );
 }
 
 export default QRCode;