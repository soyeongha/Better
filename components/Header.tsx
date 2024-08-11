import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// Header 컴포넌트 정의
const Header = () => {
  // useRouter 훅을 사용하여 내비게이션 기능을 가져옵니다.
  const router = useRouter();

  return (
    // 상위 컨테이너 뷰
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Image
        source={require('../assets/images/BetterIcon.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* 아이콘들을 감싸는 컨테이너 */}
      <View style={styles.iconsContainer}>
        {/* 검색 아이콘 */}
        <Ionicons
          name="search" // 아이콘의 이름
          size={24} // 아이콘 크기
          color="black" // 아이콘 색상
          style={styles.icon} // 아이콘 스타일
          onPress={() => router.push('/SearchScreen')} // 검색 아이콘 클릭 시 search.js로 이동
        />
        {/* 카트 아이콘 */}
        <Ionicons
          name="cart" 
          size={24}
          color="black"
          style={[styles.icon, { marginLeft: 5 }]} // 아이콘 스타일 및 왼쪽 여백
          onPress={() => router.push('/cartScreen')} // 카트 아이콘 클릭 시 cart.js로 이동
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // 전체 너비
    flexDirection: 'row', // 수평 방향으로 아이템 배치
    height: 50,  // 높이 설정
    backgroundColor: 'white', // 배경색 설정
  },
  logo: {
    width: 100, // 로고의 너비
    height: '100%', // 로고의 높이
    marginRight: 'auto', // 오른쪽 여백을 자동으로 설정하여 아이콘들을 오른쪽으로 밀어냄
  },
  iconsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row', // 아이콘들을 수평으로 배치
    alignItems: 'center', // 아이콘들을 세로로 중앙 정렬
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: 10, // 아이콘 사이의 간격 설정
  },
});

export default Header;
