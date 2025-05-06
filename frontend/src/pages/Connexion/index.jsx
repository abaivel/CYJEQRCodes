import '../../style/Connexion.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = en cours de chargement
  const [connexionSucceed, setConnexionSucceed] = useState(null);

  useEffect(() => {
    // Récupérer le token CSRF au premier chargement
    fetch("api/csrf/", {
      credentials: "include", // très important pour les cookies !
    });
    const checkAuth = async () => {
      const response = await fetch("http://localhost:8000/api/check-auth/", {
        credentials: "include",
      });

      const data = await response.json();

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  if (isAuthenticated === null) {
    return <div>Chargement...</div>;
  }else if (isAuthenticated){
    window.location.replace('/mesqrcodes');
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const csrfToken = getCookie("csrftoken");
    console.log(csrfToken)
    const response = await fetch("api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      window.location.replace('/mesqrcodes');
    }else{
      setConnexionSucceed(false);
    }
  };

  return (
    <div className='div-connexion_page'>
      <h1 className='connexion_page_app_name'>CYJE QR Codes</h1>
      <div className="div_connexion_page_form_container white-container">
        <h2 className='connexion_page_title'>Connexion</h2>
        {(connexionSucceed!=null && !connexionSucceed) && <p className='connexion_page_error_message'>L'adresse mail ou le mot de passe n'est pas juste</p>}
        <TextField value={email}
          onChange={(event)=>setEmail(event.target.value)} 
          color="secondary" 
          fullWidth 
          id="email" 
          label="Email" 
          variant="outlined" 
          margin="normal" />
        <TextField value={password}
          onChange={(event)=>setPassword(event.target.value)} 
          color="secondary" 
          fullWidth 
          id="password" 
          type='password'
          label="Mot de passe" 
          variant="outlined" 
          margin="normal" />
        <Button color="secondary" onClick={handleLogin} style={{ marginTop: 16, marginBottom: 24}} fullWidth variant="contained" size="large">Se connecter</Button>
      </div>
    </div>
  );
}

export default Connexion;
