import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Card, Grid, Stack, FormControl, TextField, Button, Container, Typography } from '@mui/material';

// sections
// mock

import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

import { RoomListItem } from './component';

const { RangePicker } = DatePicker;
const onChange = (date) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};
const onRangeChange = (dates, dateStrings) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};
const rangePresets = [
  {
    label: 'Last 30 Minutes',
    value: [dayjs().add(-30, 'm'), dayjs()],
  },
  {
    label: 'Last 1 Hours',
    value: [dayjs().add(-1, 'h'), dayjs()],
  },
  {
    label: 'Last 2 Hours',
    value: [dayjs().add(-2, 'h'), dayjs()],
  },
  {
    label: 'Last 6 Hours',
    value: [dayjs().add(-6, 'h'), dayjs()],
  },
  {
    label: 'Last 24 Hours',
    value: [dayjs().add(-24, 'h'), dayjs()],
  },
  {
    label: 'Last 7 Days',
    value: [dayjs().add(-7, 'd'), dayjs()],
  },
];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  const [inputs, setInputs] = useState({
    dong: '',
    ho: '',
    startTime: '',
    endTIme: '',
  });

  const { dong, ho, startTime, endtIme } = inputs;

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const roomDataList = [
    { id: 1, roomName: '??????', temp: 30, setTemp: 30, data: [], lastUpdateTime: '2022-11-24 04:13:39' },
    { id: 2, roomName: '???1', temp: 30, setTemp: 30, data: [], lastUpdateTime: '2022-11-24 04:13:39' },
    { id: 3, roomName: '???2', temp: 30, setTemp: 30, data: [], lastUpdateTime: '2022-11-24 04:13:39' },
    { id: 4, roomName: '???3', temp: 30, setTemp: 30, data: [], lastUpdateTime: '2022-11-24 04:13:39' },
    { id: 5, roomName: '?????????', temp: 30, setTemp: 30, data: [], lastUpdateTime: '2022-11-24 04:13:39' },
  ];

  const search = () => {};

  return (
    <>
      <Helmet>
        <title> ?????? ?????? </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            ?????? ??????
          </Typography>
        </Stack>
        <Stack spacing={3} sx={{ pb: 3 }}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={1}>
                ???
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <TextField
                    id="dong"
                    name="dong"
                    variant="outlined"
                    label="???"
                    value={dong}
                    onChange={handleInputsChange}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                ??????
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <TextField
                    id="ho"
                    name="ho"
                    variant="outlined"
                    label="??????"
                    value={ho}
                    onChange={handleInputsChange}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                ??????
              </Grid>
              <Grid item xs={12} md={5}>
                <RangePicker
                  size="large"
                  presets={rangePresets}
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  onChange={onRangeChange}
                />
              </Grid>
            </Grid>

            <Grid textAlign={'right'} sx={{ pt: 3 }}>
              <Button variant="contained" onClick={search}>
                ??????
              </Button>
            </Grid>
          </Card>
        </Stack>
        <Grid container spacing={3}>
          {roomDataList.map((room) => (
            <Grid item xs={12} md={4} key={room.id}>
              <RoomListItem
                roomName={room.roomName}
                temp={room.temp}
                setTemp={room.setTemp}
                data={room.data}
                lastUpdateTime={room.lastUpdateTime}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
