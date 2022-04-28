import React, { useEffect, useState } from "react";
import numeral from "numeral";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Info from "./Info";
import Table from "./table";
import ExtraInfo from "./ExtraInfo";
import { sortData, prettyPrint } from "./util";
import LineGraph from "./LineGraph";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import DateTime from "./dateTime";
function App() {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [livecases, setlivecases] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 });

  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setmapCountries] = useState([]);
  const [graphdata, setgraphdata] = useState("worldwide");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            flag1: country.countryInfo.flag,
            value: country.country,
            key: country.countryInfo.iso2,
          }));
          setCountries(countries);
          const sortedData = sortData(data);
          setmapCountries(data);
          //setPopulation(data.population);
          setlivecases(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
    setgraphdata(countryCode);
    //console.log(graphdata);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    //await fetch(url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        //setPopulation(data.population);
        setCountryInfo(data);

        countryCode === "worldwide"
          ? setMapCenter([20, 77])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        //setgraphdata(countryCode);
        //setCountry(countryCode);
      });
    console.log(country);
  };

  return (
    <div class='main'>
      <div className='App'>
        <div className='left'>
          <div className='app__header'>
            <h1 className='Heading'>COVID-19 TRACKER</h1>

            <FormControl variant='outlined' className='app__DropBox'>
              <Select
                className='dropbox'
                //variant="outlined"

                style={{
                  color: "white",
                  backgroundColor: "#654ea3",
                  border: "2px",
                }}
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem value='worldwide'>
                  <img
                    className='flags'
                    alt='world'
                    src='https://sunnewsonline.com/wp-content/uploads/2017/06/worldwide.png'
                  ></img>
                  WorldWide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem className='countries-name' value={country.value}>
                    <img
                      className='flags'
                      alt='flags'
                      src={country.flag1}
                    ></img>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='info-bar'>
            <Info
              active={casesType === "cases"}
              isRed
              type='Cases'
              data1={prettyPrint(countryInfo.todayCases)}
              today={numeral(countryInfo.cases).format("0.0a")}
              onClick={(e) => setCasesType("cases")}
            />
            <Info
              active={casesType === "recovered"}
              type='Recovered'
              data1={prettyPrint(countryInfo.todayRecovered)}
              today={numeral(countryInfo.recovered).format("0.0a")}
              onClick={(e) => setCasesType("recovered")}
            />
            <Info
              active={casesType === "deaths"}
              isRed
              type='Deaths'
              data1={prettyPrint(countryInfo.todayDeaths)}
              today={numeral(countryInfo.deaths).format("0.0a")}
              onClick={(e) => setCasesType("deaths")}
            />
          </div>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType={casesType}
          />
        </div>

        <Card className='right'>
          <CardContent>
            <div className='app__information'>
              <h3>Live Active Cases By Country</h3>
              <Table countrycases={livecases} />
            </div>
          </CardContent>

          <CardContent>
            <h3 className='app__graphTitle'>
              {country} {casesType}
            </h3>
            <LineGraph
              className='graph'
              casesType={casesType}
              graphCountry={graphdata}
            />
          </CardContent>
        </Card>
      </div>
      <div className='bottom'>
        <Carousel>
          <Carousel.Item>
            <img
              className='d-block  images'
              src='https://www.unicef.org/romania/sites/unicef.org.romania/files/styles/hero_desktop/public/How%20to%20protect%20yourself%20from%20coronavirus%20-%20tips%20for%20children-landscape.png?itok=0RSgCyLN'
              alt='First slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block  images'
              src='https://media.healthdirect.org.au/images/inline/original/avoiding-covid-19_tile_940x788px_4-d1616f.png'
              alt='Second slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block images'
              src='https://image.freepik.com/free-vector/together-we-can-fight-corona-virus_188398-63.jpg'
              alt='Third slide'
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='information'>
        <ExtraInfo />
      </div>
      <div className='footer'>
        <h4 className='footer-header'>Some Important References</h4>
        <div className='comp-references'>
          <div className='references'>
            <a
              className='link'
              rel='noreferrer'
              href='https://disease.sh/'
              target='_blank'
            >
              disease.sh
            </a>
            <h6 className='link-content'>Used for stats</h6>
          </div>
          <div className='references'>
            <a
              className='link'
              rel='noreferrer'
              href='https://leafletjs.com/'
              target='_blank'
            >
              Leaflet
            </a>
            <h6 className='link-content'>Used for Map</h6>
          </div>
          <div className='references'>
            <a
              className='link'
              rel='noreferrer'
              href='https://www.chartjs.org/'
              target='_blank'
            >
              Chart-js
            </a>
            <h6 className='link-content'>Used for graphs</h6>
          </div>
        </div>
        <div className='end'>
          <DateTime />
          <p className='credits'>Made by Aditya Khare</p>
          <p className='copyright'> Copyright © my-covid-tracker 2021 </p>
        </div>
      </div>
    </div>
  );
}

export default App;
