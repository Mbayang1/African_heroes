import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Heart, MapPin, Calendar, Trophy, BookOpen, Users, Star } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Configure LinearGradient for NativeWind
cssInterop(LinearGradient, {
  className: 'style',
});

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample hero data
  const featuredHero = {
    id: 1,
    name: "Nelson Mandela",
    title: "Anti-Apartheid Revolutionary",
    country: "South Africa",
    image: "https://images.unsplash.com/photo-1540414796556-d2b7d9be5022?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGlzdG9yaWNhbCUyMGxhbmRtYXJrJTIwc2lnaHRzZWVpbmd8ZW58MHx8MHx8fDA%3D",
    description: "Nelson Rolihlahla Mandela was a South African anti-apartheid revolutionary, political leader, and philanthropist who served as President of South Africa from 1994 to 1999."
  };

  const categories = [
    { id: 1, name: "Leaders", icon: "👑", count: 42 },
    { id: 2, name: "Inventors", icon: "💡", count: 28 },
    { id: 3, name: "Kings/Queens", icon: "👑", count: 35 },
    { id: 4, name: "Activists", icon: "✊", count: 56 },
    { id: 5, name: "Athletes", icon: "🏅", count: 47 },
    { id: 6, name: "Scientists", icon: "🔬", count: 31 }
  ];

  const upcomingEvents = [
    { id: 1, title: "Nelson Mandela Day", date: "Jul 18", description: "Annual celebration of Mandela's legacy" },
    { id: 2, title: "African Heritage Month", date: "Sep 1-30", description: "Celebrating African history and culture" },
    { id: 3, title: "Kwame Nkrumah Anniversary", date: "Sep 21", description: "Commemorating Ghana's independence leader" }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with gradient */}
      <LinearGradient
        colors={['#2196F3', '#4CAF50']}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">African Heroes</Text>
            <Text className="text-white/90 text-sm">Discover inspiring stories</Text>
          </View>
          <TouchableOpacity className="bg-white/20 p-3 rounded-full">
            <Heart color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white/20 rounded-2xl px-4 py-3 mb-6">
          <Search color="white" size={20} />
          <TextInput
            className="flex-1 text-white ml-3 font-medium"
            placeholder="Search heroes, events..."
            placeholderTextColor="#ffffffaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">150+</Text>
            <Text className="text-white/90 text-sm">Heroes</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">54</Text>
            <Text className="text-white/90 text-sm">Countries</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">1000+</Text>
            <Text className="text-white/90 text-sm">Stories</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Hero of the Day */}
        <View className="mb-8">
          <Text className="text-gray-800 text-xl font-bold mb-4">Hero of the Day</Text>
          <TouchableOpacity
            onPress={() => router.push('/hero-profile')}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <Image
              source={{ uri: featuredHero.image }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-5">
              <Text className="text-gray-800 text-xl font-bold">{featuredHero.name}</Text>
              <Text className="text-gray-600 text-sm mb-2">{featuredHero.title}</Text>
              <View className="flex-row items-center mb-3">
                <MapPin color="#2196F3" size={16} />
                <Text className="text-gray-700 ml-1">{featuredHero.country}</Text>
              </View>
              <Text className="text-gray-600 text-sm mb-4" numberOfLines={3}>{featuredHero.description}</Text>
              <TouchableOpacity
                onPress={() => router.push('/hero-profile')}
                className="bg-blue-500 py-3 rounded-xl items-center"
              >
                <Text className="text-white font-semibold">Read Full Story</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Categories */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-800 text-xl font-bold">Explore Categories</Text>
            <TouchableOpacity onPress={() => router.push('/heroes-directory')}>
              <Text className="text-blue-500 font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-4">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => router.push('/heroes-directory')}
                className="bg-white rounded-2xl p-5 items-center justify-center flex-1 min-w-[30%] shadow-sm"
              >
                <Text className="text-2xl mb-2">{category.icon}</Text>
                <Text className="text-gray-800 font-semibold mb-1">{category.name}</Text>
                <Text className="text-gray-500 text-sm">{category.count} heroes</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-800 text-xl font-bold">Upcoming Events</Text>
            <TouchableOpacity onPress={() => router.push('/news-updates')}>
              <Text className="text-blue-500 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {upcomingEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                onPress={() => router.push('/news-updates')}
                className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm"
              >
                <View className="bg-blue-100 rounded-xl p-3 mr-4">
                  <Calendar color="#2196F3" size={24} />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">{event.title}</Text>
                  <Text className="text-gray-600 text-sm">{event.date}</Text>
                  <Text className="text-gray-500 text-xs mt-1">{event.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-gray-800 text-xl font-bold mb-4">Quick Actions</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => router.push('/quizzes')}
              className="bg-white rounded-2xl p-5 items-center flex-1 shadow-sm"
            >
              <Trophy color="#FFC107" size={32} />
              <Text className="text-gray-800 font-semibold mt-2">Quizzes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/learn-section')}
              className="bg-white rounded-2xl p-5 items-center flex-1 shadow-sm"
            >
              <BookOpen color="#4CAF50" size={32} />
              <Text className="text-gray-800 font-semibold mt-2">Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/interactive-map')}
              className="bg-white rounded-2xl p-5 items-center flex-1 shadow-sm"
            >
              <Users color="#2196F3" size={32} />
              <Text className="text-gray-800 font-semibold mt-2">Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/heroes-directory')}
              className="bg-white rounded-2xl p-5 items-center flex-1 shadow-sm"
            >
              <Star color="#FF9800" size={32} />
              <Text className="text-gray-800 font-semibold mt-2">Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}