import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [weather, setWeather] = useState();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=38a969453c7cfc80e5b0683f1877cd04&units=metric`)
    
    .then(res => {
      if(res.status === 200) {
      setError(false);
      return res.json()
        .then(data => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
      };
      setWeather(weatherData);
      setPending(false)
    });
  }

      else {
      setError(true);
      }
      });
    });


  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weather && !pending && !error) && <WeatherSummary {...weather} />}
      {error && <ErrorBox>There is no such city!</ErrorBox>}
      {(pending && !error) && <Loader />}
    </section>
  )
};

export default WeatherBox;