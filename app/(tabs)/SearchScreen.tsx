import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState(''); // 검색어 상태
  const [results, setResults] = useState([]); // 검색 결과 상태

  const handleSearch = () => {
    // 실제로는 API를 호출하거나 로컬 데이터베이스에서 검색합니다.
    // 여기서는 간단한 예시로 빈 배열을 설정합니다.
    setResults([
      { id: '1', name: 'Lipstick' },
      { id: '2', name: 'Foundation' },
      // 예시 데이터
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for cosmetics..."
        value={query}
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch} // 검색어 입력 후 키보드의 'Enter'를 누를 때 호출
      />
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => {
              /* 검색 결과 클릭 처리 */
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  resultItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SearchScreen;
