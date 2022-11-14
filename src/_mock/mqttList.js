import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const mqttLists = [...Array(5)].map((_, index) => ({
  mqttNo: index + 1,
  mqttIp: faker.helpers.fake('{{random.numeric(3)}}.{{random.numeric(3)}}.{{random.numeric(3)}}.{{random.numeric(3)}}'),
  mqttPort: faker.helpers.fake('{{random.numeric(4)}}'),
}));

export default mqttLists;
