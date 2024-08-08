import BannerSlider from '@/components/BannerSlider';
import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react'; // React 및 훅들을 가져옴
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native'; // React Native 컴포넌트 및 스타일 관련 함수들을 가져옴

const { width } = Dimensions.get('window'); // 기기의 화면 너비를 가져와서 width 변수에 저장

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // 신상품 목록을 관리할 상태값을 선언
  const [brands, setBrands] = useState({}); // 브랜드별 상품 목록을 관리할 상태값을 선언
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerStyle: {
        backgroundColor: 'white', // 헤더 배경색 추가
      },
      headerTintColor: 'black', // 헤더 아이콘 색상 추가
    });
  }, [navigation]);

  // 신상품 및 브랜드별 상품 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    fetch('https://makeup-api.herokuapp.com/api/v1/products.json') // 외부 API로부터 데이터 가져오기
      .then((response) => response.json()) // JSON 형태로 파싱
      .then((data) => {
        // 가격이 0이 아니고 이미지 링크가 있는 상품만 필터링하여 신상품 목록에 저장
        const filteredProducts = data
          .filter((item) => item.price > 0 && item.api_featured_image) // 가격이 0이 아니고 이미지가 있는 상품만 포함
          .sort((a, b) => b.id - a.id) // ID가 큰 순서대로 정렬
          .slice(0, 12); // 상위 12개 상품만 추출
        setProducts(filteredProducts); // 상태값에 저장

        // 브랜드별로 상품을 그룹화하고 브랜드별로 상품 목록 생성
        const groupedByBrand = data.reduce((acc, product) => {
          if (product.price > 0 && product.api_featured_image) {
            // 가격이 0이 아니고 이미지가 있는 상품만 포함
            if (!acc[product.brand]) acc[product.brand] = []; // 브랜드별로 배열 초기화
            acc[product.brand].push(product); // 해당 브랜드 배열에 상품 추가
          }
          return acc;
        }, {});

        // 각 브랜드 내에서 ID 기준으로 정렬 후 상위 8개 상품만 저장
        for (let brand in groupedByBrand) {
          if (groupedByBrand[brand].length >= 12) {
            // 상품이 12개 이상 있는 브랜드만 포함
            groupedByBrand[brand] = groupedByBrand[brand]
              .sort((a, b) => b.id - a.id)
              .slice(0, 8);
          } else {
            delete groupedByBrand[brand]; // 12개 미만인 브랜드는 삭제
          }
        }

        setBrands(groupedByBrand); // 상태값에 저장
      });
  }, []); // 빈 배열을 두어 처음에만 한 번 실행되도록 설정

  // 신상품 목록에 각 아이템을 렌더링하는 함수
  const renderProductItem = ({ item }) => {
    // 이미지 URL이 //로 시작하면 https:를 붙여서 절대 경로로 변환
    const imageUrl = item.api_featured_image.startsWith('//')
      ? `https:${item.api_featured_image}`
      : item.api_featured_image;

    return (
      <View style={styles.productContainer}>
        <Image
          source={{ uri: imageUrl }} // 절대 경로로 변환된 이미지 URL 사용
          style={styles.productImage}
        />
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text
          style={styles.productName}
          numberOfLines={1} // 한 줄로 표시
          ellipsizeMode="tail" // 텍스트가 길 경우 뒷부분을 생략하고 ...으로 표시
        >
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          ₩{Number(item.price * 1300).toLocaleString()}
        </Text>
        {/* 가격 (원화로 변환 후 콤마 처리) */}
      </View>
    );
  };

  // 브랜드별로 섹션을 렌더링하는 함수
  const renderBrandSection = (brand, products) => (
    <View key={brand}>
      <Text style={styles.sectionTitle}>{brand}</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem} // 신상품 렌더링 함수 재사용
        keyExtractor={(item) => item.id.toString()} // 고유 키 설정
        horizontal // 수평 스크롤
        showsHorizontalScrollIndicator={true} // 수평 스크롤바 표시
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 베너 슬라이드 */}
      <BannerSlider />
      {/* 신상품 목록 */}
      <Text style={styles.sectionTitle}>신상품</Text>
      <FlatList
        data={products} // 신상품 데이터
        renderItem={renderProductItem} // 신상품 렌더링 함수
        keyExtractor={(item) => item.id.toString()} // 고유 키 설정
        numColumns={3} // 3열로 정렬
        scrollEnabled={false} // 이 FlatList의 스크롤 비활성화 (전체 ScrollView에서 스크롤 관리)
      />
      {/* 브랜드별 상품 목록 */}
      {Object.keys(brands).map((brand) =>
        renderBrandSection(brand, brands[brand])
      )}
      {/* 각 브랜드별 섹션 렌더링 */}
    </ScrollView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 채우도록 설정
  },
  bannerImage: {
    width: width, // 화면 너비에 맞게 설정
    height: 200, // 이미지 높이를 200으로 설정
  },
  sectionTitle: {
    fontSize: 18, // 섹션 제목 폰트 크기
    fontWeight: 'bold', // 섹션 제목 폰트 굵기
    marginVertical: 10, // 섹션 제목 위아래 여백
  },
  productContainer: {
    flex: 1, // 아이템을 화면에 골고루 분배
    margin: 5, // 아이템 간의 여백 설정
    alignItems: 'center', // 중앙 정렬
  },
  productImage: {
    width: 100, // 이미지 너비
    height: 100, // 이미지 높이
  },
  productBrand: {
    fontSize: 14, // 브랜드명 폰트 크기
    fontWeight: 'bold', // 브랜드명 폰트 굵기
  },
  productName: {
    fontSize: 12, // 상품명 폰트 크기
    maxWidth: 100, // 상품명 텍스트의 최대 너비를 지정 (긴 이름 생략 시 유용)
  },
  productPrice: {
    fontSize: 12, // 가격 폰트 크기
    color: 'green', // 가격 폰트 색상
  },
});

export default HomeScreen;
