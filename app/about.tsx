import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Github, Mail, Globe, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
    const router = useRouter();

    const handleLink = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View className="flex-1 bg-gray-50">
            <LinearGradient
                colors={['#2196F3', '#4CAF50']}
                className="pt-12 pb-6 px-4 rounded-b-3xl"
            >
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 bg-white/20 rounded-full mr-3"
                    >
                        <ChevronLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold">About</Text>
                </View>
            </LinearGradient>

            <ScrollView className="flex-1 p-4">
                <View className="bg-white rounded-2xl p-6 shadow-sm mb-6 items-center">
                    <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
                        <Text className="text-4xl">🌍</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
                        African Heroes
                    </Text>
                    <Text className="text-gray-500 text-center mb-6">
                        Version 1.0.0
                    </Text>
                    <Text className="text-gray-600 text-center leading-6">
                        Dedicated to preserving and celebrating the rich history of African leaders,
                        innovators, and changemakers who have shaped our world.
                    </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
                    <Text className="text-lg font-bold text-gray-800 mb-4">Contact & Support</Text>

                    <TouchableOpacity
                        onPress={() => handleLink('https://github.com')}
                        className="flex-row items-center p-3 border-b border-gray-100"
                    >
                        <Github size={20} color="#333" />
                        <Text className="ml-3 text-gray-700 flex-1">View Source Code</Text>
                        <ChevronLeft size={20} color="#ccc" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleLink('mailto:support@africanheroes.com')}
                        className="flex-row items-center p-3 border-b border-gray-100"
                    >
                        <Mail size={20} color="#2196F3" />
                        <Text className="ml-3 text-gray-700 flex-1">Contact Support</Text>
                        <ChevronLeft size={20} color="#ccc" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleLink('https://africanheroes.com')}
                        className="flex-row items-center p-3"
                    >
                        <Globe size={20} color="#4CAF50" />
                        <Text className="ml-3 text-gray-700 flex-1">Visit Website</Text>
                        <ChevronLeft size={20} color="#ccc" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                </View>

                <View className="items-center py-4">
                    <Text className="text-gray-400 text-sm">Made with ❤️ for Africa</Text>
                    <Text className="text-gray-400 text-xs mt-1">© 2024 African Heroes App</Text>
                </View>
            </ScrollView>
        </View>
    );
}
