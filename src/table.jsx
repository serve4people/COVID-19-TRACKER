import React from "react";
import "./table.css";
import numeral from "numeral";
function Table({countrycases}){
    return(
        <div className="table">
    {countrycases.map(({country,active}) => (
        <tr>
        
         <td>{country}</td>
         <td>{numeral(active).format("000,000")}</td>
        
         </tr>
      ))
      }
      </div>
    );
}
export default Table;