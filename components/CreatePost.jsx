import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
} from "react-native";

const CreatePost = ({ navigation }) => {
    return (
        <View className="flex-1 bg-background py-16">
            <View className="mb-12">
                <Text className="font-bold text-2xl text-center">
                    Create New Post
                </Text>
            </View>
            <View className="">
            </View>
        </View>
    );
}

export default CreatePost;