import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import LoginIcon from '@mui/icons-material/Login';

function LeagueAppBar(){
    const header_logo = {
      'width': 'auto',
      'height': 'auto',
      'max-width': '200px',
      'max-height': '54px'
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <a href="/"> <img src="https://gamebanana.com/sprays/embeddables/78973?variant=sd_image" style={header_logo} /> </a>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            

            <Button startIcon={<LoginIcon />}variant="outlined" color="inherit" href='/login'>
              <Typography component={'span'} > 
                <Box sx={{ fontWeight: 'bold'}}>
                  LOGIN 
                </Box>
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

    );
}

export default LeagueAppBar;