import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { initAuth } from './api/auth'; // 인증 서비스를 가져옵니다.
import { useNavigation } from '@react-navigation/native'; // useNavigation 훅을 가져옵니다.

const auth = initAuth(); // Firebase 인증 서비스 초기화

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation(); // useNavigation 훅을 사용하여 navigation 객체 가져오기

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.replace('index'); // 로그인 후 홈 화면으로 이동
      })
      .catch((error) => {
        setError(error.message); // 로그인 오류 메시지를 상태에 저장
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
});

export default LoginScreen;
