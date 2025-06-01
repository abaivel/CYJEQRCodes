import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import { getCookie } from '../../utils/cookies';
import CloseIcon from '@mui/icons-material/Close';

function EditListLieu({listLieu, setListLieu, idqrcode, setDialogOpen}) {
const [lieuSelected, setLieuSelected] = useState(null)

   async function handleCreate(){
      var data={
         nom : lieuSelected.nom,
         qrcode : idqrcode
      }
      var url="http://localhost:8000/api/lieuqrcode/"
      const csrfToken = getCookie("csrftoken");
      console.log(csrfToken)
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
      });
      if (response.ok){
         let data = await response.json()
         listLieu.push(data)
         setLieuSelected(null)

      }
   }

   async function handleSave(){
      var data={
         id : lieuSelected.id,
         nom : lieuSelected.nom,
         qrcode : idqrcode
      }
      var url="http://localhost:8000/api/lieuqrcode/"+lieuSelected.id+"/"
      const csrfToken = getCookie("csrftoken");
      console.log(csrfToken)
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
      });
      if (response.ok){
         setListLieu(prev =>
            prev.map(item =>
               item.id === data.id ? data : item
            )
         );
         setLieuSelected(null)
      }
   }

   async function handleDelete(id){
      var url="http://localhost:8000/api/lieuqrcode/"+id+"/"
      const csrfToken = getCookie("csrftoken");
      console.log(csrfToken)
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      if (response.ok){
         setListLieu(prev => prev.filter(item => item.id !== id));
         setLieuSelected(null)
      }
   }

  return <div>
   <h3 style={{marginTop:0,marginRight: 20,marginLeft: 20}}>Liste des lieux pour ce QR Code</h3>
   <IconButton
          aria-label="close"
          onClick={()=>setDialogOpen(false)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
   <div style={{borderTop:"1px solid black",display: "flex",flexDirection: "column",alignItems: "center"}}>
   {listLieu.map((design) => (
       lieuSelected!=null && design.id === lieuSelected.id ? 
         <div key={design.id} style={{display:"flex", alignItems: "center", borderBottom:"1px solid black", width: "100%"}}>
            <TextField style={{flex: 1}} value={lieuSelected.nom} onChange={(event)=>setLieuSelected({id: design.id, nom:event.target.value})} id="standard-basic" variant="standard" />
            <IconButton aria-label="edit" onClick={handleSave}>
               <SaveIcon />
            </IconButton>
         </div> :
      <div key={design.id} style={{display:"flex", alignItems: "center", borderBottom:"1px solid black", width: "100%"}}>
         <p style={{flex: 1}}>{design.nom}</p>

         <IconButton aria-label="edit" onClick={()=>setLieuSelected(design)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={()=>handleDelete(design.id)}>
            <DeleteIcon />
          </IconButton>
      </div>
   ))}
   {lieuSelected == null || lieuSelected.id>0 ?
   <IconButton aria-label="edit" style={{width:"fit-content"}} onClick={()=>setLieuSelected({id:0,nom:""})}>
      <AddIcon />
   </IconButton>
   :
   <div style={{display:"flex", alignItems: "center", borderBottom:"1px solid black", width: "100%"}}>
      <TextField style={{flex: 1}} value={lieuSelected.nom} onChange={(event)=>setLieuSelected({id: 0, nom:event.target.value})} id="standard-basic" variant="standard" />
      <IconButton aria-label="edit" onClick={handleCreate}>
         <SaveIcon />
      </IconButton>
   </div>
   }
   </div>
  </div>
}

export default EditListLieu;