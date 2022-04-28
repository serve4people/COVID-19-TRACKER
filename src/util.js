 import {Circle , Popup} from "react-leaflet";
 import numeral from "numeral";
 import "./Map.css"
 const casesTypeColors = {
     cases:{
         hex:"#CC1034",
         multiplier:600,
     },
     recovered:{
          hex:"#7dd71d",
          multiplier:500,
     },
     deaths:{
         hex:"#fb4443",
         multiplier:2000,
     },


 };
 const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a,b) =>{

    if(a.active > b.active){
        return -1;
    }
    else{
        return 1;
    }
});
    return sortedData;
};
const prettyPrint = (stat) =>
 stat? `+${numeral(stat).format("0.0a")}` : "+0";
//Draw circles on the map
 const showDataOnMap = (data,casesType) => 
  data.map(country => (
      <Circle
      center={[country.countryInfo.lat,country.countryInfo.long]}
      fillOpacity={0.4}
      
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      
      radius={
          Math.sqrt(country[casesType]/12) * casesTypeColors[casesType].multiplier
      }
      >
          <Popup >
          <div>
              <div class="flagPopup"style={{backgroundImage:`url(${country.countryInfo.flag})`}}

              />
              
              <div className="countryName">{country.country}

              </div>
              <div className="info-cases">
                  Cases:{numeral(country.cases).format("0,0")}
              </div>
              <div className="info-recovered">
                  Recovered:{numeral(country.recovered).format("0,0")}
              </div>
              <div className="info-deaths">
                  Deaths:{numeral(country.deaths).format("0,0")}
              </div>
            </div>

          </Popup>
      </Circle>

  ));
    
  export {sortData,showDataOnMap,prettyPrint};