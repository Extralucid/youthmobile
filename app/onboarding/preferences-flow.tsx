import { Stack } from 'expo-router';

export default function PreferencesLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen name="categories" />
        <Stack.Screen name="skills" />
      </Stack>
    </>
  );
}