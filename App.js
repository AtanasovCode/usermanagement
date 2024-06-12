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
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const saveUsername = useStore((state) => state.saveUsername);
  const saveAvatarUrl = useStore((state) => state.saveAvatarUrl);
  const saveWebsite = useStore((state) => state.saveWebsite);
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
    if (session) {
      getProfile();
    };
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        saveUsername(data.username);
        saveAvatarUrl(data.avatar_url);
        data.website && saveWebsite(data.website);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (navigationRef.current) {
      if (session && session.user) {
        navigationRef.current.navigate('Home');
      } else {
        navigationRef.current.navigate('Auth');
      }
    }
  }, [session]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
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
