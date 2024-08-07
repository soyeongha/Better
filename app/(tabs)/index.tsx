import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import useFetchProducts from '@/components/useFetchProducts';

// URL을 프로토콜에 맞게 변환하는 함수
const resolveImageUrl = (url) => {
  return url.startsWith('//') ? 'https:' + url : url;
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { products, loading, error } = useFetchProducts('maybelline');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerStyle: {
        backgroundColor: 'white', // 헤더 배경색 추가
      },
      headerTintColor: 'black', // 헤더 아이콘 색상 추가
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // 2열로 표시
        renderItem={({ item }) => {
          const imageUrl = resolveImageUrl(item.api_featured_image);

          return (
            <View style={styles.productContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              {item.api_featured_image ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.productImage}
                  onError={(e) =>
                    console.log('Image loading error:', e.nativeEvent.error)
                  }
                />
              ) : (
                <Text>No image available</Text>
              )}
            </View>
          );
        }}
        columnWrapperStyle={styles.row} // 열의 스타일을 설정합니다.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    justifyContent: 'space-between', // 열 사이에 공간을 추가합니다.
  },
  productContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
  },
  productImage: {
    width: '100%', // 이미지 너비를 부모 컨테이너에 맞게 설정
    height: 100,
    marginTop: 10,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
