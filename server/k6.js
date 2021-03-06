import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 500 }, // normal load
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 }, // around the breaking point
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 1500 }, // beyond the breaking point
    { duration: '5m', target: 1000 },
    { duration: '5m', target: 100 }, // scale down. Recovery stage.
  ],
};
export default function () {
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/api/users/77`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
  ]);
  sleep(1);
}