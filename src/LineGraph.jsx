import React,{useState,useEffect} from "react";
import {Line} from "react-chartjs-2";
import numeral from "numeral";

//import { lightBlue } from "@material-ui/core/colors";
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};



             




function LineGraph({casesType,graphCountry},...props){
  //console.log({graphCountry});
    const [graphData,setGraphdata] = useState({});
    const buildChartData = (data,casesType,graphCountry) => {
      let chartData = [];
      let lastdateData;
      if(graphCountry==="worldwide"){
      for(let date in data.cases){
          if(lastdateData){
              let newDataPoint = {
                  x:date,
                  y:data[casesType][date]-lastdateData,
                  
              };
             // console.log(data);
              chartData.push(newDataPoint);
          }
          lastdateData = data[casesType][date];
      }
      return chartData;
    }
    else{
      for(let date in data.timeline.cases){
        if(lastdateData){
            let newDataPoint = {
                x:date,
                y:data.timeline[casesType][date]-lastdateData,
                
            };
           console.log(data);
            chartData.push(newDataPoint);
        }
        lastdateData = data.timeline[casesType][date];
    }
    return chartData;
    }
  };
  
    useEffect(()=>{

        const url = graphCountry === "worldwide"?"https://disease.sh/v3/covid-19/historical/all?lastdays=120":
        `https://disease.sh/v3/covid-19/historical/${graphCountry}?lastdays=120`;
        //console.log("url = "+url);
        //console.log(graphCountry);
        const fetchData = async() => {
            await fetch(url)
            .then((response)=> {
                return response.json();
            })
            .then((data) => {
               
                let chartData = buildChartData(data,casesType,graphCountry);
                setGraphdata(chartData);
            });

        };
        fetchData();
    },[casesType,graphCountry]);
    
     return(
         <div className={props.className}>
             {graphData?.length > 0 && (
                 <Line 
                  options={options}
                 data={{
                     
                     datasets:[
                         {   label:"Record",
                            
                             backgroundColor:"rgba(204, 16, 52, 0.5)",
                             borderColor:"#CC1034",
                             data:graphData,
                             fill:true
                             
                            //  tension:0
                         },
                     ],
                 }}
                 
                 />
             )}
         </div>
     );
}
export default LineGraph;





