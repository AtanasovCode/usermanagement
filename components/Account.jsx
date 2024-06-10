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
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const session = useStore((state) => state.session);

    useEffect(() => {
        if (session) {
            getProfile();
            fetchImageUrl();
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

    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    const fetchImageUrl = async () => {
        const { data } = supabase
            .storage
            .from('avatars')
            .getPublicUrl('profile-placeholder.png');

        if (data.error) {
            console.error(data.error)
        } else {
            setImageUrl(data.publicUrl);
            console.log(data.publicUrl)
        }
    };


    return (
        <View className="flex-1 bg-background py-16 justify-between">
            <StatusBar style="light" />
            <View>
                <View className="flex-row gap-4 items-center justify-center mb-12">
                    <FontAwesome name="user" size={36} color="white" />
                    <Text className="font-bold text-2xl text-text text-center">Profile</Text>
                </View>
                <View className="mb-8" style={{ height: height * 0.2 }}>
                    {
                        imageUrl ?
                            <Image
                                source={{ uri: imageUrl }}
                                className="h-full"
                            />

                            :
                            <Text className="text-text font-bold text-3xl">Loading</Text>
                    }
                </View>
                <View className="items-center justify-between flex-row mx-8 mb-6">
                    <Text className="text-lg text-gray-300 font-light text-left">e-mail:</Text>
                    <Text className="text-text text-lg">{session?.user?.email}</Text>
                </View>
                <View className="items-center justify-between flex-row mx-8 mb-6">
                    <Text className="text-lg text-gray-300 font-light text-left">username:</Text>
                    <Text className="text-text text-lg">{username || 'Loading...'}</Text>
                </View>
                <View className="items-center justify-between flex-row mx-8">
                    <Text className="text-lg text-gray-300 font-light text-left">description:</Text>
                    <Text className="text-text text-lg">{session?.user?.email}</Text>
                </View>
            </View>
            <View className="items-center justify-center" style={{ marginHorizontal: width * 0.2 }}>
                <View className="w-full mb-8">
                    <TouchableOpacity
                        className="bg-primary p-3 rounded-xl items-center justify-center"
                        onPress={() => navigation.navigate("Update")}
                    >
                        <Text className="text-background">Edit Profile</Text>
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
