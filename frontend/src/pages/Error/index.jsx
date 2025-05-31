import page_404_image from '../../assets/images/page_404_image.png'

function Error({color, setColor}){

   

   return <div style={{marginRight:"auto", marginLeft:"auto", marginTop:100, width:"fit-content"}}>
      <h3 style={{textAlign:"center"}}>Cette page n'existe pas</h3>
      <img src={page_404_image} alt='image_qr_code' title='Technology illustrations by Storyset' style={{width:250}}/>
        </div>;
}

export default Error;