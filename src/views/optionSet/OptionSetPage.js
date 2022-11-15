import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TableHead,
  TextField,
  FormControl,
  Grid
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
// import { } from './component';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];


export default function UserPage() {


  return (
    <>
      <Helmet>
        <title> 아파트 설정 </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            아파트 설정
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Card sx={{p: 3}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={2}>MQTT Broker IP</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <TextField id="mqttIp" name="mqttIp" variant="outlined" label="Broker IP"/>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={3} lg={2}>MQTT Broker Port</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <TextField id="mqttPort" name="mqttPort" variant="outlined" label="Broker Port"/>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={3} lg={2}>MQTT Broker Port</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <TextField id="mqttPort" name="mqttPort" variant="outlined" label="Broker Port"/>
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{p: 3}}>
            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={3} lg={2}>동</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <TextField id="mqttPort" name="mqttPort" variant="outlined" label="Ex) 101"/>
                </FormControl>
              </Grid>
            </Grid>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow hover tabIndex={-1}>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                    </TableRow>

                    <TableRow hover tabIndex={-1}>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <TextField id="a" name="a" variant="outlined" size="small"/>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
