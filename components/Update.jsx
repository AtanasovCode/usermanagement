import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Update = () => {

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

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
        <View className="flex-1 py-16 bg-background">
            <View className="flex-row items-center justify-center gap-4 mb-16">
                <FontAwesome5 name="user-edit" size={36} color="white" />
                <Text className="text-text text-center font-bold text-2xl">Edit Profile</Text>
            </View>
            <View className="mx-6 mb-8">
                <TextInput
                    placeholder="Avatar URL"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary text-text px-4 py-2 rounded-2xl"
                    keyboardType="email-address"
                    value={avatarUrl}
                    onChangeText={(value) => {
                        setAvatarUrl(value)
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
                    value={website}
                    onChangeText={(value) => {
                        setWebsite(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TouchableOpacity
                    className="p-4 rounded-2xl bg-accent"
                    disabled={loading}
                >
                    <Text className="text-center text-text">Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Update;