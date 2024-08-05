import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 카테고리 페이지
const CategoryScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />, // Header 컴포넌트를 헤더로 사용
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>카테고리 스크린</Text>
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

export default CategoryScreen;
