import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import Auth from './components/Auth';

export default function App() {
  return (
    <SafeAreaView className="bg-black flex-1 pt-10">
      <Auth />
    </SafeAreaView>
  );
}
