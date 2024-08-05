import { Stack } from 'expo-router';
//화면에 보여주는 파일 이름을 적어두는 파일
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="CartScreen" />
      <Stack.Screen name="SearchScreen" />
    </Stack>
  );
};

export default RootLayout;
