import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import apiHelper from 'src/utils/apiHelper';

import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';

import Scrollbar from '../../components/scrollbar';

import { UserListHead, UserListToolbar } from './component';

import USERLIST from '../../_mock/user';

const TABLE_HEAD = [
  { id: 'dongHo', label: '동 / 호수', alignRight: false },
  { id: 'userName', label: '이름', alignRight: false },
  { id: 'thmoSn', label: '보일러 SN', alignRight: false },
  { id: 'roomCount', label: '방 개수', alignRight: false },
  { id: '' },
];

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
    return array.filter((_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserMgmtPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('userName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    // const result = await apiHelper.get("/userList");
    console.log("getUserList", USERLIST);
    setUserList(USERLIST);
  }

  useEffect(() => {
    getUserList();
  }, []); 

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

  const handleDelUser = async (e, params) => {
    console.log("params", params);
    // 컨펌
      // const res = await apiHelper.delete("/userDelete", {userNo: params.userNo});
      // 정상인경우
        const nUserList = userList.filter((v) => v.userNo !== params.userNo);
        setUserList(nUserList);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;
  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> 사용자 관리 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            사용자 관리
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { userNo, dongHo, userName, thmoSn, roomCount } = row;

                    return (
                      <TableRow hover key={userNo} tabIndex={-1}>
                        <TableCell component="th" align="left">{dongHo}</TableCell>
                        <TableCell align="left">{userName}</TableCell>
                        <TableCell align="left">{thmoSn}</TableCell>
                        <TableCell align="left">{roomCount}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="error" onClick={(e) => handleDelUser(e, row)}>
                            삭제
                          </Button>
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
                            결과를 찾을 수 없습니다.
                          </Typography>

                          <Typography variant="body2">
                            <strong>&quot;{filterName}&quot;</strong> 에 대한 결과가 없습니다.
                            <br /> 입력한 값을 확인해주세요.
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
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
