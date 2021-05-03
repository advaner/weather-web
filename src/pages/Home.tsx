
import axios from "axios"
import React, { FormEvent, useCallback, useState, useEffect} from "react"

import ReactMapGL, { Marker} from "react-map-gl"
import Pin from "../components/pin"
import { AiOutlineCloud } from "react-icons/ai" 
import { WiHumidity, WiCloudyWindy} from "react-icons/wi"
import { GiThermometerHot, GiThermometerCold} from "react-icons/gi"

import { Container, Map, RightSide,TopContainer,LeftSide, FormContainer, TitleContainer, ContentContainer, ContentCityName, ContentTemp, WeatherContainer, Icons, WindContent, MapContainer } from "../styles/StyledHome"


interface MapInterface{
    latitude: number,
    longitude: number,
    zoom: number,
}

interface Weather{
  main: string,
  description: string,
}

interface Data{
  name: string,
  main: {
    temp: number,
    temp_max: number,
    temp_min: number,
    humidity: number,

  },
  coord: {
    lat: number,
    lon: number,
  }
  wind: {
    speed: number
  },
  weather: Array<Weather>

}



const Home: React.FC = () => {

    const [searchCity, setSearchCity] = useState("")

    const [city, setCity] = useState<Data>()

    useEffect(() => {
      const response = axios.get("https://community-open-weather-map.p.rapidapi.com/find?q=Recife&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=metric",
      {headers: {"x-rapidapi-key": `${process.env.REACT_APP_API_CITY}`,
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"}}).then(response => {
        setViewport({
          latitude: response.data.list[0].coord.lat,
          longitude: response.data.list[0].coord.lon,
          zoom: 8,
        })
        setCity(response.data.list[0])
      })
    }, [])

    const [viewport, setViewport] = useState<MapInterface>();

      const [marker, setMarker] = useState({
          latitude: -8.05428,
          longitude: -34.8813,
      })

      const [events, logEvents] = useState({});

      const onMarkerDragStart = useCallback(event => {
        logEvents(_events => ({..._events, onDragStart: event.lngLat}));
      }, []);
    
      const onMarkerDrag = useCallback(event => {
        logEvents(_events => ({..._events, onDrag: event.lngLat}));
      }, []);

      const onMarkerDragEnd = useCallback(event => {
        logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
        setMarker({
          longitude: event.lngLat[0],
          latitude: event.lngLat[1]
        });
      }, []);

      async function getLocation (): Promise<void>{
        
        const response = await axios.get(`https://community-open-weather-map.p.rapidapi.com/find?mode=null&lon=${marker.longitude}&type=link%2C%20accurate&lat=${marker.latitude}&units=metric`,
        {headers: {"x-rapidapi-key": `${process.env.REACT_APP_API_CITY}`,
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"}})

        const city_data = response.data.list[0]

        setCity(city_data)
        console.log(city_data)
      }

      async function handdleSubmit (event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault()

        const response = await axios.get(`https://community-open-weather-map.p.rapidapi.com/find?q=${searchCity}&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=metric`,
        {headers: {"x-rapidapi-key": `${process.env.REACT_APP_API_MAP}`,
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"}})

        const city_data = response.data.list[0]
        
        setMarker({
          longitude: city_data.coord.lon,
          latitude: city_data.coord.lat
        })
        setViewport({
          longitude: city_data.coord.lon,
          latitude: city_data.coord.lat,
          zoom: 8,
        })

        setCity(city_data)
        setSearchCity("")  
      }

    return(
        <Container>
          <LeftSide>
              <TopContainer>
                <TitleContainer>
                  <h1>Weather Forecast</h1>
                </TitleContainer>
                <FormContainer onSubmit={handdleSubmit}>
                    <input type="search" placeholder="City" value={searchCity} onChange={(event) => setSearchCity(event.target.value)}/>
                </FormContainer>

              </TopContainer>
                <Map onTouchEnd={getLocation}>
                  <MapContainer>
                      <ReactMapGL mapboxApiAccessToken={process.env.REACT_APP_API_MAP}
                      mapStyle={"mapbox://styles/mapbox/dark-v9"}
                      {...viewport}
                      width="100%%"
                      height="100%"
                      onViewportChange={(viewport: MapInterface) => setViewport(viewport)}>
                          <Marker latitude={marker.latitude} longitude={marker.longitude}
                          offsetTop={-20}
                          offsetLeft={-10}
                          draggable
                          onDragStart={onMarkerDragStart}
                          onDrag={onMarkerDrag}
                          onDragEnd={onMarkerDragEnd}>
                              <Pin/>
                          </Marker>
                      </ReactMapGL>
                    </MapContainer>
                </Map>
            </LeftSide>

            <RightSide>
              <ContentContainer>

                <ContentCityName>
                  <div>
                    {city?.name}
                  </div>
                </ContentCityName>

                <ContentTemp>
                  <div>
                    {city?.main.temp}
                  </div>
                  <div>
                  °
                  </div>
                </ContentTemp>

                <WeatherContainer>
                  <div>
                    <div>
                      <AiOutlineCloud style={Icons}/>
                      {city?.weather[0].main}
                    </div>
                    <div>
                      <WiHumidity style={Icons}/>
                      {city?.main.humidity}%
                    </div>
                  </div>
                  <div>
                    <div>
                      <GiThermometerHot style={Icons}/>
                      {city?.main.temp_max}°
                    </div>
                    <div>
                      <GiThermometerCold style={Icons}/>
                      {city?.main.temp_min}°
                    </div>
                  </div>
                  <WindContent>

                    <WiCloudyWindy style={Icons}/>
                    {city?.wind.speed} Km/h

                  </WindContent>
                </WeatherContainer>

              </ContentContainer>
            </RightSide>
        </Container>
    )
}

export default Home