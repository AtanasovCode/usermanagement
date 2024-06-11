import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../useStore";
import { TouchableOpacity } from "react-native";

const Homepage = ({ navigation }) => {

    const avatarUrl = useStore((state) => state.avatarUrl);
    const username = useStore((state) => state.username);

    return (
        <SafeAreaView className="flex-1 bg-background py-8">
            <View className="mb-12 items-center justify-center flex-row">
                <Text className="font-bold text-2xl text-center text-text">Home</Text>
                <TouchableOpacity
                    className="absolute right-4"
                    onPress={() => navigation.navigate("Account")}
                >
                    <View className="border border-accent bg-accent rounded-full w-12 h-12 items-center justify-center overflow-hidden">
                        <Image
                            source={{ uri: avatarUrl ? `https://robohash.org/${avatarUrl}` : `https://robohash.org/${username}` }}
                            className="w-[130%] h-[130%]"
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView className="flex-1 px-6">
                <TouchableOpacity
                    onPress={() => navigation.navigate("Create")}
                >
                    <View className="p-4 bg-secondary rounded-md mb-6">
                        <Text className="text-slate-400 text-lg">Create post...</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Homepage;