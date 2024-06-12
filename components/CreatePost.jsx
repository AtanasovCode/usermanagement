import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Modal,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { useStore } from "../useStore";
import { Dimensions } from "react-native";
import * as Crypto from 'expo-crypto';

const CreatePost = ({ navigation }) => {

    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;


    const [loading, setLoading] = useState(false);
    const session = useStore((state) => state.session);
    const username = useStore((state) => state.username);
    const title = useStore((state) => state.title);
    const saveTitle = useStore((state) => state.saveTitle);
    const body = useStore((state) => state.body);
    const saveBody = useStore((state) => state.saveBody);
    const availableFlairs = useStore((state) => state.availableFlairs);
    const flair = useStore((state) => state.flair);
    const saveFlair = useStore((state) => state.saveFlair)

    const [showFlairSelection, setShowFlairSelection] = useState(false);

    const savePost = async (title, body) => {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const post = {
                title: title,
                body: body,
                posted_by: username,
                image_url: null,
                user_id: session?.user.id,
                flair: flair.name,
            }

            const { error } = await supabase.from('posts').insert(post);
            console.log(username);

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
        <SafeAreaView className="flex-1 bg-background py-12 px-8 justify-between">
            {
                showFlairSelection &&
                <Modal
                    visible={showFlairSelection}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setShowFlairSelection(false)}
                    className="items-center justify-center flex-1"
                >
                    <View
                        className="flex-1 items-center justify-center"
                        style={{ backgroundColor: "rgba(0, 0, 0, .7)" }}
                    >
                        <View
                            style={{ width: width * 0.8 }}
                            className="bg-secondary p-6 rounded-2xl"
                        >
                            <Text className="text-text text-center font-bold text-lg mb-12">
                                Pick a flair
                            </Text>
                            <ScrollView>
                                {
                                    availableFlairs.map((flair) => {
                                        return (
                                            <TouchableOpacity
                                                key={flair.name}
                                                className="mb-4 px-6 py-4 rounded-2xl"
                                                style={{ backgroundColor: flair.color }}
                                                onPress={() => {
                                                    saveFlair(
                                                        flair.name,
                                                        flair.color,
                                                    );
                                                    setShowFlairSelection(false);
                                                }}
                                            >
                                                <Text className="text-text text-center">{flair.name}</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            }
            <View>
                <View className="mb-12">
                    <Text className="font-bold text-2xl text-center text-text">
                        Create New Post
                    </Text>
                </View>
                <View className="">
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
                {
                    flair.name !== null && flair.color !== null ?
                        <TouchableOpacity
                            className="mt-6 px-6 py-2 self-start rounded-2xl"
                            style={{ backgroundColor: flair.color }}
                            onPress={() => setShowFlairSelection(true)}
                        >
                            <Text className="text-text">{flair.name}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            className="mt-6 px-6 py-2 bg-accent self-start rounded-2xl"
                            onPress={() => setShowFlairSelection(true)}
                        >
                            <Text className="text-text">Add Flaire</Text>
                        </TouchableOpacity>
                }
            </View>
            <View className="mt-16">
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