import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
  Grid,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { ManagerListHead, ManagerListToolbar, ManagerDialog } from './component';
// mock
import MANAGERLIST from '../../_mock/manager';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user_no', label: 'No', alignRight: false },
  { id: 'user_id', label: 'ID', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'user_name', label: 'Name', alignRight: false },
  { id: 'email', label: 'E-mail', alignRight: false },
  { id: 'phone_number', label: 'Phone', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dialog, setDialog] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [manager, setManager] = useState({
    userId: '',
    userName: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenMenu = (event, row) => {
    console.log('row');
    console.log(row);
    setManager(row);
    console.log('manager');
    console.log(manager);
    setOpen(event.currentTarget);
  };

  const modifyManager = () => {
    console.log('manager1');
    console.log(manager);
    setIsCreate(false);
    setDialog(true);
    console.log('manager2');
    console.log(manager);
  };

  const createManager = () => {
    setManager({
      userId: '',
      userName: '',
      email: '',
      phoneNumber: '',
      role: 'manager',
    });
    setIsCreate(true);
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MANAGERLIST.length) : 0;

  const filteredUsers = applySortFilter(MANAGERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Manager | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manager
          </Typography>
        </Stack>
        <Grid sx={{ mb: 2 }} textAlign={'right'}>
          <Button variant="contained" onClick={createManager}>
            Manager 추가
          </Button>
        </Grid>

        <Card>
          <ManagerListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ManagerListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { userNo, userId, userName, email, phoneNumber, role } = row;
                    const selectedUser = selected.indexOf(userName) !== -1;

                    return (
                      <TableRow hover key={userNo} tabIndex={-1} selected={selectedUser}>
                        <TableCell component="th" scope="row" align="center">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {userNo}
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{userId}</TableCell>
                        <TableCell align="left">
                          <Label>{role}</Label>
                        </TableCell>
                        <TableCell align="left">{userName}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{phoneNumber}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={MANAGERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ManagerDialog dialog={dialog} manager={manager} closeDialog={closeDialog} isCreate={isCreate} />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={modifyManager}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
