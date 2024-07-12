import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Forecast = ({day,index}) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={index}>
                            <Item>
                                <Typography variant="h6" gutterBottom>
                                    {day.date}
                                </Typography>
                                <img
                                    height="60"
                                    width="60"
                                    src={day.day.condition.icon}
                                    alt={day.day.condition.text}
                                />
                                <Typography variant="body1" sx={{ mt: 1, color: '#d32f2f'}}  >
                                    {day.day.avgtemp_c}°C
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#3882a1'}}>
                                    {day.day.condition.text}
                                </Typography>
                            </Item>
                        </Grid>
  )
}
