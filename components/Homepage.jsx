import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../useStore";
import { TouchableOpacity } from "react-native";

const Homepage = ({ navigation }) => {

    const session = useStore((state) => state.session);
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const avatarUrl = useStore((state) => state.avatarUrl);
    const username = useStore((state) => state.username);

    const posts = useStore((state) => state.posts);
    const savePosts = useStore((state) => state.savePosts);

    useEffect(() => {
        if (session) {
            getPosts();
        };
    }, [session]);

    async function getPosts() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const { data, error, status } = await supabase
                .from('posts')
                .select(`*`)

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                savePosts(data)
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
        console.log(posts);
    }, [posts])

    return (
        <SafeAreaView className="flex-1 bg-background py-8 px-6">
            <View className="mb-12 items-center justify-center flex-row">
                <Text className="font-bold text-2xl text-center text-text">Home</Text>
                <TouchableOpacity
                    className="absolute right-0"
                    onPress={() => navigation.navigate("Account")}
                >
                    <View className="border border-accent bg-accent rounded-full w-12 h-12 items-center justify-center overflow-hidden">
                        <Image
                            source={{ uri: avatarUrl }}
                            className="w-[130%] h-[130%]"
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Create")}
            >
                <View className="p-4 bg-secondary rounded-md mb-6">
                    <Text className="text-slate-400 text-lg">Create post...</Text>
                </View>
            </TouchableOpacity>
            <ScrollView className="flex-1">
                {
                    posts && posts.map((post) => {
                        return (
                            <View key={post.id} className="mb-6">
                                <View className="flex-row gap-4 items-center justify-center">
                                    <View className="border border-accent bg-accent rounded-full w-12 h-12 items-center justify-center overflow-hidden">
                                        <Image
                                            source={{ uri: post.avatar }}
                                            className="w-[130%] h-[130%]"
                                        />
                                    </View>
                                    <View className="flex-1 bg-secondary p-4 rounded-2xl">
                                        <Text className="text-text text-xl mb-4">{post.title}</Text>
                                        <Text className="text-text">{post.body}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default Homepage;