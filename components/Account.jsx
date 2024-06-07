import React, { useState, useEffect } from "react";
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

const Account = ({ session }) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (session) getProfile();
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
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-black">
            <StatusBar style="light" />
            <View className="flex-row gap-4 items-center justify-center mb-8">
                <FontAwesome name="user" size={36} color="white" />
                <Text className="font-bold text-2xl text-white text-center">Profile</Text>
            </View>
            <View className="items-center justify-center">
                <Text className="text-white font-bold text-xl mb-6">{session?.user?.email}</Text>
            </View>
        </View>
    );
};

export default Account;
