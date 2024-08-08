import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchScreen from './SearchScreen'; // SearchScreen 컴포넌트 경로

// tab의 레이아웃
const TabLayout = () => {
  return (
    <Tabs
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Tabs.Screen
        name="CategoryScreen"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'view-headline' : 'view-headline'}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-circle' : 'account-circle-outline'}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="SearchScreen" // 탭의 이름 (화면 이동 시 사용할 이름)
        component={SearchScreen} // 해당 탭에서 렌더링할 컴포넌트
        options={{
          title: 'Search', // 탭 바에 표시될 제목
          tabBarIcon: (
            { color, focused } // 탭 바의 아이콘 설정
          ) => (
            <MaterialCommunityIcons
              name={focused ? 'magnify' : 'magnify'} // 아이콘 이름 (focused 상태에 따라 변경)
              color={color} // 아이콘 색상 (탭이 선택된 상태에 따라 변경)
              size={32} // 아이콘 크기
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
