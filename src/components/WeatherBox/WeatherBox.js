import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [handleError, setHandleError] = useState(false);

  const handleCityChange = useCallback((city) => {

    setHandleError(false);
    setPending(true);
    setWeatherData('');

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca9f78996c6959904da5213ccf2b8f95&units=metric`)
      
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            setPending(false);

            const newData = { // Renamed to newData to avoid shadowing
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main,
            };

            setWeatherData(newData);
            console.log('WeatherData', newData);
          });
        } else {
          setHandleError(true);
        }
      });

  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {pending && !weatherData && !handleError &&  <Loader />}

      {weatherData && 
      
      <WeatherSummary
          city={weatherData.city}
          temp={weatherData.temp}
          icon={weatherData.icon}
          description={weatherData.description}
        />
      }

      {handleError &&  <ErrorBox />}

    </section>
  );
};


export default WeatherBox;



