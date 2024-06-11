import { useState, useEffect, useRef } from 'react'
import { supabase } from './lib/supabase'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStore } from './useStore'

import Auth from './components/Auth'
import Account from './components/Account'
import Homepage from './components/Homepage'
import Update from './components/Update'
import CreatePost from './components/CreatePost'

export default function App() {
  const Stack = createNativeStackNavigator();

  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);
  const navigationRef = useRef();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [setSession]);

  useEffect(() => {
    if (navigationRef.current) {
      if (session && session.user) {
        navigationRef.current.navigate('Account');
      } else {
        navigationRef.current.navigate('Auth');
      }
    }
  }, [session]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={session && session.user ? "Home" : "Auth"}>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreatePost}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
