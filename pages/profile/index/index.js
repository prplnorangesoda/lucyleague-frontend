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
    const params = useSearchParams()

    useEffect( () => {
      const s64 = params.get('id') 
      const url = process.env.NEXT_PUBLIC_HOST + '/api/v1/user/steamid/'
      const query = url + s64

      fetch( query )
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }, [params])    

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
                  <Avatar sx={{ width: 150, height: 150 }} variant="rounded" src='/assets/jotchua.png' />
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