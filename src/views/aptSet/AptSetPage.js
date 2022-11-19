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
  Grid,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
// import { } from './component';
// mock

// ----------------------------------------------------------------------

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

  const handleAptSave = (e) => {
    console.log(e);
  }

  const handleAddTemplate = (e) => {
    console.log(e);

    const newApt = {
      floor: floorNum,
      ho: hoNum,
    };

    setAptList((prev) => [...prev, newApt]);
    setInputs({floorNum: '', hoNum: ''});
  }

  const handleDeleteTemplate = (e) => {
    console.log(e);
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
                  <TextField id="aptNm" name="aptNm" variant="outlined" label="아파트 이름" value={aptNm} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={2}>주소</Grid>
              <Grid item xs={12} md={10}>
                <FormControl fullWidth>
                  <TextField id="aptAddress" name="aptAddress" variant="outlined" label="주소" value={aptAddress} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt: 2}}>
              <Grid item xs={12} md={2}>대표 관리실 전화번호</Grid>
              <Grid item xs={12} md={10}>
                <FormControl fullWidth>
                  <TextField id="aptNumber" name="aptNumber" variant="outlined" label="대표 관리실 전화번호" value={aptNumber} onChange={handleInputsChange}/>
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          
          {aptList.map((apt) => {
            console.log(apt);

            return (
              <Card sx={{p: 3}}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={1}>동</Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <TextField size='small' id="aptDong" name="aptDong" variant="outlined" label="Ex) 101"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={7} textAlign={'right'}>
                    <Button size='small' color='error' variant="contained" onClick={handleDeleteTemplate}>
                      삭제
                    </Button>
                  </Grid>
                </Grid>
    
                <Grid container spacing={3} sx={{mt: 2}}>
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        <TableRow hover tabIndex={-1}>
                          <TableCell align='center'>
                            {apt.floor} / {apt.ho}
                          </TableCell> 
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid sx={{mt: 2}} textAlign={"right"}>
                  <Button size='small' variant="contained" onClick={handleAptSave}>
                    정보저장
                  </Button>
                </Grid>
              </Card>
            )
          })}
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
