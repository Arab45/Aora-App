import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';

type AppConfig = {
	CLERK_PUBLISHABLE_KEY: string;
  };
  
  const config = Constants.expoConfig?.extra as AppConfig;
  
  const CLERK_PUBLISHABLE_KEY = config?.CLERK_PUBLISHABLE_KEY ?? '';
  

console.log("Clerk Publishable Key:", CLERK_PUBLISHABLE_KEY);




const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	}
};


export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <Stack>
      <Stack.Screen name="signup" options={ {headerShown: false} }/>
      <Stack.Screen name="login" options={ {headerShown: false} }/>
    </Stack>
   </ClerkProvider>
  )
}
