import { Button } from '@mui/material';
import '../../style/ListUsers.css';
import { DataGrid } from '@mui/x-data-grid';
import {frFR} from '@mui/x-data-grid/locales';
import UserForm from '../../components/UserForm';
import {useState, useEffect} from 'react';
import { Dialog, DialogContent } from '@mui/material';

function ListUsers() {
   const [open, setOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [listUsers, setListUsers] = useState([])
  const [authorized, setAuthorized] = useState(false)
  
  function handleOpen(value){
    console.log(value)
    setUserSelected(value);
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteConfirmation = (value) => {
    console.log(value)
    setUserSelected(value)
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  function getCookie(name) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  useEffect(() => {
    const csrfToken = getCookie("csrftoken");
    fetch(`http://localhost:8000/api/users/`,{
      method: "GET",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrfToken,
      }
      })
        .then((response) => response.json()
        .then(( data ) => {
          setListUsers(data)
          setAuthorized(true)
        })
        .catch((error) => console.log(error))
    )
  }, [])

  const handleDelete = async (e) => {
    const csrfToken = getCookie("csrftoken");
    console.log(csrfToken)
    const response = await fetch("http://localhost:8000/api/users/"+userSelected.id+"/", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    if (response.ok){
      window.location.reload()
    }else{
      setOpenDeleteConfirmation(false)
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'first_name', 
      headerName: 'Prénom', 
      description:"Prénom de l'utilisateur",
      sortable:true,
      flex:1
    },
    {
       field: 'last_name',
       headerName: 'Nom',
       description: "Nom de l'utilisateur",
       sortable: true,
       flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      description: "Email de l'utilisateur",
      sortable: true,
      flex: 1
   },
   {
      field: 'role',
      headerName: 'Rôles',
      description: "Rôles de l'utilisateur",
      flex: 1
  },
  {
        field: 'modifier',
        headerName: '',
        flex:0.5,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <div>
           <Button variant="contained" onClick={()=>handleOpen(params.row)}>
           Modifier
         </Button>
         </div>
         ),
     },
     {
          field: 'supprimer',
          headerName: '',
          flex:0.5,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <div>
            <Button variant="contained" onClick={()=>handleOpenDeleteConfirmation(params.row)}>
            Supprimer
          </Button>
          </div>
          ),
      }
  ];
  
  /*const rows = [
    {id:1, Nom: 'Nom1',Prenom: 'Prenom1', Email:'Email1', Roles: 'Utilisateur', UserId:121},
    {id:2, Nom: 'Nom2',Prenom: 'Prenom1', Email:'Email1', Roles: 'Utilisateur, Administrateur', UserId:122},
    {id:3, Nom: 'Nom3',Prenom: 'Prenom1', Email:'Email1', Roles: 'Utilisateur', UserId:123},
  ];*/
  
  const paginationModel = { page: 0, pageSize: 5 };

  if (!authorized){
    return <div></div>
  }

   return (
     <div className='listusers_page'>
       <div className='listusers-container-title'>
          <h2>Utilisateurs</h2>
          <Button size="medium" variant="contained" color="secondary" onClick={()=> handleOpen({last_name: '',first_name: '', email:'', role: '', id:0})}>Créer un utilisateur</Button>
       </div>
       <div className='listusers-container-list-users white-container'>
          <DataGrid
             rows={listUsers}
             columns={columns}
             initialState={{ pagination: { paginationModel } }}
             pageSizeOptions={[5, 10]}
             sx={{ border: 0 }}
             disableRowSelectionOnClick
             localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          />
       </div>
       <Dialog open={open} onClose={handleClose}>
         <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <UserForm user= {userSelected} setDialogOpen={setOpenDeleteConfirmation} setUser={null} refresh={()=>window.location.reload()}/>
         </DialogContent>
      </Dialog>
      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <h3 style={{margin:0}}>Etes vous sûr de vouloir supprimer cet utilisateur ? Tous ses QR Codes et statistiques seront supprimés</h3>
            <div style={{ display: 'flex', gap: 10, marginTop:15 }}>
            <Button color='secondary' variant='outlined' style={{flex:1}}>Annuler</Button>
            <Button onClick={handleDelete} color='secondary' variant='contained' style={{flex:1}}>Confirmer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
     </div>
   );
 }
 
 export default ListUsers;