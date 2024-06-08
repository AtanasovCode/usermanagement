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
import { useStore } from "../useStore";

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
    const [username, setUsername] = useState('');

    const session = useStore((state) => state.session);

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
        setLoading(true);
        const {
            data: { user, session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert(error.message);
            setLoading(false);
            return;
        }

        if (user) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ username: username })
                .eq('id', user.id);

            if (updateError) {
                Alert.alert(updateError.message);
            }
        }

        setLoading(false);
    }


    return (
        <View className="flex-1 bg-background pt-16">
            <StatusBar style="light" />
            <View className="flex-row items-center justify-center gap-4 mb-16">
                <FontAwesome name="users" size={36} color="white" />
                <Text className="text-text font-bold text-2xl">User Management</Text>
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="mail@example.com"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary text-text px-4 py-2 rounded-2xl"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(value) => {
                        setEmail(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary text-text px-4 py-2 rounded-2xl"
                    value={username}
                    onChangeText={(value) => {
                        setUsername(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary px-4 py-2 rounded-2xl text-text"
                    keyboardType="email-address"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => {
                        setPassword(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-4">
                <TouchableOpacity
                    className="p-4 rounded-2xl bg-primary"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                >
                    <Text className="text-center">Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View className="mx-6 mb-8">
                <TouchableOpacity
                    className="p-4 rounded-2xl bg-accent"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <Text className="text-center text-text">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Auth;