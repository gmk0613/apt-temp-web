import React, { useState } from 'react';

import { Card, Grid } from '@mui/material';

import apiHelper from 'src/utils/apiHelper';

import ApexChart from './ApexChart'

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
          <ApexChart
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43],
                },
              ]}
            />
        </Grid>
        
        <Grid item xs={12} md={12} textAlign={'center'}>
          <div>{lastUpdateTime}</div>
        </Grid>
      </Grid>
    </Card>
  );
}
