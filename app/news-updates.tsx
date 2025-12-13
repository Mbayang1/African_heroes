import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  Calendar,
  ChevronRight,
  History,
  Star,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data
const newHeroes = [
  {
    id: 1,
    name: "Dr. Wangari Maathai",
    category: "Environmental Activist",
    date: "Added today",
    image: "https://images.unsplash.com/photo-1640350168509-756f1ef84b37?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
  {
    id: 2,
    name: "Thomas Sankara",
    category: "Revolutionary Leader",
    date: "Added yesterday",
    image: "https://images.unsplash.com/photo-1540414796556-d2b7d9be5022?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
];

const historicalEvents = [
  {
    id: 1,
    title: "Independence Day",
    country: "Ghana",
    date: "March 6, 1957",
    description: "Anniversary of Ghana's independence from British colonial rule.",
    daysUntil: 15,
  },
  {
    id: 2,
    title: "African Liberation Day",
    country: "Pan-African",
    date: "May 25, 1963",
    description: "Commemoration of the founding of the Organization of African Unity.",
    daysUntil: 45,
  },
];

const culturalNews = [
  {
    id: 1,
    title: "Great Zimbabwe Monument Restoration Project Begins",
    category: "Heritage",
    date: "2 hours ago",
    image: "https://images.unsplash.com/photo-1540414796556-d2b7d9be5022?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
  {
    id: 2,
    title: "Ancient Egyptian Artifacts Exhibition Opens in Nairobi",
    category: "Arts & Culture",
    date: "1 day ago",
    image: "https://images.unsplash.com/photo-1640350168509-756f1ef84b37?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
];

export default function NewsUpdates() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View className="bg-blue-600 rounded-b-3xl px-6 pt-12 pb-8">
        <Text className="text-white text-2xl font-bold mb-2">
          News & Updates
        </Text>
        <Text className="text-blue-100 text-base">
          Stay updated with the latest African history and culture
        </Text>
      </View>

      {/* New Heroes Section */}
      <View className="px-6 mt-6">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Star size={24} color="#2196F3" />
            <Text className="text-lg font-bold ml-2 text-gray-800">
              New Heroes Added
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/heroes-directory')}
            className="flex-row items-center"
          >
            <Text className="text-blue-600 mr-1">View all</Text>
            <ChevronRight size={16} color="#2196F3" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="max-h-[200]"
        >
          {newHeroes.map((hero) => (
            <TouchableOpacity
              key={hero.id}
              className="bg-white rounded-2xl mr-4 shadow-sm overflow-hidden"
              style={{ width: SCREEN_WIDTH * 0.7 }}
              onPress={() => router.push('/hero-profile')}
            >
              <Image
                source={{ uri: hero.image }}
                style={{ width: SCREEN_WIDTH * 0.7, height: 120 }}
                className="rounded-t-2xl"
              />
              <View className="p-4">
                <Text className="text-lg font-bold text-gray-800">{hero.name}</Text>
                <Text className="text-blue-600">{hero.category}</Text>
                <Text className="text-gray-500 text-sm mt-1">{hero.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Historical Events Section */}
      <View className="px-6 mt-8">
        <View className="flex-row items-center mb-4">
          <History size={24} color="#4CAF50" />
          <Text className="text-lg font-bold ml-2 text-gray-800">
            Upcoming Historical Events
          </Text>
        </View>

        {historicalEvents.map((event) => (
          <View
            key={event.id}
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{event.title}</Text>
                <Text className="text-gray-600">{event.country}</Text>
                <Text className="text-gray-500 mt-1">{event.date}</Text>
                <Text className="text-gray-600 mt-2">{event.description}</Text>
              </View>
              <View className="bg-green-100 rounded-lg p-2 items-center">
                <Calendar size={20} color="#4CAF50" />
                <Text className="text-green-600 text-sm mt-1">
                  {event.daysUntil} days
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Cultural News Section */}
      <View className="px-6 mt-8 mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Bell size={24} color="#FFC107" />
            <Text className="text-lg font-bold ml-2 text-gray-800">
              Cultural News
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-blue-600 mr-1">See all</Text>
            <ChevronRight size={16} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {culturalNews.map((news) => (
          <TouchableOpacity
            key={news.id}
            className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden"
          >
            <Image
              source={{ uri: news.image }}
              style={{ width: '100%', height: 160 }}
              className="rounded-t-2xl"
            />
            <View className="p-4">
              <View className="flex-row items-center mb-2">
                <Text className="text-yellow-600 text-sm font-medium">
                  {news.category}
                </Text>
                <Text className="text-gray-400 text-sm ml-4">{news.date}</Text>
              </View>
              <Text className="text-lg font-bold text-gray-800">{news.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}