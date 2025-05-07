import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import * as React from 'react';

function QRCodeForm({qrcode, setQrCode, setDialogOpen, refresh}) {
   const [nom, setNom] = React.useState(qrcode.nom);
   const [lien, setLien] = React.useState(qrcode.lien);
   var title = "Modifier un QR Code";
   if (qrcode.qrcodeId===0){
      title = "Créer un QR Code";
   }

   function formValid(){
      return nom !== "" && lien !== ""; 
   }
   function getCookie(name) {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
      return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
    }

   const handleSubmit = async (e) => {
      e.preventDefault();
      var data={}
      var url=""
      if (qrcode.qrcodeId === 0){
         data = {
            nom:nom,
            lien:lien
          }
          url = "http://localhost:8000/api/qrcodes/"
      }else{
         data = {
            id : qrcode.qrcodeId,
            nom:nom,
            lien:lien,
            sharelink:qrcode.sharelink,
            dateCreation : qrcode.dateCreation
          }
          url = "http://localhost:8000/api/qrcodes/"+qrcode.qrcodeId+"/"
      }
      console.log(data)
  
      const csrfToken = getCookie("csrftoken");
      console.log(csrfToken)
      const response = await fetch(url, {
        method: qrcode.qrcodeId===0 ? "POST" : "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
      });
      if (response.ok){
         if (setQrCode!=null){
            setQrCode(data)
         }else{
            refresh()
         }
         setDialogOpen(false)
      }
    };
/*
 nom = models.CharField(max_length=50)
   lien = models.CharField(max_length=150)
   sharelink = models.CharField(max_length=150)
   dateCreation = models.DateTimeField()
   user = models.ForeignKey(User, on_delete=models.CASCADE )
*/
   return (
     <div>
      <h2 style={{margin:0, textAlign:'center'}}>{title}</h2>
      <TextField value={nom}
         onChange={(event)=>setNom(event.target.value)} 
         color="secondary" 
         fullWidth 
         id="outlined-basic" 
         label="Nom" 
         variant="outlined"
         required
         error={nom === ""} 
         helperText={nom === "" && "Nom obligatoire"}
         margin="normal" />
      <TextField value={lien}
         onChange={(event)=>setLien(event.target.value)} 
         color="secondary" 
         fullWidth 
         id="outlined-basic" 
         label="Lien" 
         variant="outlined"
         required
         error={lien === ""} 
         helperText={lien === "" && "Lien obligatoire"}
         margin="normal" />
      <Button 
         onClick={handleSubmit}
         disabled={!formValid()} 
         color="secondary" 
         style={{ marginTop: 16, marginBottom: 24}} 
         fullWidth 
         variant="contained" 
         size="large">
         {qrcode.qrcodeId===0 ? "Créer" : "Modifier"}
      </Button>
     </div>
   );
 }
 
 export default QRCodeForm;