import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  
  const [weatherData, setWeatherData] = useState('');
  
  /*const handleCityChange  = useCallback((city) => {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca9f78996c6959904da5213ccf2b8f95&units=metric`)
   .then(res => res.json())
   .then(data => {
     
     const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
    };

    console.log(weatherData); 
   });

  

    if (city) {
      setCity(city);
      console.log('city', city);
    }
  }, []);*/

  const handleCityChange = useCallback((city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca9f78996c6959904da5213ccf2b8f95&units=metric`)
      .then(res => res.json())
      .then(data => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };

        setWeatherData(weatherData);
        console.log('WeatherData', weatherData);


      });
  }, []);

 
  return (
    <section>
      <PickCity action={handleCityChange}/>
      <WeatherSummary  
         city={weatherData.city} 
         temp={weatherData.temp}
         icon={weatherData.icon}
         description={weatherData.description}
       />
      <Loader />
    </section>
  )
};

export default WeatherBox;