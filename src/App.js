import React, {useEffect, useState} from "react";
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getData}  from "./api/Index";
 import {getWeatherData} from "./api/Index"


function App() {
     const [places,  setPlaces] = useState([]);
     const [coordinates,  setCoordinates] = useState({});
     const[filteredPlaces, setFilteredPlaces] = useState([]);
     const [bounds, setBounds]= useState(null);
     const [childClicked, setChildClicked] = useState(null);
     const [loading, setLoading]= useState(false)
     const [type, setType] = useState('restaurants');
     const [rating, setRating]= useState("");
     const [weatherData, setWeatherData] = useState([]);


     useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      });
    }, []);

useEffect(() => {
  const filteredPlaces = places?.filter((place)=>place.rating > rating);
  setFilteredPlaces(filteredPlaces);
}, [places, rating])

useEffect(() => {
  
  if ( bounds?.sw && bounds?.ne) {
  setLoading(true);
  getWeatherData(coordinates.lat, coordinates.lng)
      .then((data) =>{
        setWeatherData(data)
      })
    getData(type, bounds?.sw, bounds?.ne)
        .then((data)=>{ 
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            console.log(data)
            setFilteredPlaces([]);
            setLoading(false)
        })
      }
}, [bounds, coordinates.lat, coordinates.lng, type])

  return (
    <div className="App">
        <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{width:"100%"}}>
            <Grid item xs={12} md={4}>
                <List 
                    places={ filteredPlaces?.length ? filteredPlaces :places}
                    childClicked={childClicked}
                    loading={loading} 
                    type={type}
                    rating={rating}
                    setType={setType} 
                    setRating={setRating}
                    />
            </Grid> 
            <Grid item xs={12} md={8}>
                <Map  
                    setCoordinates = {setCoordinates}
                    setBounds= {setBounds}
                    coordinates = {coordinates}
                    places={filteredPlaces?.length ? filteredPlaces :places}
                    setChildClicked={setChildClicked}
                    weatherData={weatherData}
                 />
            </Grid>
      </Grid>
     
    </div>
  );
}

export default App;
