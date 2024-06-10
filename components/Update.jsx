import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useStore } from "../useStore";
import { supabase } from "../lib/supabase";

const Update = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    const session = useStore((state) => state.session);
    const username = useStore((state) => state.username);
    const website = useStore((state) => state.website);
    const avatarUrl = useStore((state) => state.avatarUrl);
    const saveUsername = useStore((state) => state.saveUsername);
    const saveAvatarUrl = useStore((state) => state.saveAvatarUrl);
    const saveWebsite = useStore((state) => state.saveWebsite);

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
            navigation.navigate("Account");
        }
    }

    return (
        <View className="flex-1 py-16 bg-background">
            <View className="flex-row items-center justify-center gap-4 mb-16">
                <FontAwesome5 name="user-edit" size={36} color="white" />
                <Text className="text-text text-center font-bold text-2xl">Edit Profile</Text>
            </View>
            <View className="mx-6 mb-8">
                <Text className="text-slate-400 mb-4 text-xs text-left">
                    profile photo (default prompt is your nickname)
                </Text>
                <TextInput
                    placeholder="mycoolrobotphoto"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary text-text px-4 py-2 rounded-2xl"
                    keyboardType="email-address"
                    value={avatarUrl}
                    onChangeText={(value) => {
                        saveAvatarUrl(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <Text className="text-slate-400 mb-4 text-xs text-left">
                    username
                </Text>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary text-text px-4 py-2 rounded-2xl"
                    value={username}
                    onChangeText={(value) => {
                        saveUsername(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <Text className="text-slate-400 mb-4 text-xs text-left">
                    website
                </Text>
                <TextInput
                    placeholder="Website"
                    placeholderTextColor="#a09d9d"
                    className="bg-secondary px-4 py-2 rounded-2xl text-text"
                    keyboardType="default"
                    value={website}
                    onChangeText={(value) => {
                        saveWebsite(value)
                    }}
                />
            </View>
            <View className="mx-6 mb-8">
                <TouchableOpacity
                    className="p-4 rounded-2xl bg-accent"
                    disabled={loading}
                    onPress={() => {
                        updateProfile(username, website, avatarUrl)
                    }}
                >
                    <Text className="text-center text-text">Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Update;