import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import apiHelper from 'src/utils/apiHelper';
import { v4 as uuid } from 'uuid';

import {
  Card,
  Stack,
  Container,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Grid,
} from '@mui/material';

import { AptListItem } from './component';
import Iconify from '../../components/iconify';

export default function AptSetPage() {

  const [inputs, setInputs] = useState({
    aptNm: '',
    aptAddress: '',
    aptNumber: '',
    floorNum: '',
    hoNum: ''
  });
  const [aptList, setAptList] = useState([]);

  const { aptNm, aptAddress, aptNumber, floorNum, hoNum } = inputs;

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleAddTemplate = (e) => {
    const newApt = {
      id: uuid(),
      access: false,
      dong: '',
      floor: floorNum,
      ho: hoNum,
    };

    setAptList((prev) => [...prev, newApt]);
    setInputs({floorNum: '', hoNum: ''});
  }

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
              <Grid item xs={12} md={2}>아파트 이름</Grid>
              <Grid item xs={12} md={10}>
                <FormControl fullWidth>
                  <TextField id="aptNm" name="aptNm" variant="outlined" value={aptNm} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={2}>주소</Grid>
              <Grid item xs={12} md={10}>
                <FormControl fullWidth>
                  <TextField id="aptAddress" name="aptAddress" variant="outlined" value={aptAddress} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={2}>대표 관리실 전화번호</Grid>
              <Grid item xs={12} md={10}>
                <FormControl fullWidth>
                  <TextField id="aptNumber" name="aptNumber" variant="outlined" value={aptNumber} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          {aptList.map((apt) => (
            <AptListItem
              key={apt.id}
              id={apt.id}
              access={apt.access}
              dong={apt.dong}
              floor={apt.floor}
              ho={apt.ho}
              aptList={aptList}
              setAptList={setAptList}
            />
          ))}
          {aptList.length < 1 && (
            <Card sx={{p: 3, textAlign: 'center'}}>
              아파트를 등록해주세요.
            </Card>
          )}

          <Card sx={{p: 3}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={1}>층 수</Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField id="floorNum" name="floorNum" variant="outlined" value={floorNum} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>호 수</Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField id="hoNum" name="hoNum" variant="outlined" value={hoNum} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2} textAlign={'right'}>
                <IconButton
                  onClick={handleAddTemplate}
                  sx={{mr: 1}}
                  size='large'
                >
                  <Iconify icon="ic:baseline-plus" style={{width: '40px', height: '40px', color:'black'}}/>
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Container>
    </>
  );
}