import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../env';

//Firebase 앱을 초기화하는 데만 사용됩니다.

export const initFirebase = () => {
  return initializeApp(firebaseConfig);
};
