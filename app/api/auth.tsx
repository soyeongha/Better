import { getAuth } from 'firebase/auth';
import { initFirebase } from './firebase'; // Firebase 초기화 함수를 가져옵니다.

// Firebase 앱을 초기화하고 인증 서비스를 가져오는 함수
export const initAuth = () => {
  const app = initFirebase(); // Firebase 앱을 초기화합니다.
  return getAuth(app); // 인증 서비스를 가져와서 반환합니다.
};
