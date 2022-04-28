import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./Info.css";
// const useStyles = makeStyles({
//   root: {
//     maxWidth: 280,
    
//   },
// });

export default function Info(props) {
  // const classes = useStyles();

  return (
    <Card 
    
    onClick={props.onClick}
    className={`info-box ${props.active && "info-box--selected"} ${props.isRed && "info-box--red"}`}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography className="title">
            {props.type}
          </Typography>
             <Typography>
            <h2 className={`info-cases ${!props.isRed && "info-cases--green"}`}>  {props.data1} </h2>
            </Typography>
            <Typography>
            <h5 className="info-today"> {props.today} Total </h5>
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>
  );
}