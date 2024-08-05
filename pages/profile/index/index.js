'use client'

// kinda ass but w/e
import theme from "../../../app/theme";
import LeagueAppBar from '../../../app/components/LeagueAppBar'

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation'

function Profile() {
    const [UserInfo, setUserInfo] = useState(null)
    const searchParams = useSearchParams()

    useEffect( () => {
      const url = process.env.NEXT_PUBLIC_HOST + '/api/user/steamid/'
      const s64 = searchParams.get('id') 

      fetch( url + s64 )
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data)
        })
    }, [])    

    return <ThemeProvider theme={theme} style={{height: '100vh'}}>
      <CssBaseline />
      <LeagueAppBar />

      <Container maxWidth="xl">
        <Paper elevation={2} style={{padding: '20px', marginTop: '30px'}}>

          <Box sx={{ display: 'flex',  flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>

              <Box sx={{ pr: '20px'}}>
                { UserInfo ? ( 
                  <Avatar sx={{ width: 150, height: 150 }} variant="rounded" src={UserInfo.avatarurl} />
                ) : (
                  <Avatar sx={{ width: 150, height: 150 }} variant="rounded" src='https://steamuserimages-a.akamaihd.net/ugc/2030590818189269938/DC624D8CD92280EDEA0A383BD5A63CBF2755C19C/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true' />
                )}
              </Box>

              <Box sx={{ mt: '8px'}}>
                <Typography sx={{fontWeight: 'regular'}} variant="h4"> 
                  { UserInfo ? ( 
                    UserInfo.username 
                  ) : (
                    'No user found'
                  )}
                </Typography>

                <Typography sx={{fontWeight: 'light'}} variant="h5"> 
                  <Link href="#" underline="none">no current team</Link>
                </Typography>
              </Box>


              <Box sx={{ flexGrow: 1 }}></Box>

          </Box>

        </Paper>

        <Paper elevation={2} sx={{p: '20px', mt: '30px'}}>

            <Box>
              <Typography sx={{fontWeight: 'regular'}} variant="h5">
                Roster History
              </Typography>
            </Box>
  

        </Paper>   

        <Paper elevation={2} sx={{p: '20px', mt: '30px'}}>

            <Box>
              <Typography sx={{fontWeight: 'regular'}} variant="h5">
                Punishment History
              </Typography>

              <Box sx={{mt: '10px'}}>
                nothing yet...
              </Box>
            </Box>
  

        </Paper>     
      </Container>

    </ThemeProvider>  
  }

export default Profile;