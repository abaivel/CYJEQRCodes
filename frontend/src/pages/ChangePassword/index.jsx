import '../../style/Profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import { getCookie } from '../../utils/cookies';

function ChangePassword() {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
   const [errorMessage, setErrorMessage] = useState("")

  function formValid(){
    return oldPassword !== "" && newPassword !== "" && newPasswordConfirm !== "" && newPassword.length>=8 && newPassword === newPasswordConfirm; 
 }

const handleChangePassword = async (e) => {
   e.preventDefault();
   const csrfToken = getCookie("csrftoken");

   const response = await fetch("/api/change-password/", {
     method: "POST",
     credentials: "include",
     headers: {
       "Content-Type": "application/json",
       "X-CSRFToken": csrfToken,
     },
     body: JSON.stringify({
       old_password: oldPassword,
       new_password: newPassword,
     }),
   });
   if (!response.ok){
    setErrorMessage("L'ancien mot de passe n'est pas correct")
   }
   window.location.replace("/profil")
}


   return (
    <div className='div-profile-page'>
      <div className="div-profile-page-form-container white-container">
        <h2 className='profile-page-title'>Changer le mot de passe</h2>
        <p style={{color:"#ff0000"}}>{errorMessage}</p>
        <TextField value={oldPassword} 
          onChange={(event)=>setOldPassword(event.target.value)} 
          error={oldPassword === ""} 
          color="secondary" 
          fullWidth
          type='password'
          id="outlined-basic" 
          label="Ancien mot de passe" 
          variant="outlined" 
          margin="normal" />
        <TextField 
          value={newPassword} 
          onChange={(event)=>setNewPassword(event.target.value)}
          error={newPassword === "" || newPassword.length<8} 
          helperText={newPassword.length<8 && "Le mot de passe doit avoir au moins 8 caractères"}
          color="secondary" 
          fullWidth 
          type='password'
          id="outlined-basic" 
          label="Nouveau mot de passe" 
          variant="outlined" 
          margin="normal"  />
        <TextField 
          value={newPasswordConfirm} 
          onChange={(event)=>setNewPasswordConfirm(event.target.value)}
          error={newPasswordConfirm === "" || newPassword!== newPasswordConfirm} 
          helperText={newPassword!==newPasswordConfirm && "Les mots de passe ne correspondent pas."}
          color="secondary" 
          fullWidth 
          type='password'
          id="outlined-basic" 
          label="Confirmer le nouveau mot de passe" 
          variant="outlined" 
          margin="normal"  />

         <Button disabled={!formValid()} color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large" onClick={handleChangePassword}>Modifier</Button>
            
        </div>
    </div>
   );
 }
 
 export default ChangePassword;