import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import * as React from 'react';

function UserForm({user}) {
   const [prenom, setPrenom] = React.useState(user.Prenom);
   const [nom, setNom] = React.useState(user.Nom);
   const [email, setEmail] = React.useState(user.Email);
   const [roles, setRoles] = React.useState( user.Roles!="" ? user.Roles.split(", ") : []);
   var title = "Modifier un utilisateur";
   const listRoles = ['Utilisateur', 'Administrateur', 'SuperAdministrateur']
   if (user.UserId==0){
      title = "Créer un utilisateur";
   }
   const handleChangeRoles = (event) => {
      const {
        target: { value },
      } = event;
      setRoles(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

   function formValid(){
      return prenom != "" && nom != "" && email != "" && roles.length>0; 
   }

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
      <FormControl sx={{ mt: 2 }} fullWidth error={roles.length==0} required>
      <InputLabel id="demo-simple-select-label">Rôles</InputLabel>
      
      <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         label="Roles"
         fullWidth
         color="secondary"
         value={roles}
         required
         onChange={handleChangeRoles}
         renderValue={(selected) => selected.join(', ')}
         multiple
      >
         {listRoles.map((r) => (
            <MenuItem key={r} value={r}>
              <Checkbox checked={roles.includes(r)} />
              <ListItemText primary={r} />
            </MenuItem>
          ))}
      </Select>
      {roles.length==0 && <FormHelperText>Rôle obligatoire</FormHelperText>}
      </FormControl>
      <Button disabled={!formValid()} color="secondary" style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large">{user.UserId==0 ? "Créer" : "Modifier"}</Button>
     </div>
   );
 }
 
 export default UserForm;