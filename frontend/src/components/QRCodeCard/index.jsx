import '../../style/QRCodeCard.css';
import { QRCodeCanvas } from 'qrcode.react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import {useRef, useState} from 'react';
import { getCookie } from '../../utils/cookies';



function QRCodeCard({qrcode}) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
   const qrRef = useRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
   event.preventDefault();
   event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
   event.preventDefault();
   event.stopPropagation();
    setAnchorEl(null);
  };

   function openQrCodePage(){
      window.location.replace('/qrcode/'+qrcode.id)
   }

   const handleDownload = (event) => {
      event.preventDefault()
      event.stopPropagation()
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) return;
  
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.png';
      link.click();
    };

    function handleOpenDeleteConfirmation(event){
      event.preventDefault()
      event.stopPropagation()
      setOpenDeleteConfirmation(true);
    }
    const handleCloseDeleteConfirmation = (event) => {
      event.preventDefault()
      event.stopPropagation()
      setOpenDeleteConfirmation(false);
    };

    const handleDelete = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      const csrfToken = getCookie("csrftoken");
      console.log(csrfToken)
      const response = await fetch("/api/qrcodes/"+qrcode.id+"/", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      if (response.ok){
         window.location.reload()
      }else{
        setOpenDeleteConfirmation(false)
      }
    };

  return (
    <div className='qrcode-card-container white-container' onClick={openQrCodePage}>
      <div className='qrcode-card-header'>
         <span style={{gridColumn: 1}}></span>
         <h3 style={{gridColumn: 2}}>{qrcode.nom}</h3>
         <IconButton style={{gridColumn: 3, padding: 0}} aria-label="retour" href='/mesqrcodes' onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
            'aria-labelledby': 'basic-button',
         }}
         >
         <MenuItem onClick={handleDownload}>Télécharger</MenuItem>
         <MenuItem onClick={handleOpenDeleteConfirmation}>Supprimer</MenuItem>
         </Menu>
      </div>
      <div className='qrcode-card-content'>
         <div className='qrcode-card-qrcode' ref={qrRef}>
         <QRCodeCanvas value={window.location.origin+"/link/"+qrcode.sharelink}
                        size={256}
                        level="H" // Haute qualité de correction
         />
         </div>
         
      </div>
      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <h3 style={{margin:0}}>Etes vous sûr de vouloir supprimer ce QR Code ? Tous les statistiques associés seront supprimés</h3>
              <div style={{ display: 'flex', gap: 10, marginTop:15 }}>
              <Button color='secondary' variant='outlined' style={{flex:1}} onClick={handleCloseDeleteConfirmation}>Annuler</Button>
              <Button onClick={handleDelete} color='secondary' variant='contained' style={{flex:1}}>Confirmer</Button>
              </div>
            </div>
         </DialogContent>
      </Dialog>
    </div>
  );
}

export default QRCodeCard;