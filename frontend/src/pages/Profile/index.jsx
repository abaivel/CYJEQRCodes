import '../../style/Profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';

function Profile() {
  const [prenom, setPrenom] = React.useState("Prenom");
  const [nom, setNom] = React.useState("nom");
  const [email, setEmail] = React.useState("prenom.nom@gmail.com");
  const [readOnly, setReadOnly] = React.useState(true);

  function formValid(){
    return prenom !== "" && nom !== "" && email !== ""; 
 }

 function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
}

 const handleLogout = async () => {
  const csrfToken = getCookie("csrftoken");
  console.log(csrfToken)
  const response = await fetch("http://localhost:8000/api/logout/", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken,
    },
  });

  if (response.ok) {
    window.location.replace('/');
  }
};


   return (
    <div className='div-profile-page'>
      <div className="div-profile-page-form-container white-container">
        <h2 className='profile-page-title'>Connexion</h2>
        <TextField value={prenom} 
          onChange={(event)=>setPrenom(event.target.value)} 
          error={prenom === ""} 
          helperText={prenom === "" && "Prénom obligatoire"}  
          color="secondary" 
          fullWidth 
          id="outlined-basic" 
          label="Prénom" 
          variant="outlined" 
          margin="normal" 
          slotProps={{input: {readOnly: readOnly,},}} />
        <TextField 
          value={nom} 
          onChange={(event)=>setNom(event.target.value)}
          error={nom === ""} 
          helperText={nom === "" && "Nom obligatoire"}
          color="secondary" 
          fullWidth 
          id="outlined-basic" 
          label="Nom" 
          variant="outlined" 
          margin="normal" 
          slotProps={{input: {readOnly: readOnly,},}} />
        <TextField 
          value={email} 
          onChange={(event)=>setEmail(event.target.value)}
          error={email === ""} 
          helperText={email === "" && "Email obligatoire"}
          color="secondary" 
          fullWidth 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          margin="normal" 
          slotProps={{input: {readOnly: readOnly,},}} />
        {readOnly ?
          <div>
            <Button color="secondary" style={{ marginTop: 16}} fullWidth variant="contained" size="large" onClick={()=>setReadOnly(false)}>Modifier</Button>
            <Button color="secondary" style={{ marginTop: 16}} fullWidth variant="outlined" size="large">Changer son mot de passe</Button>
            <Button color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="outlined" size="large" onClick={handleLogout}>Se déconnecter</Button>
          </div>
          :
          <Button disabled={!formValid()} color="secondary" style={{ marginTop: 16}} fullWidth variant="contained" size="large" onClick={()=>setReadOnly(true)}>Enregistrer</Button>
        }
        </div>
    </div>
   );
 }
 
 export default Profile;