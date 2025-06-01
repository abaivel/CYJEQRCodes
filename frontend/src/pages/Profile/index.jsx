import '../../style/Profile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import { getCookie } from '../../utils/cookies';

function Profile() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [openSnackbarError, setOpenSnackbarError] = useState(false)

  function formValid(){
    return prenom !== "" && nom !== "" && email !== ""; 
 }

useEffect(() => {
    fetch("/api/profile/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrenom(data.first_name)
        setNom(data.last_name)
        setEmail(data.email)
      })
      .catch((error) => {
        console.log(error)
         setOpenSnackbarError(true)
      });
  }, []);

  const handleSubmit = async () => {
    const csrfToken = getCookie("csrftoken");
    console.log(csrfToken)
    const response = await fetch("/api/profile/", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body:JSON.stringify({first_name:prenom, last_name:nom, email:email})
    });
    if (!response.ok){
      setOpenSnackbarError(true)
    }
    setReadOnly(true)
  };

 const handleLogout = async () => {
  const csrfToken = getCookie("csrftoken");
  console.log(csrfToken)
  const response = await fetch("/api/logout/", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken,
    },
  });

  if (response.ok) {
    window.location.replace('/');
  }else{
    setOpenSnackbarError(true)
  }
};


   return (
    <div className='div-profile-page'>
      <div className="div-profile-page-form-container white-container">
        <h2 className='profile-page-title'>Mon compte</h2>
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
            <Button color="secondary" style={{ marginTop: 16}} fullWidth variant="outlined" size="large" onClick={()=>window.location.replace("/change_password")}>Changer son mot de passe</Button>
            <Button color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="outlined" size="large" onClick={handleLogout}>Se déconnecter</Button>
          </div>
          :
          <Button disabled={!formValid()} color="secondary" style={{ marginTop: 16}} fullWidth variant="contained" size="large" onClick={()=>handleSubmit()}>Enregistrer</Button>
        }
        </div>
        <Snackbar
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbarError}
          autoHideDuration={5000}
          onClose={()=>setOpenSnackbarError(false)}
          message="Il y a eu une erreur"
        />
    </div>
   );
 }
 
 export default Profile;