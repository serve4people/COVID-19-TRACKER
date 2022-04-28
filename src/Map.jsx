import React from "react";
import {TileLayer,Map as LeafletLayer} from "react-leaflet";
import "./Map.css";
import {showDataOnMap} from "./util";

function Map({center,zoom,countries,casesType}){
     return(
          <div className="map">
        <LeafletLayer center={center} zoom={zoom}>
         <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      
      />
        {showDataOnMap(countries,casesType)}
      </LeafletLayer> 
      </div>
     );
}
export default Map;
