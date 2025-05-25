import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker({color, setColor}){
   const [openPicker, setOpenPicker] = useState(false)

   

   return <div>
      <div onClick={()=>setOpenPicker(true)}>
   <TextField 
          value={color}
          color="secondary" 
          fullWidth
          id="outlined-basic" 
          label="Couleur du QR Code" 
          variant="outlined" 
          margin="normal" 
          slotProps={{input: {readOnly: true,},}} /></div>

   { openPicker ? <div style={{position: 'absolute',zIndex: '2',}}>
          <div style={{position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px',
    }} onClick={()=> setOpenPicker(false) }/>
          <ChromePicker color={color} onChangeComplete={(updatedColor) => setColor(updatedColor.hex)} disableAlpha />
        </div> : null }
        </div>;
}

export default ColorPicker;