import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import * as React from 'react';
import { getCookie } from '../../utils/cookies';

function UserForm({user, setUser, setDialogOpen, refresh}) {
   const [prenom, setPrenom] = React.useState(user.first_name);
   const [nom, setNom] = React.useState(user.last_name);
   const [email, setEmail] = React.useState(user.email);
   const [role, setRole] = React.useState( user.role);
   var title = "Modifier un utilisateur";
   const listRoles = ['Utilisateur', 'Administrateur', 'SuperAdministrateur']
   if (user.id===0){
      title = "Créer un utilisateur";
   }

   function formValid(){
      return prenom !== "" && nom !== "" && email !== "" && role !== ""; 
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      var data={}
      var url=""
      if (user.id === 0){
         data = {
            last_name:nom,
            first_name:prenom,
            email:email
          }
          url = "http://localhost:8000/api/users/"
      }else{
         data = {
            id : user.id,
            last_name:nom,
            first_name:prenom,
            email:email
          }
          url = "http://localhost:8000/api/users/"+user.id+"/"
      }
      console.log(data)
      if (role === "SuperAdministrateur"){
         data.is_superuser = true
      }else if (role === "Administrateur"){
         data.is_staff = true
         data.is_superuser = false
      }else{
         data.is_staff = false
         data.is_superuser = false
      }
      const csrfToken = getCookie("csrftoken");
      console.log(csrfToken)
      const response = await fetch(url, {
        method: user.id===0 ? "POST" : "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
      });
      if (response.ok){
         if (setUser!=null){
            setUser(data)
         }else{
            refresh()
         }
         setDialogOpen(false)
      }
    };

   return (
     <div>
      <h2 style={{margin:0, textAlign:'center'}}>{title}</h2>
      <TextField value={prenom}
         onChange={(event)=>setPrenom(event.target.value)} 
         color="secondary" 
         fullWidth 
         id="outlined-basic" 
         label="Prénom" 
         variant="outlined"
         required
         error={prenom === ""} 
         helperText={prenom === "" && "Prénom obligatoire"}
         margin="normal" />
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
      <TextField value={email}
         onChange={(event)=>setEmail(event.target.value)} 
         color="secondary" 
         fullWidth 
         id="outlined-basic" 
         label="Email" 
         variant="outlined"
         required
         error={email === ""} 
         helperText={email === "" && "Email obligatoire"}
         type='email' 
         margin="normal" />
      <FormControl sx={{ mt: 2 }} fullWidth error={role === ""} required>
      <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
      
      <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         label="Role"
         fullWidth
         color="secondary"
         value={role}
         required
         onChange={(event)=>setRole(event.target.value)}
      >
         {listRoles.map((r) => (
            <MenuItem key={r} value={r}>
              <ListItemText primary={r} />
            </MenuItem>
          ))}
      </Select>
      {role==="" && <FormHelperText>Rôle obligatoire</FormHelperText>}
      </FormControl>
      <Button onClick={handleSubmit} disabled={!formValid()} color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large">{user.id===0 ? "Créer" : "Modifier"}</Button>
     </div>
   );
 }
 
 export default UserForm;