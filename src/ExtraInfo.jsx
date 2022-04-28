import React from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from "react-bootstrap";
import "./ExtraInfo.css";
function ExtraInfo(){
// import React from 'react';



  return (
    <Card>
  <Card.Header as="h3" className="card-heading">NOTE</Card.Header>
  <Card.Body className="card-body">
    <Card.Title><h4 className= "sub-heading">Data Related Information</h4></Card.Title>
    <Card.Text>
     <h5>1. All the data has been provided to you from <a class="link1" rel="noreferrer" href="https://disease.sh/" target="_blank">disease.sh</a> </h5>
     <h5>2. This site may crash while you want to see the information regarding cases of some countries.We will try to solve the issue soon.</h5>
     <h6 className="info-small" style={{color:"#808080"} }>Some of the links for more covid Information :</h6>
    </Card.Text>
    <div className="buttons">
    <Button className="button" variant="primary"><a class="link" rel="noreferrer" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank">WHO COVID SITE</a></Button>
    <Button className="button" variant="primary"><a class="link" rel="noreferrer" href="https://www.mohfw.gov.in/" target="_blank">MOHFW</a></Button>
    <Button className="button" variant="primary"><a class="link" rel="noreferrer" href="https://www.unicef.org/india/coronavirus/covid-19" target="_blank">UNICEF</a></Button>
    </div>
  </Card.Body>
</Card>
  );
}
export default ExtraInfo;