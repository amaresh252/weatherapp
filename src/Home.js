import { useEffect, useState } from 'react';
import { Forecast } from './Forecast';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chart from 'chart.js/auto';
import { BarChart } from './BarChart';





export const Home = () => {

  



    const apiKey = '1f6ff6916f82697d31f40ac6f07c48dc';
    const key='f9621643de9e4580857140358241107';
    const [weatherInfo,setWeatherInfo]=useState(null);
    const [forecastInfo,setForecastInfo]=useState(null);
    const weatherdata= {
      labels: forecastInfo&&forecastInfo.map((day) => day.date),
      datasets: [{
        label: 'temprature',
        data: forecastInfo&&forecastInfo.map((day) => day.day.avgtemp_c),
        backgroundColor:['red','blue','green','orange','pink','brown','yellow']
      }]
    }

    const [city,setCity]=useState('');
    
      const handleSearch=async()=>{
        const response=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        const data=await response.json();
        const forecastResp=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`)
        const forecast=await forecastResp.json();
        setWeatherInfo(data)
        console.log(forecast.forecast.forecastday)
        setForecastInfo(forecast.forecast.forecastday)
        console.log(data)
      }
   
  return (
    <div>
      <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                        label="City"
                        value={city}  
                        onChange={(e)=>setCity(e.target.value)}
                        variant="outlined"
                        sx={{ backgroundColor: '#f0f0f0', borderRadius: 1 }}
                    />
                    <Button variant="contained" sx={{ backgroundColor: '#ff9800' }} onClick={(e)=>handleSearch()}>
                        Search
                    </Button>
                </Box>
                <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5' }}>
                    Current Weather
                </Typography>
                {weatherInfo  && <Card sx={{ backgroundColor: '#e3f2fd', width: '100%', maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ color: '#1e88e5' }}>
                            City Name : {weatherInfo.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#d32f2f' }}>
                            Temperature: {Math.floor(weatherInfo.main.temp-273)}°C
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7b1fa2' }}>
                            Humidity: {weatherInfo.main.humidity}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7b1fa2' }}>
                            Wind Speed: {weatherInfo.wind.speed}Km/h
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7b1fa2' }}>
                           Weather Condition: {weatherInfo.weather[0].main} 
                        </Typography>
                    </CardContent>
                </Card>}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#4caf50' }}>
                    7-Day Weather Forecast
                </Typography>
                <Grid container spacing={3}>
                    {forecastInfo && forecastInfo.map((day, index) => (
                        <Forecast day={day} index={index} />
                    ))}
                </Grid>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ color: 'rgb(255 235 12)' ,mt:4 }}>
                    7-Day Forecast Chart
                </Typography>
            <Box sx={{width:700}}>
        <BarChart weatherdata={weatherdata} />
        </Box>
        </Container>
        
        
    </div>
  )
}
