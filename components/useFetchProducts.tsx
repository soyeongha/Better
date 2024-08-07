import { useState, useEffect } from 'react';

const useFetchProducts = (brand) => {
  // products: 화장품 데이터를 저장할 상태 //추가
  const [products, setProducts] = useState([]); //추가
  // loading: 데이터 로딩 중인지 여부를 저장할 상태 //추가
  const [loading, setLoading] = useState(true); //추가
  // error: 에러 정보를 저장할 상태 //추가
  const [error, setError] = useState(null); //추가

  useEffect(() => {
    // fetchProducts: 데이터를 가져오는 비동기 함수 //추가
    const fetchProducts = async () => {
      try {
        // API 호출: 브랜드에 맞는 화장품 데이터를 가져옵니다. //추가
        const response = await fetch(
          `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`
        );
        const data = await response.json();
        setProducts(data); // 가져온 데이터를 products 상태에 저장합니다. //추가
      } catch (err) {
        setError(err); // 에러가 발생하면 error 상태에 저장합니다. //추가
      } finally {
        setLoading(false); // 데이터 로딩이 끝나면 loading 상태를 false로 설정합니다. //추가
      }
    };

    fetchProducts(); // 컴포넌트가 마운트될 때 API 호출을 시작합니다. //추가
  }, [brand]); // brand가 변경될 때마다 API를 다시 호출합니다. //추가

  return { products, loading, error }; // 상태를 반환합니다. //추가
};

export default useFetchProducts; // 이 훅을 외부에서 사용할 수 있도록 내보냅니다. //추가
