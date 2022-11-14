import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const userApproves = [...Array(24)].map((_, index) => ({
  userNo: index,
  userId: faker.random.words(1),
  userName: faker.name.lastName(),
  aptDongHo: faker.helpers.fake('{{random.numeric(3)}}/{{random.numeric(3)}}'),
  thmoSn: faker.helpers.fake('SN{{random.numeric(10)}}'),
  roomCnt: faker.random.numeric(1),
}));

export default userApproves;
