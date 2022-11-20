import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  userNo: index,
  userId: `userId${index}`,
  userName: `userName${index}`,
  email: `userEmail${index}@test.com`,
  phoneNumber: `010-1234-5678`,
  role: `manager`,
  dongHo: `${index}동 ${index}호`,
  thmoSn: `S1L5SSB20`,
  roomCount: `3`,
}));

export default users;
