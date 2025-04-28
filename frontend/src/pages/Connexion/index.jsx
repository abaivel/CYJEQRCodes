import '../../style/Connexion.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Connexion() {
  function login(){
    window.location.replace('/mesqrcodes');
  }

  return (
    <div className='div-connexion_page'>
      <h1 className='connexion_page_app_name'>CYJE QR Codes</h1>
      <div className="div_connexion_page_form_container">
        <h2 className='connexion_page_title'>Connexion</h2>
        <TextField color="secondary" fullWidth id="outlined-basic" label="Email" variant="outlined" margin="normal" />
        <TextField color="secondary" fullWidth id="outlined-basic" label="Mot de passe" variant="outlined" margin="normal" />
        <Button color="secondary" onClick={login} style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large">Se connecter</Button>
      </div>
    </div>
  );
}

export default Connexion;
