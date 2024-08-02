import theme from "./theme";
import LeagueAppBar from './components/LeagueAppBar'

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import LoginIcon from '@mui/icons-material/Login';

export default function Home() {

  const hero = {
    'height': '50%',
    'maxWidth': '100%',
    'padding': '0',

    'backgroundImage': 'url(/hero/ufo.png)',

    'background-attachment': 'fixed',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
    'background-size': 'cover',
  }

  const blur = {
    'background-color': 'rgba(30, 30, 30, 0.1)',
    '-webkit-backdrop-filter': 'blur(5px)',
    'backdrop-filter': 'blur(5px)',

    'margin': '0',
    'height': '100%',
    'width': 'inherit',
    'display': "flex",
    'flexDirection': "column",
    'justifyContent': "center"
  }

  return <ThemeProvider theme={theme}> 
    <CssBaseline />
    <LeagueAppBar /> 

    <Container style={hero}>  
      <div style={blur}>
          <Typography align="center" component={'span'} variant="h2"> 
            <Box sx={{ fontWeight: 'bold', fontFamily: 'Monospace'}}>
              Passtime.tf??? 
            </Box>
          </Typography>

          <Typography align="center" component={'span'} variant="subtitle1" gutterBottom> 
            <Box sx={{ fontWeight: 'light', fontFamily: 'Monospace'}}>
              the best flipping league ever doooood... 
            </Box>
          </Typography>

          <Box align="center" sx={{ mt: 2}}>
            <Button startIcon={<LoginIcon />}variant="contained" href='/'>
                <Typography component={'span'} > 
                  <Box sx={{ fontWeight: 'bold'}}>
                    Learn More 
                  </Box>
                </Typography>
            </Button>
            
            <Button startIcon={<LoginIcon />}variant="contained" href='/' >
                <Typography component={'span'} > 
                  <Box sx={{ fontWeight: 'bold'}}>
                    Register 
                  </Box>
                </Typography>
            </Button>
          </Box>
         


      </div>
    </Container>

    <Paper style={{height: '50%'}} elevation={3}>

    </Paper>

  
  </ThemeProvider>
}
