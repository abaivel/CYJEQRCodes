import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import '../../style/StatsQRCode.css';

function StatsQRCode({listVisits, listDesign, listLieu, type}) {
   const [dataPieDesign, setDataPieDesign] = useState([])
   const [dataPieLieu, setDataPieLieu] = useState([])
   const [dataLineDesign, setDataLineDesign] = useState([])
   const [dataLineLieu, setDataLineLieu] = useState([])

   const [seriesDesign, setSeriesDesign] = useState([])
   const [seriesLieu, setSeriesLieu] = useState([])
   const seriesTotal=[{dataKey:"total",label:"Total", curve: 'linear'}]
   const [dataLineTotal, setDataLineTotal] = useState([])

   function prepareDataAffiche(){
    let dicoPieDesign = {}
    let dicoPieLieu = {}

    listVisits.forEach(visit => {
      if (visit.design != null){
        let objetDesign = listDesign.find(item => item.id === visit.design);
        if (objetDesign != null){
          if (!dicoPieDesign[objetDesign.nom]){
            dicoPieDesign[objetDesign.nom]=0
          }
          dicoPieDesign[objetDesign.nom]+=1
        }
      }else{
        if (!dicoPieDesign["Sans design"]){
          dicoPieDesign["Sans design"]=0
        }
        dicoPieDesign["Sans design"]+=1
      }
      if (visit.lieu != null){
        let objetLieu = listLieu.find(item => item.id === visit.lieu);
        if (objetLieu != null){
          if (!dicoPieLieu[objetLieu.nom]){
            dicoPieLieu[objetLieu.nom]=0
          }
          dicoPieLieu[objetLieu.nom]+=1
        }
      }else{
        if (!dicoPieLieu["Sans lieu"]){
          dicoPieLieu["Sans lieu"]=0
        }
        dicoPieLieu["Sans lieu"]+=1
      }
    });
    let newDataPieDesign = []
    let newDataPieLieu = []


    for (var prop in dicoPieDesign) {
      newDataPieDesign.push({id:dicoPieDesign[prop],value:dicoPieDesign[prop], label:prop})
    }
    setDataPieDesign(newDataPieDesign)
    for (var lieu in dicoPieLieu) {
      newDataPieLieu.push({value:dicoPieLieu[lieu], label:lieu})
    }
    setDataPieLieu(newDataPieLieu)

    let newSeriesDesign=[]
    listDesign.forEach(d => {
      newSeriesDesign.push({id:d.id, dataKey:"design"+d.id, label:d.nom, curve: 'linear',})
    });
    newSeriesDesign.push({dataKey:"rien",label:"Sans design", curve: 'linear',})
    newSeriesDesign.push({dataKey:"total",label:"Total", curve: 'linear',})
    setSeriesDesign(newSeriesDesign)
    console.log("d="+JSON.stringify(newSeriesDesign))

    let newSeriesLieu=[]
    listLieu.forEach(d => {
      newSeriesLieu.push({id:d.id, dataKey:"lieu"+d.id, label:d.nom, curve: 'linear',})
    });
    newSeriesLieu.push({dataKey:"rien",label:"Sans lieu", curve: 'linear',})
    newSeriesLieu.push({dataKey:"total",label:"Total", curve: 'linear',})
    setSeriesLieu(newSeriesLieu)
    console.log("d="+JSON.stringify(newSeriesLieu))
    
    const statsDesign = {};
    const statsLieu = {};

    listVisits.forEach(({ dateVisite, design, lieu }) => {
      const jour = new Date(dateVisite.split('T')[0] + "T00:00:00");
      if (!statsDesign[jour]){ 
        statsDesign[jour] = {};
        listDesign.forEach(element => {
          statsDesign[jour]["design"+element.id] = 0
        });
        statsDesign[jour]["rien"]=0
        statsDesign[jour]["total"]=0
      }
      if (design != null){
        let objetDesign = listDesign.find(item => item.id === design);
        if (objetDesign!=null){
          statsDesign[jour]["design"+objetDesign.id] += 1;
        }
      }else{
        statsDesign[jour]["rien"]+=1
      }
      statsDesign[jour]["total"]+=1

      if (!statsLieu[jour]){ 
        statsLieu[jour] = {};
        listLieu.forEach(element => {
          statsLieu[jour]["lieu"+element.id] = 0
        });
        statsLieu[jour]["rien"]=0
        statsLieu[jour]["total"]=0
      }
      if (lieu != null){
        let objetLieu = listLieu.find(item => item.id === lieu);
        if (objetLieu != null){
          statsLieu[jour]["lieu"+objetLieu.id] += 1;
        }
      }else{
        statsLieu[jour]["rien"]+=1
      }
      statsLieu[jour]["total"]+=1
    });

    // Étape 2 : convertir l'objet en tableau pour Recharts
    const donneesLineChartDesign = Object.entries(statsDesign).map(([date, designs]) => ({
      date: new Date(date),
      ...designs
    }));
    setDataLineDesign(donneesLineChartDesign)

    const donneesLineChartLieu = Object.entries(statsLieu).map(([date, lieux]) => ({
      date: new Date(date),
      ...lieux
    }));
    setDataLineLieu(donneesLineChartLieu)
  }

  function prepareDataAutre(){
    const statsTotal = {};

    listVisits.forEach(({ dateVisite}) => {
      const jour = new Date(dateVisite.split('T')[0] + "T00:00:00");
      if (!statsTotal[jour]){ 
        statsTotal[jour] = {};
        statsTotal[jour]["total"]=0
      }
      statsTotal[jour]["total"]+=1


    });

    // Étape 2 : convertir l'objet en tableau pour Recharts
    const donneesLineChartTotal = Object.entries(statsTotal).map(([date, nb]) => ({
      date: new Date(date),
      total:nb["total"]
    }));
    setDataLineTotal(donneesLineChartTotal)
  }

  useEffect(() => {
  if (listVisits.length) {
    if (type==="Affiche"){
      prepareDataAffiche();
    }else{
      prepareDataAutre();
    }
  }
}, [listDesign, listLieu, listVisits, type]);

   return <div> 
    <h2>Statistiques</h2>
    <Chip style={{fontSize:15}} label={listVisits.length+" visites"} variant="outlined" />
    {type === "Affiche"?<div>
      <div className='stats-pies-container'>
        <PieChart
          series={[
            {
              data: dataPieDesign,
            },
          ]}
          width={250}
          height={250}
        />
        <PieChart
          series={[
            {
              data: dataPieLieu,
            },
          ]}
          width={250}
          height={250}
        />
        </div>
        <div className='stats-line-container'>
        <LineChart
          dataset={dataLineDesign}
          xAxis={[
            {
              id: 'Jours',
              dataKey: 'date',
              scaleType: 'time',
              valueFormatter: (date) => date.toLocaleDateString(),
              tickMinStep: 24 * 60 * 60 * 1000,
              nice: false,
            },
          ]}
          yAxis={[
            {
              width: 70,
              min: 0
            },
          ]}
          series={seriesDesign}
          height={400}
          margin={{ top: 20, right: 60, bottom: 50, left: 20 }}
      />
      <LineChart
          dataset={dataLineLieu}
          xAxis={[
            {
              id: 'Jours',
              dataKey: 'date',
              scaleType: 'time',
              valueFormatter: (date) => date.toLocaleDateString(),
              tickMinStep: 24 * 60 * 60 * 1000,
              nice: false,
            },
          ]}
          yAxis={[
            {
              width: 70,
              min: 0
            },
          ]}
          series={seriesLieu}
          height={400}
          margin={{ top: 20, right: 60, bottom: 50, left: 20 }}
      /></div>
      </div>
        :
        <div className='stats-line-container'>
        <LineChart
          dataset={dataLineTotal}
          xAxis={[
            {
              id: 'Jours',
              dataKey: 'date',
              scaleType: 'time',
              valueFormatter: (date) => date.toLocaleDateString(),
              tickMinStep: 24 * 60 * 60 * 1000,
              nice: false,
              width: 500
            },
          ]}
          yAxis={[
            {
              width: 70,
              min: 0
            },
          ]}
          series={seriesTotal}
          height={400}
          margin={{ top: 20, right: 60, bottom: 50, left: 20 }}
      /></div>}
      <p className='stats-line-not-displayed'>Pour voir les courbes, ouvrez le site sur un ordinateur</p>
   </div>
}

export default StatsQRCode;