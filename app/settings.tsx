import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Sun,
  Moon,
  Bell,
  Languages,
  ChevronRight,
  Info
} from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' },
    { code: 'sw', name: 'Swahili' }
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#2196F3] rounded-b-3xl">
        <View className="px-6 py-12">
          <Text className="text-2xl font-bold text-white">Settings</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Theme Section */}
        <View className="mt-6 bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              {isDarkMode ? (
                <Moon size={24} color="#2196F3" />
              ) : (
                <Sun size={24} color="#2196F3" />
              )}
              <Text className="text-base font-semibold text-gray-800">
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#2196F3' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View className="mt-4 bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <Bell size={24} color="#2196F3" />
              <Text className="text-base font-semibold text-gray-800">
                Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#2196F3' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Language Section */}
        <View className="mt-4 bg-gray-50 rounded-2xl p-4">
          <TouchableOpacity 
            className="flex-row items-center justify-between"
            onPress={() => {
              // Mock language selection modal/screen
              console.log('Open language selection');
            }}
          >
            <View className="flex-row items-center space-x-3">
              <Languages size={24} color="#2196F3" />
              <View>
                <Text className="text-base font-semibold text-gray-800">
                  Language
                </Text>
                <Text className="text-sm text-gray-500">
                  {selectedLanguage}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="mt-4 mb-6 bg-gray-50 rounded-2xl p-4">
          <TouchableOpacity 
            className="flex-row items-center justify-between"
            onPress={() => router.push('/about')}
          >
            <View className="flex-row items-center space-x-3">
              <Info size={24} color="#2196F3" />
              <Text className="text-base font-semibold text-gray-800">
                About African Heroes
              </Text>
            </View>
            <ChevronRight size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="mb-8 items-center">
          <Text className="text-sm text-gray-500">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}