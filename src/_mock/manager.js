import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const managers = [...Array(24)].map((_, index) => ({
  userNo: index,
  userId: `managerId${index}`,
  userName: `managerName${index}`,
  email: `managerEmail${index}@test.com`,
  phoneNumber: `010-1234-5678`,
  role: `manager`,
}));

export default managers;
