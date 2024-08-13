import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('HomeScreen'); // 로그인된 경우 홈 화면으로 이동
      } else {
        navigation.replace('LoginScreen'); // 로그인되지 않은 경우 로그인 화면으로 이동
      }
    });

    return unsubscribe; // 컴포넌트가 언마운트될 때 구독 해제
  }, []);

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
