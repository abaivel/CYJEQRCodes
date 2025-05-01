import { Button} from '@mui/material';
import '../../style/ListQRCodes.css';
import { DataGrid } from '@mui/x-data-grid';
import {frFR} from '@mui/x-data-grid/locales';
import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Dialog, DialogContent } from '@mui/material';
import QRCodeForm from '../../components/QRCodeForm';




function ListQRCodes() {
 const [openQRCodePreview, setOpenQRCodePreview] = React.useState(false);
 const [openQRCodeForm, setOpenQRCodeForm] = React.useState(false);
const [qrValue, setQrValue] = React.useState('');
 const qrRef = useRef();

/*const handleOpen = (e,value) => {
   console.log(e);
   e.preventDefault();
   e.stopPropagation();
  setQrValue(value);
  setOpen(true);
};*/

function handleOpenQRCodePreview(e, value){
   e.preventDefault();
   e.stopPropagation();
  setQrValue(value);
  setOpenQRCodePreview(true);
}

function handleOpenQRCodeForm(){
  setOpenQRCodeForm(true);
}

const handleCloseQRCodePreview = () => {
  setOpenQRCodePreview(false);
};
const handleCloseQRCodeForm = () => {
   setOpenQRCodeForm(false);
 };

function openQrCodePage(id){
   console.log(id.ids)
   for (let item of id.ids.values()){
      window.location.replace('/qrcode/'+rows[item-1].qrcodeId)
   }
}

const handleDownload = () => {
   const canvas = qrRef.current.querySelector('canvas');
   if (!canvas) return;

   const url = canvas.toDataURL('image/png');
   const link = document.createElement('a');
   link.href = url;
   link.download = 'qr-code.png';
   link.click();
 };

const columns = [
   { field: 'id', headerName: 'ID', width: 70 },
   {
      field: 'Nom',
      headerName: 'Nom',
      description: 'Nom du QR code',
      sortable: true,
      flex: 1,
   },
   {
      field: 'Lien',
      headerName: 'Lien',
      description: 'Lien du QR code',
      sortable: false,
      flex: 2
   },
   {
      field: 'QRCode',
      headerName: 'QR Code',
      description: 'QR Code',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
         <div>
            <QRCodeCanvas onClick={(event)=>handleOpenQRCodePreview(event, params.value)} style={{cursor: 'pointer'}}
               value={params.value}
               size={64}
               level="H" // Haute qualité de correction
               includeMargin={true}
            />
         </div>
       ),
   },
   {
      field: 'nbVisites',
      headerName: 'Nombre de visites',
      description: 'Nombre de visites du QR code',
      sortable: true,
      flex: 1
   },
   {
      field: 'DateCreation',
      headerName: 'Date de création',
      description: 'Date de création du QR code',
      sortable: true,
      type: 'date',
      flex: 1,
      valueGetter: (params) => params && new Date(params), // On transforme la valeur en Date JS
      valueFormatter: (params) => params && params.toLocaleDateString('fr-FR'),
   },
   {
      field: 'Type',
      headerName: 'Type',
      description: 'Type du QR code',
      sortable: true,
      flex: 1
   },
 ];
 
 const rows = [
   {id:1, Nom: 'QRCode1', Lien: 'www.google.com', QRCode: 'www.google.com', nbVisites:50, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '252'},
   {id:2, Nom: 'QRCode2', Lien: 'www.google.com', QRCode: 'www.google.com', nbVisites:5, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '253'},
   {id:3, Nom: 'QRCode3', Lien: 'www.google.com', QRCode: 'www.google.com', nbVisites:10, DateCreation: '2025-04-02', Type: 'Formulaire', qrcodeId: '254'},
 ];
 /*<div className='listqrcodes-container-stats'>
         <h2 style={{margin:0}}>Vue d'ensemble</h2>
         <div className='listqrcodes-stats'>
            <div className='listqrcodes-stat' style={{backgroundColor:'#7f92df'}}>
               <p className='listqrcodes-stat-title'>Nombre de QR Codes créés</p>
               <p className='listqrcodes-stat-number'>12</p>
            </div>
            <div className='listqrcodes-stat' style={{backgroundColor:'#5e6ba3'}}>
               <p className='listqrcodes-stat-title'>Nombre de visites totales</p>
               <p className='listqrcodes-stat-number'>84</p>
            </div>
            <div className='listqrcodes-stat' style={{backgroundColor:'#244dc8'}}>
               <p className='listqrcodes-stat-title'>Nombre de visites dans les 7 dernières jours</p>
               <p className='listqrcodes-stat-number'>42</p>
            </div>
         </div>
      </div>*/
 
 const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div className='listqrcodes_page'>
      <div className='listqrcodes-container-title'>
         <h2>Mes QR Codes</h2>
         <Button size="medium" variant="contained" color="secondary" onClick={handleOpenQRCodeForm}>Créer un QR Code</Button>
      </div>
      <div className='listqrcodes-container-list-qr-codes'>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            getRowHeight={() => 'auto'}
            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
            onRowSelectionModelChange={(newRowSelectionModel) => {
               openQrCodePage(newRowSelectionModel);
             }}
            //autosizeOptions={autosizeOptions}
         />
      </div>
      <Dialog open={openQRCodePreview} onClose={handleCloseQRCodePreview}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: "column" }}>
            <div ref={qrRef}>
               <QRCodeCanvas value={qrValue} size={350} level="H" fgColor='#1e3a84' />
            </div>
            <Button color="secondary" onClick={handleDownload} fullWidth variant="contained" size="large">Télécharger</Button>
         </DialogContent>
      </Dialog>

      <Dialog open={openQRCodeForm} onClose={handleCloseQRCodeForm}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCodeForm qrcode= {{qrcodeId : 0, nom:"", lien:"", type:""}}/>
         </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListQRCodes;