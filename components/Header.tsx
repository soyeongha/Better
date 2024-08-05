// components/Header.js
import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옵니다.

  return (
    <View // 헤더 바의 전체 레이아웃을 구성하는 View 컴포넌트입니다.
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
    >
      <Image /* 앱의 로고를 표시하는 Image 컴포넌트입니다. */
        source={require('../assets/images/react-logo.png')}
        style={{ width: 100, height: 40 }}
        resizeMode="contain"
      />
      {/* 오른쪽에 위치할 아이콘들을 포함하는 View 컴포넌트입니다. */}
      <View style={{ flexDirection: 'row' }}>
        <Ionicons /* 검색 아이콘 */
          name="search"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate('SearchScreen')} // 아이콘을 눌렀을 때 'Search' 화면으로 이동합니다.
        />
        <Ionicons /* 장바구니 아이콘 */
          name="cart"
          size={24}
          color="black"
          onPress={() => navigation.navigate('CartScreen')} // 아이콘을 눌렀을 때 'Cart' 화면으로 이동합니다.
        />
      </View>
    </View>
  );
};

export default Header;
