import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import { getCookie } from '../../utils/cookies';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';

function QRCodeForm({qrcode, setQrCode, setDialogOpen, refresh}) {
   const [nom, setNom] = React.useState(qrcode.nom);
   const [lien, setLien] = React.useState(qrcode.lien);
   const [type, setType] = React.useState(qrcode.type);
   const listTypes = ["Affiche", "Autre"]
   var title = "Modifier un QR Code";
   if (qrcode.qrcodeId===0){
      title = "Créer un QR Code";
   }

   function formValid(){
      return nom !== "" && lien !== ""; 
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      var data={}
      var url=""
      if (qrcode.qrcodeId === 0){
         data = {
            nom:nom,
            lien:lien,
            type:type
          }
          url = "http://localhost:8000/api/qrcodes/"
      }else{
         data = {
            id : qrcode.qrcodeId,
            nom:nom,
            lien:lien,
            sharelink:qrcode.sharelink,
            dateCreation : qrcode.dateCreation,
            type:type
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
         <FormControl sx={{ mt: 2 }} fullWidth error={type === ""} required>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               label="Type"
               fullWidth
               color="secondary"
               value={type}
               required
               onChange={(event)=>setType(event.target.value)}
            >
               {listTypes.map((r) => (
                  <MenuItem key={r} value={r}>
                     <ListItemText primary={r} />
                  </MenuItem>
                  ))}
            </Select>
            {type==="" && <FormHelperText>Type obligatoire</FormHelperText>}
         </FormControl>
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