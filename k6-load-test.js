import http from 'k6/http';
import { sleep, check } from 'k6';

// Cấu hình kịch bản test
export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Giai đoạn 1: Tăng dần lên 50 user trong 30 giây đầu
    { duration: '1m', target: 100 },  // Giai đoạn 2: Đẩy lên 100 user và giữ nguyên trong 1 phút (Stress)
    { duration: '30s', target: 0 },   // Giai đoạn 3: Giảm dần số lượng user về 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% request phải phản hồi dưới 1000ms
    http_req_failed: ['rate<0.01'],   // Tỉ lệ lỗi phải dưới 1%
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // 1. User truy cập trang chủ
  let res = http.get(`${BASE_URL}/`);
  check(res, { 'Home page status is 200': (r) => r.status === 200 });
  sleep(1); // Thời gian User đọc lướt trang chủ

  // 2. User vào trang Vocabulary
  res = http.get(`${BASE_URL}/vocabulary`);
  check(res, { 'Vocabulary list status is 200': (r) => r.status === 200 });
  sleep(2); // User lướt xem các chủ đề

  // 3. User học từ vựng Topic 1
  res = http.get(`${BASE_URL}/vocabulary/list-1`);
  check(res, { 'Topic 1 status is 200': (r) => r.status === 200 });
  sleep(3); // User lật Flashcard

  // 4. User vào trang Mock Test
  res = http.get(`${BASE_URL}/mock-test`);
  check(res, { 'Mock test menu status is 200': (r) => r.status === 200 });
  sleep(1);

  // 5. User vào danh sách Full Test
  res = http.get(`${BASE_URL}/mock-test/full`);
  check(res, { 'Full list status is 200': (r) => r.status === 200 });
  sleep(2);

  // 6. User bắt đầu vào làm bài thi Mini Test 1
  res = http.get(`${BASE_URL}/mock-test/mini/test-6`);
  check(res, { 'Mini test 1 status is 200': (r) => r.status === 200 });
  sleep(5); // Mô phỏng người dùng làm bài

  // 6. User bắt đầu vào làm bài thi Mini Test 2
  res = http.get(`${BASE_URL}/mock-test/mini/test-7`);
  check(res, { 'Mini test 2 status is 200': (r) => r.status === 200 });
  sleep(5); // Mô phỏng người dùng làm bài

  // 7. User bắt đầu vào làm bài thi Full Test 1 (Trang nặng nhất)
  res = http.get(`${BASE_URL}/mock-test/full/test-1`);
  check(res, { 'Full test 1 status is 200': (r) => r.status === 200 });
  sleep(5); // Mô phỏng người dùng làm bài

  // 6. User bắt đầu vào làm bài thi Full Test 2
  res = http.get(`${BASE_URL}/mock-test/full/test-2`);
  check(res, { 'Full test 2 status is 200': (r) => r.status === 200 });
  sleep(5); // Mô phỏng người dùng làm bài
}
