// INSTRUCTIONS: TO EXECUTE THIS FILE CAN BE FOUND
// 1. INSTALL K6 https://k6.io/docs/getting-started/installation/
// 2. in SSH, execute $ k6 run *file-path* stress.js

// VIEW TESTS RESULTS:
// https://docs.google.com/document/d/1nK0T3aaUMmcjybJjD2f9sR2JAyhoGFUWhv2Lr2_enMU/edit#heading=h.ze4q1y5tqot4

import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  vus: 100,
  duration: '10s'
}

export default function () {
  const max = 1000000;
  const min = 1;
  const range = Math.floor(Math.random() * 5 + 1);

  const productIds = [];

  for (var i = 0; i < range; i++) {
    const productId = Math.floor(Math.random() * (max - min) + min);
    productIds.push(productId)
  }

  let res = http.post(`http://localhost:9110/related-products`, {
    'productIds': productIds
  });
  check(res, { 'status was 200': (r) => r.status == 200 })
  sleep(1);
}

