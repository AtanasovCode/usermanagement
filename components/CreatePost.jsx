import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../useStore";

const CreatePost = ({ navigation }) => {

    const title = useStore((state) => state.title);
    const saveTitle = useStore((state) => state.saveTitle);
    const body = useStore((state) => state.body);
    const saveBody = useStore((state) => state.saveBody);

    return (
        <SafeAreaView className="flex-1 bg-background py-12 justify-between">
            <View>
                <View className="mb-12">
                    <Text className="font-bold text-2xl text-center text-text">
                        Create New Post
                    </Text>
                </View>
                <View className="mx-8">
                    <TextInput
                        className="py-4 px-6 bg-secondary rounded-xl mb-4"
                        placeholder="Title"
                        placeholderTextColor={"#aaa"}
                        value={title}
                        onChangeText={(text) => saveTitle(text)}
                    />
                    <TextInput
                        className="py-4 px-6 bg-secondary rounded-xl text-text"
                        placeholder="Body (optional)"
                        placeholderTextColor={"#aaa"}
                        multiline={true}
                        numberOfLines={8}
                        style={{ textAlignVertical: "top" }}
                        value={body}
                        onChangeText={(text) => saveBody(text)}
                    />
                </View>
            </View>
            <View className="mx-8 mt-16">
                <TouchableOpacity className="bg-accent p-4 rounded-xl">
                    <Text className="text-text text-lg text-center">Create Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default CreatePost;