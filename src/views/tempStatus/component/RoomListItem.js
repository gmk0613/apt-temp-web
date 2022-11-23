import React, { useState } from 'react';

import { Card, Grid } from '@mui/material';

import apiHelper from 'src/utils/apiHelper';

export default function AptListItem({ roomName, temp, setTemp, data, lastUpdateTime }) {
  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          {roomName}
        </Grid>
        <Grid item xs={12} md={6} textAlign={'center'}>
          <div>온도</div>
          <div>{temp}</div>
        </Grid>
        <Grid item xs={12} md={6} textAlign={'center'}>
          <div>설정 온도</div>
          <div>{setTemp}</div>
        </Grid>
        <Grid item xs={12} md={12} textAlign={'center'}>
          <div>{lastUpdateTime}</div>
        </Grid>
      </Grid>
    </Card>
  );
}
