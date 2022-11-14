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
  FormControl
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

        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead root>
                <TableCell>a</TableCell>
                <TableCell>b</TableCell>
              </TableHead>
              <TableBody>
                <TableRow hover tabIndex={-1}>
                  <TableCell>
                  <FormControl>
                    <TextField id="a" name="a" variant="outlined" label="a"/>
                  </FormControl>
                  </TableCell>
                  <TableCell>bb</TableCell>
                </TableRow>
                <TableRow hover tabIndex={-1}>
                  <TableCell>aaa</TableCell>
                  <TableCell>bbb</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

      </Container>
    </>
  );
}
