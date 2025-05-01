import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import * as React from 'react';

function QRCodeForm({qrcode}) {
   const [nom, setNom] = React.useState(qrcode.nom);
   const [lien, setLien] = React.useState(qrcode.lien);
   const [type, setType] = React.useState(qrcode.type);
   const listTypes = ['','Formulaire', 'Page web']
   var title = "Modifier un QR Code";
   if (qrcode.qrcodeId===0){
      title = "Créer un QR Code";
   }

   function formValid(){
      return nom !== "" && lien !== "" && type !== ""; 
   }

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
         onChange={(event) => setType(event.target.value)}
      >
         {listTypes.map((r) => (
            <MenuItem key={r} value={r}>
              <ListItemText primary={r} />
            </MenuItem>
          ))}
      </Select>
      {type === "" && <FormHelperText>Type obligatoire</FormHelperText>}
      </FormControl>
      <Button disabled={!formValid()} color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large">{qrcode.qrcodeId===0 ? "Créer" : "Modifier"}</Button>
     </div>
   );
 }
 
 export default QRCodeForm;