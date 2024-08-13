import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

// 프로필 화면
const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.replace('LoginScreen'); // 로그아웃 후 로그인 화면으로 이동
    });
  };

  return (
    <View>
      {user?.photoURL ? (
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 100, height: 100 }}
        />
      ) : (
        <Text>No profile picture</Text>
      )}
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
