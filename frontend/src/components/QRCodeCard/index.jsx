import '../../style/QRCodeCard.css';
import { QRCodeCanvas } from 'qrcode.react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';



function QRCodeCard({qrcode}) {
   const [anchorEl, setAnchorEl] = React.useState(null);
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
         <MenuItem onClick={handleClose}>Télécharger</MenuItem>
         <MenuItem onClick={handleClose}>Supprimer</MenuItem>
         </Menu>
      </div>
      <div className='qrcode-card-content'>
         <div className='qrcode-card-qrcode'>
         <QRCodeCanvas value={qrcode.sharelink}
                        size={256}
                        level="H" // Haute qualité de correction
         />
         </div>
      </div>
    </div>
  );
}

export default QRCodeCard;