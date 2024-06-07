import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AppState,
    Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../lib/supabase";
import { FontAwesome } from '@expo/vector-icons';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

const Auth = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <View className="flex-row items-center justify-center gap-4 mb-16">
                <FontAwesome name="users" size={36} color="white" />
                <Text className="text-white font-bold text-2xl">User Management</Text>
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="mail@example.com"
                    placeholderTextColor="#a09d9d"
                    className="bg-slate-800 text-white px-4 py-2 rounded-2xl"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(value) => {
                        setEmail(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="username"
                    placeholderTextColor="#a09d9d"
                    className="bg-slate-800 text-white px-4 py-2 rounded-2xl"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(value) => {
                        setEmail(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#a09d9d"
                    className="bg-slate-800 px-4 py-2 rounded-2xl text-white"
                    keyboardType="email-address"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => {
                        setPassword(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TouchableOpacity
                    className="p-4 rounded-2xl bg-sky-400"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                >
                    <Text className="text-center">Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View className="mx-6 mb-8">
                <TouchableOpacity
                    className="p-4 rounded-2xl bg-gray-300"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <Text className="text-center">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Auth;