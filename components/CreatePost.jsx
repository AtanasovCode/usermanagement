import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { useStore } from "../useStore";
import * as Crypto from 'expo-crypto';

const CreatePost = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const session = useStore((state) => state.session);
    const title = useStore((state) => state.title);
    const saveTitle = useStore((state) => state.saveTitle);
    const body = useStore((state) => state.body);
    const saveBody = useStore((state) => state.saveBody);

    const savePost = async (title, body) => {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const post = {
                title: title,
                body: body,
                posted_by: session?.user.username,
                image_url: "nothing",
                user_id: session?.user.id,
            }

            const { error } = await supabase.from('posts').insert(post);

            if (error) {
                throw error;
            }

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
            navigation.navigate("Home");
        }
    }

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
                        className="py-4 px-6 bg-secondary rounded-xl mb-4 text-text"
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
                <TouchableOpacity
                    className="bg-accent p-4 rounded-xl"
                    onPress={() => {
                        title !== null && body !== null ?
                            savePost(title, body)
                            :
                            Alert.alert("Fields are empty")
                    }}
                >
                    <Text className="text-text text-lg text-center">Create Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default CreatePost;