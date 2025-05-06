import { Button } from '@mui/material';
import '../../style/ListUsers.css';
import { DataGrid } from '@mui/x-data-grid';
import {frFR} from '@mui/x-data-grid/locales';
import UserForm from '../../components/UserForm';
import * as React from 'react';
import { Dialog, DialogContent } from '@mui/material';

function ListUsers() {
   const [open, setOpen] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState(null);
  
  function handleOpen(value){
    console.log(value)
    setUserSelected(value);
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'Prenom', 
      headerName: 'Prénom', 
      description:"Prénom de l'utilisateur",
      sortable:true,
      flex:1
    },
    {
       field: 'Nom',
       headerName: 'Nom',
       description: "Nom de l'utilisateur",
       sortable: true,
       flex: 1
    },
    {
      field: 'Email',
      headerName: 'Email',
      description: "Email de l'utilisateur",
      sortable: true,
      flex: 1
   },
   {
      field: 'Roles',
      headerName: 'Rôles',
      description: "Rôles de l'utilisateur",
      flex: 1
  },
  {
        field: 'UserId',
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
     }
  ];
  
  const rows = [
    {id:1, Nom: 'Nom1',Prenom: 'Prenom1', Email:'Email1', Roles: 'Utilisateur', UserId:121},
    {id:2, Nom: 'Nom2',Prenom: 'Prenom1', Email:'Email1', Roles: 'Utilisateur, Administrateur', UserId:122},
    {id:3, Nom: 'Nom3',Prenom: 'Prenom1', Email:'Email1', Roles: 'Utilisateur', UserId:123},
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };
   return (
     <div className='listusers_page'>
       <div className='listusers-container-title'>
          <h2>Utilisateurs</h2>
          <Button size="medium" variant="contained" color="secondary" onClick={()=> handleOpen({Nom: '',Prenom: '', Email:'', Roles: '', UserId:0})}>Créer un utilisateur</Button>
       </div>
       <div className='listusers-container-list-users white-container'>
          <DataGrid
             rows={rows}
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
            <UserForm user= {userSelected}/>
         </DialogContent>
      </Dialog>
     </div>
   );
 }
 
 export default ListUsers;