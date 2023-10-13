import { List,getPreferenceValues } from "@raycast/api"; // Import 'render'
import { useFetch } from "@raycast/utils";

type WeatherResponse  = {
    current: Current;
    forecast: Forecast;
  
}
  
type Current  = {
    lastUpdatedEpoch: number;
    temp_c: number;
    wind_mph: number;
    pressureMb: number;
    precipMm: number;
    cloud: number;
    feelslike_c: number;
    feelslikeF: number;
    gustMph: number;
    gustKph: number;
    uv: number;

  }
  
type Forecast = {
    forecastday: Forecastday[];
  
}
  
  type Forecastday  = {
    date: string;
    dateEpoch: number;
    astro: Astro;
    hour: Hour[];
 
  }
  
  type Astro = {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moonPhase: string;
    moonIllumination: string;
    isMoonUp: number;
    isSunUp: number;
  
  
  }
  
  type Hour = {
    timeEpoch: number;
    tempC: number;
    windMph: number;
    pressureMb: number;
    precipMm: number;
    cloud: number;
    feelslikeC: number;
    dewpointC: number;
    gustMph: number;

  }
  
  export default function Command() {
    const apiKey = "4cc888fdc2414c92b55165557232003";
    const postcode = "Sw11";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${postcode}`;
    console.log("API URL:", apiUrl);
  
      const { isLoading, data: weatherResponse, error } = useFetch<WeatherResponse>(apiUrl);
      if (error) {
          console.error("API Error:", error); 
      }
 
      if (isLoading) {
        return <List isLoading={true} />;
      }
    console.log(weatherResponse);
    if (weatherResponse) {
      return (
        <List>
          <List.Item
            title={'Current Weather'}
            subtitle={`${Math.round(weatherResponse.current.temp_c)} °C`}
            accessories={[
              { text: `Feels Like ${Math.round(weatherResponse.current.feelslike_c)} °C` },
            
              { text: `Wind Speed ${weatherResponse.current.wind_mph} mph` },
            
              { text: `UV Index ${weatherResponse.current.uv}` },
            ]}
          />
          <List.Item
            title={'Hourly Weather'}
            subtitle={`Weather`}
            accessories={[
              { text: `Hourly Weather ${weatherResponse.forecast.forecastday[0].hour[0].tempC}` },
            ]}
          />
        </List>
     
      )
      
    }
    else {
      return (
        <List searchBarPlaceholder="Search...">
          <List.Section title="No Data">
            <List.Item title="There is no data available." />
          </List.Section>
        </List>
      );
    }
  }
