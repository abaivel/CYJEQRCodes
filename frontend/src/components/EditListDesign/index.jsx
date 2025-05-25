import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import { getCookie } from '../../utils/cookies';

function EditListDesign({listDesign, setListDesign, idqrcode}) {
   const [designSelected, setDesignSelected] = useState(null)

   async function handleCreate(){
      var data={
         nom : designSelected.nom,
         qrcode : idqrcode
      }
      var url="http://localhost:8000/api/designqrcode/"
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
         listDesign.push(data)
         setDesignSelected(null)

      }
   }

   async function handleSave(){
      var data={
         id : designSelected.id,
         nom : designSelected.nom,
         qrcode : idqrcode
      }
      var url="http://localhost:8000/api/designqrcode/"+designSelected.id+"/"
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
         setListDesign(prev =>
            prev.map(item =>
               item.id === data.id ? data : item
            )
         );
         setDesignSelected(null)
      }
   }

   async function handleDelete(id){
      var url="http://localhost:8000/api/designqrcode/"+id+"/"
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
         setListDesign(prev => prev.filter(item => item.id !== id));
         setDesignSelected(null)
      }
   }

  return <div>
   <h3 style={{marginTop:0}}>Liste des designs pour ce QR Code</h3>
   <div style={{borderTop:"1px solid black",display: "flex",flexDirection: "column",alignItems: "center"}}>
   {listDesign.map((design) => (
       designSelected!=null && design.id === designSelected.id ? 
         <div key={design.id} style={{display:"flex", alignItems: "center", borderBottom:"1px solid black", width: "100%"}}>
            <TextField style={{flex: 1}} value={designSelected.nom} onChange={(event)=>setDesignSelected({id: design.id, nom:event.target.value})} id="standard-basic" variant="standard" />
            <IconButton aria-label="edit" onClick={handleSave}>
               <SaveIcon />
            </IconButton>
         </div> :
      <div key={design.id} style={{display:"flex", alignItems: "center", borderBottom:"1px solid black", width: "100%"}}>
         <p style={{flex: 1}}>{design.nom}</p>

         <IconButton aria-label="edit" onClick={()=>setDesignSelected(design)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={()=>handleDelete(design.id)}>
            <DeleteIcon />
          </IconButton>
      </div>
   ))}
   {designSelected == null || designSelected.id>0 ?
   <IconButton aria-label="edit" style={{width:"fit-content"}} onClick={()=>setDesignSelected({id:0,nom:""})}>
      <AddIcon />
   </IconButton>
   :
   <div style={{display:"flex", alignItems: "center", borderBottom:"1px solid black", width: "100%"}}>
      <TextField style={{flex: 1}} value={designSelected.nom} onChange={(event)=>setDesignSelected({id: 0, nom:event.target.value})} id="standard-basic" variant="standard" />
      <IconButton aria-label="edit" onClick={handleCreate}>
         <SaveIcon />
      </IconButton>
   </div>
   }
   </div>
  </div>
}

export default EditListDesign;