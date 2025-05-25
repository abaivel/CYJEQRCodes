import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useRef, useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@mui/material';
import {useParams } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';
import QRCodeForm from '../../components/QRCodeForm';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import '../../style/QRCode.css';
import EditListLieu from '../../components/EditListLieu';
import EditListDesign from '../../components/EditListDesign';
import StatsQRCode from '../../components/StatsQRCode';
import { ChromePicker } from 'react-color';
import { getCookie } from '../../utils/cookies';
import ColorPicker from '../../components/ColorPicker';

function QRCode() {
  const {idQRCode} = useParams();
  const [qrCode, setQrCode] = useState({id:0,nom:"",lien:"",sharelink:""});
  const qrRef = useRef();
  const [openQRCodeForm, setOpenQRCodeForm] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openListLieu, setOpenListLieu] = useState(false);
  const [openListDesign, setOpenListDesign] = useState(false);
  const [listVisits, setListVisits] = useState([])
  const [lieu, setLieu] = useState(undefined);
  const [design, setDesign] = useState(undefined);
  const [listLieu, setListLieu] = useState([])
  const [listDesign, setListDesign] = useState([])
  const [color, setColor] = useState("#000000")

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    link.click();
  };

  function getUrlQRCode(){
    let url = window.location.origin+"/link/"+qrCode.sharelink
    if (lieu!=null || design!=null){
      url += "?"
      if (lieu!=null && design!=null){
        url += "lieu="+lieu.id + "&design=" + design.id
      }
      else if (lieu!=null){
        url+="lieu="+lieu.id
      }else if (design!=null){
        url += "design=" + design.id
      }
    }

    return url;
  }

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

  function handleOpenListLieu(){
    setOpenListLieu(true);
  }
  const handleCloseListLieu = () => {
    setOpenListLieu(false);
  };

function handleOpenListDesign(){
    setOpenListDesign(true);
  }
  const handleCloseListDesign = () => {
    setOpenListDesign(false);
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

  const handleDelete = async (e) => {
    const csrfToken = getCookie("csrftoken");
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
    async function fetchData(){
      let responseGetQrCode = await fetch(`http://localhost:8000/api/qrcodes/`+idQRCode+"/",{
        method: "GET",
        credentials: "include",
        })
      let dataGetQrCode = await responseGetQrCode.json()
      dataGetQrCode.qrcodeId = idQRCode
      setQrCode(dataGetQrCode)
      

      let responseGetVisits = await fetch(`http://localhost:8000/api/qrcodevisits/?qrcode_id=`+idQRCode,{
        method: "GET",
        credentials: "include",
        })
      let dataGetVisits = await responseGetVisits.json()
      setListVisits(dataGetVisits)

      let responseGetDesignList = await fetch(`http://localhost:8000/api/designqrcode/?idqrcode=`+idQRCode,{
      method: "GET",
      credentials: "include",
      })
      let dataGetDesignList = await responseGetDesignList.json()
      setListDesign(dataGetDesignList)

      let responseGetLieuList = await fetch(`http://localhost:8000/api/lieuqrcode/?idqrcode=`+idQRCode,{
      method: "GET",
      credentials: "include",
      })
      let dataGetLieuList = await responseGetLieuList.json()
      setListLieu(dataGetLieuList)
  }

  fetchData()

  }, [idQRCode])

  return (
    <div className='qrcode_page'>
      <div className='qrcode-container white-container'>
        <IconButton aria-label="retour" href='/mesqrcodes'>
          <ArrowBackIcon />
        </IconButton>
        
        <div className='qrcode_page_details'>
          <div className='qrcode-page-qrcode'>
          <div ref={qrRef}>
            <QRCodeCanvas value={getUrlQRCode()} size={300} level="H" fgColor={color} />
          </div>
          {qrCode.type === "Affiche" && <div style={{display: "flex",flexDirection: "column",gap: 15}}>
            <div style={{display:"flex"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Lieu</InputLabel>
              
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  fullWidth
                  color="secondary"
                  value={lieu}
                  required
                  onChange={(event)=>setLieu(event.target.value)}
              >
                <MenuItem value={undefined}>
                      <ListItemText primary="Aucun" />
                    </MenuItem>
                  {listLieu?.map((r) => (
                    <MenuItem key={r.id} value={r}>
                      <ListItemText primary={r.nom} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <IconButton aria-label="edit" onClick={handleOpenListLieu}>
              <EditIcon />
            </IconButton>
            </div>
            <div style={{display:"flex"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Design</InputLabel>
              
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  fullWidth
                  color="secondary"
                  value={design}
                  required
                  onChange={(event)=>setDesign(event.target.value)}
              >
                <MenuItem value={undefined}>
                      <ListItemText primary="Aucun" />
                    </MenuItem>
                  {listDesign?.map((r) => (
                    <MenuItem key={r.id} value={r}>
                      <ListItemText primary={r.nom} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <IconButton aria-label="edit" onClick={handleOpenListDesign}>
              <EditIcon />
            </IconButton>
            </div>
          </div>
          }
          <ColorPicker color={color} setColor={setColor}/>
          <Button color="secondary" onClick={handleDownload} variant="contained" size="large">Télécharger</Button>
          </div>
          <div className='qrcode_page_infos'>
            <h2>{qrCode.nom}</h2>
            <p>Lien : {qrCode.lien}</p>
            <p>Créé le : {formatDate(qrCode.dateCreation)}</p>
            <div style={{display:"flex"}}>
              <p>Lien de partage : {getUrlQRCode()}</p>
              <IconButton aria-label="copy" onClick={()=>navigator.clipboard.writeText(getUrlQRCode())}>
                <ContentCopyIcon />
              </IconButton>
            </div>
            <Button color="secondary" style={{ marginTop: 16, marginRight:10}} variant="contained" size="large" onClick={handleOpenQRCodeForm}>Modifier</Button>
            <Button color="secondary" style={{ marginTop: 16}} variant="contained" size="large" onClick={handleOpenDeleteConfirmation}>Supprimer</Button>
          </div>
        </div>
        <StatsQRCode listVisits={listVisits} listDesign={listDesign} listLieu={listLieu} type={qrCode.type}/>
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
              <Button color='secondary' variant='outlined' style={{flex:1}} onClick={handleCloseDeleteConfirmation}>Annuler</Button>
              <Button onClick={handleDelete} color='secondary' variant='contained' style={{flex:1}}>Confirmer</Button>
              </div>
            </div>
         </DialogContent>
      </Dialog>

      <Dialog open={openListLieu} onClose={handleCloseListLieu}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <EditListLieu listLieu={listLieu} setListLieu={setListLieu} idqrcode={idQRCode}/>
         </DialogContent>
      </Dialog>

      <Dialog open={openListDesign} onClose={handleCloseListDesign}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <EditListDesign listDesign={listDesign} setListDesign={setListDesign} idqrcode={idQRCode}/>
         </DialogContent>
      </Dialog>
    </div>
   );
 }
 
 export default QRCode;