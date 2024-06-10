import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AppState,
    Alert,
    Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../lib/supabase";
import { FontAwesome } from '@expo/vector-icons';
import { useStore } from "../useStore";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Account = ({ navigation }) => {

    const [loading, setLoading] = useState(true);

    const session = useStore((state) => state.session);
    const username = useStore((state) => state.username);
    const website = useStore((state) => state.website);
    const avatarUrl = useStore((state) => state.avatarUrl);
    const initialAvatarUrl = useStore((state) => state.initialAvatarUrl);
    const saveUsername = useStore((state) => state.saveUsername);
    const saveAvatarUrl = useStore((state) => state.saveAvatarUrl);
    const saveWebsite = useStore((state) => state.saveWebsite);

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

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }


    return (
        <View className="flex-1 bg-background py-16 justify-between">
            <StatusBar style="light" />
            <View>
                <View className="flex-row gap-4 items-center justify-center mb-12">
                    <FontAwesome name="user" size={36} color="white" />
                    <Text className="font-bold text-2xl text-text text-center">Profile</Text>
                </View>
                <View className="mb-16 items-center justify-center" style={{ height: height * 0.25 }}>
                    <View className="border border-accent rounded-full w-[50%] bg-accent items-center justify-center overflow-hidden">
                        <Image
                            source={{ uri: avatarUrl ? `https://robohash.org/${avatarUrl}` : `https://robohash.org/${username}` }}
                            className="h-full w-[120%]"
                        />
                    </View>
                </View>
                <View className="items-center justify-between flex-row mx-8 mb-6">
                    <Text className="text-md text-gray-400 font-light text-left">e-mail:</Text>
                    <Text className="text-text text-lg">{session?.user?.email}</Text>
                </View>
                <View className="items-center justify-between flex-row mx-8 mb-6">
                    <Text className="text-md text-gray-400 font-light text-left">username:</Text>
                    <Text className="text-text text-lg">{username}</Text>
                </View>
                <View className="items-center justify-between flex-row mx-8">
                    <Text className="text-md text-gray-400 font-light text-left">website:</Text>
                    <Text className="text-text text-lg">{website}</Text>
                </View>
            </View>
            <View className="items-center justify-center" style={{ marginHorizontal: width * 0.1 }}>
                <View className="w-full mb-8">
                    <TouchableOpacity
                        className="bg-accent p-3 rounded-xl items-center justify-center"
                        onPress={() => navigation.navigate("Update")}
                    >
                        <Text className="text-text">Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-full">
                    <TouchableOpacity
                        className="bg-secondary p-3 rounded-xl items-center justify-center"
                        onPress={() => signOut()}
                    >
                        <Text className="text-text">Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Account;
