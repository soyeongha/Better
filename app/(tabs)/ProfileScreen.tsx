import { StyleSheet, Text, View } from 'react-native';

// 프로필 화면
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>프로필 스크린</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
