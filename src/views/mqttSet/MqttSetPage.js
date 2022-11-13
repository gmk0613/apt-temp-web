import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  TableHead,
} from '@mui/material';

// mock
import mqttLists from 'src/_mock/mqttList';

// components
import Scrollbar from '../../components/scrollbar';
// sections
// import { } from './component';

const aptList = [
  { label: 'AptA', value: 'AptA_v'},
  { label: 'AptB', value: 'AptB_v'}
]

const mqttList = [
  { label: 'MqttA', value: 'MqttA_v'},
  { label: 'MqttB', value: 'MqttB_v'}
]

const TABLE_HEAD = [
  { id: 'mqttNo', label: 'No', align: 'left' },
  { id: 'mqttIp', label: 'MQTT IP', align: 'left' },
  { id: 'mqttPort', label: 'MQTT PORT', align: 'left' },
  { id: '', label: '' },
];

export default function UserPage() {
  const [apt, setApt] = useState();
  const [mqtt, setMqtt] = useState();

  const handleAptChange = (e, param) => {
    setApt(e.target.value);
  }

  const handleMqttChange = (e, param) => {
    setMqtt(e.target.value);
  }

  const handleDelete = (e, param) => {
    console.log(e);
    console.log(param);
  }

  const handleUpdate = (e) => {
    console.log(e);
  }

  return (
    <>
      <Helmet>
        <title> MQTT 설정 </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          MQTT 설정
        </Typography>

        <Stack spacing={3}>

          <Card sx={{p: 3}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={2}>아파트 이름</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <InputLabel id="apt-select">아파트</InputLabel>
                  <Select
                    labelId="apt-select"
                    id="apt-selectbox"
                    value={apt}
                    onChange={handleAptChange}
                    label="아파트"
                  >
                    {aptList.map((apt) => (
                      <MenuItem value={apt.value}>{apt.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={3} lg={2}>MQTT Broker</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <InputLabel id="mqtt-select">Broker</InputLabel>
                  <Select
                    labelId="mqtt-select"
                    id="mqtt-selectbox"
                    value={mqtt}
                    label="Broker"
                    onChange={handleMqttChange}
                  >
                    {mqttList.map((mqtt) => (
                      <MenuItem value={mqtt.value}>{mqtt.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid sx={{mt: 2}} textAlign={'right'}>
              <Button variant="contained" onClick={handleUpdate}>
                MQTT 정보 갱신
              </Button>
            </Grid>
          </Card>

          <Card sx={{p: 3}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={2}>MQTT Broker IP</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <TextField id="outlined-basic" variant="outlined" label="Broker IP" />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={3} lg={2}>MQTT Broker Port</Grid>
              <Grid item xs={12} md={9} lg={10}>
                <FormControl fullWidth>
                  <TextField id="outlined-basic" variant="outlined" label="Broker Port" />
                </FormControl>
              </Grid>
            </Grid>

            <Grid sx={{mt: 2}} textAlign={'right'}>
              <Button variant="contained" onClick={handleUpdate}>
                MQTT 서버 추가
              </Button>
            </Grid>
          </Card>

          <Card sx={{p: 3}}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              MQTT Broker 리스트
            </Typography>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    {TABLE_HEAD.map((header) => (
                      <TableCell>
                        {header.label}
                      </TableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {mqttLists.map((row) =>{
                      const { mqttNo, mqttIp, mqttPort } = row;

                      return (
                        <TableRow hover key={mqttNo} tabIndex={-1}>
                          <TableCell align="left">{mqttNo}</TableCell>
                          <TableCell align="left">{mqttIp}</TableCell>
                          <TableCell align="left">{mqttPort}</TableCell>
                          <TableCell align="center">
                            <Button color='error' variant="contained" onClick={(e) => handleDelete(e, row)}>
                              삭제
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
