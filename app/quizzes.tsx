import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Bookmark, Trophy, Book, Clock, ArrowLeft } from 'lucide-react-native';

// Mock data for favorites
const mockFavorites = {
  heroes: [
    { id: 1, name: 'Queen Amina', region: 'West Africa', era: '16th Century', image: 'https://example.com/amina.jpg' },
    { id: 2, name: 'Mansa Musa', region: 'West Africa', era: '14th Century', image: 'https://example.com/mansa.jpg' },
    { id: 3, name: 'Shaka Zulu', region: 'Southern Africa', era: '19th Century', image: 'https://example.com/shaka.jpg' },
  ],
  articles: [
    { id: 1, title: 'The Great Mali Empire', readTime: '5 min', date: '2024-01-15' },
    { id: 2, title: 'Ancient Egyptian Innovations', readTime: '8 min', date: '2024-01-10' },
    { id: 3, title: 'The Kingdom of Aksum', readTime: '6 min', date: '2024-01-05' },
  ],
  quizzes: [
    { id: 1, title: 'African Leaders Quiz', score: '8/10', date: '2024-01-14' },
    { id: 2, title: 'Ancient Kingdoms', score: '7/10', date: '2024-01-09' },
    { id: 3, title: 'Cultural Heritage', score: '9/10', date: '2024-01-04' },
  ],
  timelines: [
    { id: 1, title: 'West African Empires', period: '700-1600 CE', events: 12 },
    { id: 2, title: 'African Independence', period: '1950-1980', events: 15 },
    { id: 3, title: 'Great Migrations', period: '1000-1500 CE', events: 8 },
  ],
};

type TabType = 'heroes' | 'articles' | 'quizzes' | 'timelines';

interface TabItem {
  id: TabType;
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
}

export default function FavoritesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('heroes');

  const tabs: TabItem[] = [
    { id: 'heroes', icon: Bookmark, label: 'Heroes' },
    { id: 'articles', icon: Book, label: 'Articles' },
    { id: 'quizzes', icon: Trophy, label: 'Quizzes' },
    { id: 'timelines', icon: Clock, label: 'Timelines' },
  ];

  const renderHeroes = () => (
    <View className="flex-1">
      {mockFavorites.heroes.map((hero) => (
        <TouchableOpacity
          key={hero.id}
          className="flex-row items-center p-4 bg-white rounded-xl mb-3 shadow-sm"
          onPress={() => router.push('/hero-profile')}
        >
          <View className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
            <Image
              source={{ uri: hero.image }}
              className="w-full h-full"
            />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-gray-900">{hero.name}</Text>
            <Text className="text-sm text-gray-600">{hero.region}</Text>
            <Text className="text-sm text-gray-500">{hero.era}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderArticles = () => (
    <View className="flex-1">
      {mockFavorites.articles.map((article) => (
        <TouchableOpacity
          key={article.id}
          className="p-4 bg-white rounded-xl mb-3 shadow-sm"
        >
          <Text className="text-lg font-bold text-gray-900">{article.title}</Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-sm text-gray-500">Read time: {article.readTime}</Text>
            <Text className="text-sm text-gray-500">Saved on {article.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderQuizzes = () => (
    <View className="flex-1">
      {mockFavorites.quizzes.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          className="p-4 bg-white rounded-xl mb-3 shadow-sm"
        >
          <Text className="text-lg font-bold text-gray-900">{quiz.title}</Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-sm text-blue-600">Score: {quiz.score}</Text>
            <Text className="text-sm text-gray-500">Taken on {quiz.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTimelines = () => (
    <View className="flex-1">
      {mockFavorites.timelines.map((timeline) => (
        <TouchableOpacity
          key={timeline.id}
          className="p-4 bg-white rounded-xl mb-3 shadow-sm"
        >
          <Text className="text-lg font-bold text-gray-900">{timeline.title}</Text>
          <Text className="text-sm text-gray-600 mt-1">{timeline.period}</Text>
          <Text className="text-sm text-gray-500 mt-1">{timeline.events} key events</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'heroes':
        return renderHeroes();
      case 'articles':
        return renderArticles();
      case 'quizzes':
        return renderQuizzes();
      case 'timelines':
        return renderTimelines();
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-4 rounded-b-3xl shadow-md">
        <View className="flex-row items-center px-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white ml-2">My Favorites</Text>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4 max-h-16"
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
              activeTab === tab.id ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <tab.icon
              size={18}
              color={activeTab === tab.id ? 'white' : '#666666'}
            />
            <Text
              className={`ml-2 font-medium ${
                activeTab === tab.id ? 'text-white' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView className="flex-1 px-4">
        {renderContent()}
      </ScrollView>
    </View>
  );
}