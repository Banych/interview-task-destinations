import { Box, Card, CardContent, Grid } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import { ReactComponent as BG } from './assets/svg/bg.svg';
import router from "./router";

function App() {

  return (
    <Box
      style={{
        position: 'relative',
        height: '100vh'
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        position='absolute'
        top={0}
        bottom={0}
        left={0}
        right={0}
        zIndex={-1}
      >
        <BG
          style={{
            fill: 'conic-gradient(from 168deg at 26.05% 40.64%, #ABE1C9 8.738755658268929deg, #80CDD7 160.76123356819153deg, #7C9CE5 225.34600496292114deg, rgba(126, 163, 230, 0.22) 298.84072065353394deg, rgba(207, 238, 187, 0.88) 341.0336709022522deg)',
            filter: 'blur(150px)',
            width: '1150.392px',
            height: '584px',
          }}
        />
      </Box>
      <Box
        display='flex'
        height='100%'
        alignItems='center'
        justifyContent='center'
      >
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={11} md={10} lg={6} >
            <Card
            >
              <CardContent>
                <Box
                  py={4}
                  px={8}
                  sx={(theme) => ({
                    [ theme.breakpoints.down('md') ]: {
                      paddingY: 2,
                      paddingX: 4,
                    }
                  })}
                >
                  <RouterProvider router={router} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box >

  );
}

export default App;
