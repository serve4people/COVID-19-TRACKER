
import  React from 'react';
import "./App.css";
const date = new Date();
const res = date.getDate() + " " + date.toLocaleDateString("default",{month:"long",year:"numeric"}) +" , "+ date.toLocaleString("default",{hour:'2-digit',minute:'2-digit'});
function DateTime() {

    //var [date,setDate] = useState(new Date());
    

    return(
        <div>
            <p className="date-time">{res}</p>

        </div>
    )
}

export default DateTime;