import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, BookOpen, MapPin, Calendar, TrendingUp, Lightbulb } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

// Setup LinearGradient for NativeWind compatibility
cssInterop(LinearGradient, {
  className: 'style',
});

// const { width } = Dimensions.get('window');

// Mock data for African kingdoms
const kingdomsData = [
  {
    id: '1',
    name: 'Kingdom of Kush',
    period: '1070 BCE - 350 CE',
    location: 'Northern Sudan',
    description: 'An ancient kingdom located in Nubia, along the Nile River. Known for their advanced ironworking and as rivals to Egypt.',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.8TqJB-G3W3muNmHrVGXIGgHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '2',
    name: 'Ancient Egypt',
    period: '3100 BCE - 30 BCE',
    location: 'Northeastern Africa',
    description: 'One of the world\'s earliest civilizations, known for pyramids, hieroglyphics, and pharaohs.',
    imageUrl: 'https://th.bing.com/th/id/R.e13de4d3c70af74eff9f1026617992b4?rik=e%2f8hyjobQVemyQ&pid=ImgRaw&r=0',
  },
  {
    id: '3',
    name: 'Kingdom of Aksum',
    period: '100 - 940 CE',
    location: 'Northern Ethiopia/Eritrea',
    description: 'A major trading empire that controlled the Red Sea trade routes between Rome and Ancient India.',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.W9DhnulNTzvUOT0nVReYLgHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '4',
    name: 'Ghana Empire',
    period: '300 - 1200 CE',
    location: 'Southeast Mauritania/West Mali',
    description: 'Known as the "Land of Gold", it was the first great medieval trading empire of West Africa.',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.R7SI29DJuqW18j-O8Qm09wHaFi?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
];

// Mock data for historical events
const historicalEvents = [
  {
    id: '1',
    title: 'Foundation of Carthage',
    year: '814 BCE',
    description: 'Phoenician queen Dido founded the city of Carthage, which became a major Mediterranean power.',
  },
  {
    id: '2',
    title: 'Mongol Invasion of Baghdad',
    year: '1258 CE',
    description: 'The Mongols destroyed Baghdad, ending the Islamic Golden Age in the region.',
  },
  {
    id: '3',
    title: 'Berlin Conference',
    year: '1884-1885',
    description: 'European powers divided Africa among themselves without African representation.',
  },
  {
    id: '4',
    title: 'Independence of Ghana',
    year: '1957',
    description: 'Ghana became the first sub-Saharan African country to gain independence from colonial rule.',
  },
];

// Mock data for learn topics
const learnTopics = [
  { id: '1', title: 'Trade Routes', icon: '🛣️', description: 'Trans-Saharan and Indian Ocean trade networks' },
  { id: '2', title: 'Empires', icon: '👑', description: 'Major African kingdoms and empires' },
  { id: '3', title: 'Inventions', icon: '💡', description: 'African innovations and contributions' },
  { id: '4', title: 'Artifacts', icon: '🏺', description: 'Important historical objects' },
];

export default function LearnSectionScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('kingdoms');

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#4CAF50']}
        className="rounded-b-3xl pb-6"
      >
        <View className="pt-12 px-4">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/20 rounded-full p-2 mr-3"
            >
              <ChevronLeft size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Learn About Africa</Text>
          </View>
          <Text className="text-white/90 mt-2">Discover ancient kingdoms and historical events</Text>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View className="flex-row bg-white mx-4 rounded-xl p-1 shadow-sm -mt-6 z-10">
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'kingdoms' ? 'bg-blue-500' : ''
            }`}
          onPress={() => setActiveTab('kingdoms')}
        >
          <Text className={`${activeTab === 'kingdoms' ? 'text-white font-semibold' : 'text-gray-600'}`}>
            Kingdoms
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'events' ? 'bg-blue-500' : ''
            }`}
          onPress={() => setActiveTab('events')}
        >
          <Text className={`${activeTab === 'events' ? 'text-white font-semibold' : 'text-gray-600'}`}>
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'topics' ? 'bg-blue-500' : ''
            }`}
          onPress={() => setActiveTab('topics')}
        >
          <Text className={`${activeTab === 'topics' ? 'text-white font-semibold' : 'text-gray-600'}`}>
            Topics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'kingdoms' && (
          <>
            <Text className="text-gray-800 text-xl font-bold mb-4">Ancient African Kingdoms</Text>

            {kingdomsData.map((kingdom) => (
              <TouchableOpacity
                key={kingdom.id}
                className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
              >
                <Image
                  source={{ uri: kingdom.imageUrl }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <Text className="text-gray-800 text-lg font-bold">{kingdom.name}</Text>
                  <View className="flex-row items-center mt-1">
                    <Calendar size={14} color="#2196F3" />
                    <Text className="text-gray-600 text-sm ml-1">{kingdom.period}</Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={14} color="#4CAF50" />
                    <Text className="text-gray-600 text-sm ml-1">{kingdom.location}</Text>
                  </View>
                  <Text className="text-gray-700 mt-2" numberOfLines={2}>
                    {kingdom.description}
                  </Text>
                  <TouchableOpacity className="mt-3 py-2 items-center bg-blue-50 rounded-lg">
                    <Text className="text-blue-500 font-medium">Learn More</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {activeTab === 'events' && (
          <>
            <Text className="text-gray-800 text-xl font-bold mb-4">Major Historical Events</Text>

            {historicalEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
              >
                <View className="flex-row">
                  <View className="bg-blue-100 rounded-lg p-3 mr-3">
                    <Calendar size={24} color="#2196F3" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 font-bold">{event.title}</Text>
                    <Text className="text-blue-500 font-semibold mt-1">{event.year}</Text>
                    <Text className="text-gray-600 mt-2" numberOfLines={2}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {activeTab === 'topics' && (
          <>
            <Text className="text-gray-800 text-xl font-bold mb-4">Learning Topics</Text>

            <View className="flex-row flex-wrap gap-4 mb-6">
              {learnTopics.map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  className="bg-white rounded-2xl p-5 items-center flex-1 min-w-[40%] shadow-sm"
                >
                  <Text className="text-3xl mb-2">{topic.icon}</Text>
                  <Text className="text-gray-800 font-bold text-center">{topic.title}</Text>
                  <Text className="text-gray-600 text-sm mt-1 text-center">{topic.description}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <View className="flex-row items-center mb-3">
                <TrendingUp size={20} color="#4CAF50" />
                <Text className="text-gray-800 text-lg font-bold ml-2">Trade Routes</Text>
              </View>
              <Text className="text-gray-700 mb-3">
                African trade networks connected civilizations across continents for centuries:
              </Text>
              <View className="bg-blue-50 rounded-lg p-4 mb-3">
                <Text className="text-gray-800 font-semibold mb-1">• Trans-Saharan Trade</Text>
                <Text className="text-gray-600 text-sm">
                  Connected North and West Africa through camel caravans carrying gold, salt, and slaves.
                </Text>
              </View>
              <View className="bg-green-50 rounded-lg p-4">
                <Text className="text-gray-800 font-semibold mb-1">• Indian Ocean Trade</Text>
                <Text className="text-gray-600 text-sm">
                  Linked East Africa with Arabia, India, and Asia through maritime routes.
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl p-5 shadow-sm">
              <View className="flex-row items-center mb-3">
                <Lightbulb size={20} color="#FFC107" />
                <Text className="text-gray-800 text-lg font-bold ml-2">African Inventions</Text>
              </View>
              <Text className="text-gray-700">
                Africans developed numerous innovations that influenced the world, including:
              </Text>
              <View className="mt-3">
                <Text className="text-gray-800 font-semibold">• Mathematics:</Text>
                <Text className="text-gray-600 text-sm ml-2 mb-2">Advanced mathematical concepts including geometry and algebra</Text>

                <Text className="text-gray-800 font-semibold">• Metallurgy:</Text>
                <Text className="text-gray-600 text-sm ml-2 mb-2">Iron smelting techniques that spread across continents</Text>

                <Text className="text-gray-800 font-semibold">• Architecture:</Text>
                <Text className="text-gray-600 text-sm ml-2">Monumental structures like the Pyramids of Giza</Text>
              </View>
            </View>
          </>
        )}

        {/* Educational Resource */}
        <View className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-5 mt-4 mb-6">
          <View className="flex-row items-center mb-3">
            <BookOpen size={24} color="white" />
            <Text className="text-white text-lg font-bold ml-2">Did You Know?</Text>
          </View>
          <Text className="text-white/90">
            The Great Zimbabwe ruins were built by Africans without mortar and stand as a testament to
            sophisticated stone construction techniques developed in Southern Africa.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}