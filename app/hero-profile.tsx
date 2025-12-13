import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { ChevronLeft, Calendar, MapPin, Award, Quote, Globe, Heart, Share, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

// Setup LinearGradient for NativeWind compatibility
cssInterop(LinearGradient, {
  className: 'style',
});

// const { width } = Dimensions.get('window');

// Mock data for the hero profile
const heroData = {
  id: '1',
  name: 'Nelson Mandela',
  title: 'Anti-Apartheid Revolutionary',
  country: 'South Africa',
  birthDate: 'July 18, 1918',
  deathDate: 'December 5, 2013',
  era: '20th Century',
  category: 'Activist',
  description: 'Nelson Rolihlahla Mandela was a South African anti-apartheid revolutionary, political leader, and philanthropist who served as President of South Africa from 1994 to 1999.',
  biography: 'Mandela was born into the Madiba clan in the village of Mvezo, in the Eastern Cape. After attending Fort Hare University and the University of Witwatersrand studying law, he became increasingly involved in anti-apartheid activism. He joined the African National Congress (ANC) in 1942 and co-founded its militant youth league in 1944. After the ANC was banned in 1960, he urged peaceful resistance but co-founded the armed Umkhonto we Sizwe in 1961 and led a sabotage campaign against government targets.\n\nHe was arrested in 1962 and sentenced to life imprisonment in 1964 after the Rivonia Trial. Mandela spent 27 years in prison, mostly on Robben Island. International pressure for his release mounted throughout the 1980s. He was finally released in 1990, leading to the end of apartheid through negotiations. In 1994, Mandela became South Africa\'s first Black head of state and the first to be elected in a fully representative democratic election.',
  achievements: [
    { year: '1944', title: 'Co-founded the ANC Youth League' },
    { year: '1952', title: 'Defiance Campaign against apartheid laws' },
    { year: '1962', title: 'Arrested and sentenced to five years in prison' },
    { year: '1964', title: 'Sentenced to life imprisonment in the Rivonia Trial' },
    { year: '1990', title: 'Released from prison after 27 years' },
    { year: '1993', title: 'Awarded Nobel Peace Prize' },
    { year: '1994', title: 'Elected as South Africa\'s first Black president' },
    { year: '1999', title: 'Stepped down after serving one term' },
  ],
  quotes: [
    "There is no passion to be found playing small - in settling for a life that is less than the one you are capable of living.",
    "Education is the most powerful weapon which you can use to change the world.",
    "It always seems impossible until it's done."
  ],
  impact: "Mandela's impact on Africa and the world extends far beyond his presidency. His peaceful transition from prisoner to president prevented a civil war in South Africa and inspired countless movements for justice worldwide. His philosophy of reconciliation became a model for conflict resolution globally. Post-apartheid South Africa became a symbol of hope and progress, influencing democratic movements throughout Africa and beyond.\n\nHis legacy continues to inspire leaders around the world. The Nelson Mandela Foundation works to promote his values of freedom, democracy, and human rights. His birthday, July 18th, is celebrated as Mandela Day, encouraging people worldwide to take action for positive change.",
  images: [
    'https://tse2.mm.bing.net/th/id/OIP._jHrZ_Loev8LRdMNzzp4CwHaIV?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse2.mm.bing.net/th/id/OIP.0sbkzyADayHjNnzqDf38PQHaF3?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://tse4.mm.bing.net/th/id/OIP.BJFPlSvwRob5PF-yZa0WuQHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    'https://metro.co.uk/wp-content/uploads/2018/07/sei_22065867.jpg?quality=90&strip=all&zoom=1&resize=768%2C921'
  ]
};

export default function HeroProfileScreen() {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const renderImageItem = ({ item }: { item: string }) => (
    <View className="mr-3">
      <Image
        source={{ uri: item }}
        className="w-40 h-40 rounded-xl"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with back button */}
      <View className="absolute top-0 left-0 right-0 z-10 pt-12 px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white rounded-full p-2 shadow-md w-10 h-10 items-center justify-center"
        >
          <ChevronLeft size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View className="relative">
          <LinearGradient
            colors={['#2196F3', '#4CAF50']}
            className="h-64 rounded-b-3xl items-center justify-center"
          >
            <Image
              source={{ uri: heroData.images[0] }}
              className="w-32 h-32 rounded-full border-4 border-white mt-8"
            />
            <Text className="text-white text-2xl font-bold mt-4">{heroData.name}</Text>
            <Text className="text-blue-100 text-lg">{heroData.title}</Text>
          </LinearGradient>

          {/* Action Buttons */}
          <View className="absolute top-12 right-4 flex-row">
            <TouchableOpacity
              onPress={() => setLiked(!liked)}
              className="bg-white rounded-full p-2 mx-1 shadow-md"
            >
              <Heart size={20} color={liked ? "#FF5252" : "#666"} fill={liked ? "#FF5252" : "none"} />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-full p-2 mx-1 shadow-md">
              <Share size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Overview Section */}
        <View className="bg-white rounded-2xl mx-4 p-5 -mt-8 shadow-sm">
          <Text className="text-gray-800 text-xl font-bold mb-3">Overview</Text>

          <View className="flex-row mb-2">
            <Calendar size={18} color="#2196F3" className="mr-2 mt-1" />
            <View>
              <Text className="text-gray-600">Born: {heroData.birthDate}</Text>
              <Text className="text-gray-600">Died: {heroData.deathDate}</Text>
            </View>
          </View>

          <View className="flex-row mb-2">
            <MapPin size={18} color="#4CAF50" className="mr-2 mt-1" />
            <Text className="text-gray-600">{heroData.country}</Text>
          </View>

          <View className="flex-row">
            <Award size={18} color="#FFC107" className="mr-2 mt-1" />
            <Text className="text-gray-600 capitalize">{heroData.category} • {heroData.era}</Text>
          </View>

          <Text className="text-gray-700 mt-4 leading-relaxed">
            {heroData.description}
          </Text>
        </View>

        {/* Biography Section */}
        <View className="bg-white rounded-2xl mx-4 p-5 my-4 shadow-sm">
          <Text className="text-gray-800 text-xl font-bold mb-3">Biography</Text>
          <Text className="text-gray-700 leading-relaxed">
            {heroData.biography}
          </Text>
        </View>

        {/* Timeline Section */}
        <View className="bg-white rounded-2xl mx-4 p-5 my-4 shadow-sm">
          <Text className="text-gray-800 text-xl font-bold mb-4">Achievements Timeline</Text>

          {heroData.achievements.map((achievement, index) => (
            <View key={index} className="flex-row pb-4 relative">
              {index !== heroData.achievements.length - 1 && (
                <View className="absolute left-[11px] top-6 w-0.5 h-full bg-gray-200" />
              )}
              <View className="bg-blue-500 rounded-full w-6 h-6 items-center justify-center mr-3 z-10">
                <Text className="text-white text-xs font-bold">{achievement.year.substring(2)}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">{achievement.year}</Text>
                <Text className="text-gray-600 mt-1">{achievement.title}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Famous Quotes */}
        <View className="bg-white rounded-2xl mx-4 p-5 my-4 shadow-sm">
          <Text className="text-gray-800 text-xl font-bold mb-4">Famous Quotes</Text>

          {heroData.quotes.map((quote, index) => (
            <View key={index} className="mb-4 last:mb-0">
              <View className="flex-row items-start">
                <Quote size={16} color="#2196F3" className="mt-1 mr-2" />
                <Text className="text-gray-700 italic flex-1">&quot;{quote}&quot;</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Impact Section */}
        <View className="bg-white rounded-2xl mx-4 p-5 my-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Globe size={20} color="#4CAF50" className="mr-2" />
            <Text className="text-gray-800 text-xl font-bold">Impact on Africa & World</Text>
          </View>
          <Text className="text-gray-700 leading-relaxed">
            {heroData.impact}
          </Text>
        </View>

        {/* Image Gallery */}
        <View className="bg-white rounded-2xl mx-4 p-5 my-4 shadow-sm">
          <Text className="text-gray-800 text-xl font-bold mb-4">Image Gallery</Text>

          <FlatList
            data={heroData.images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 12 }}
          />
        </View>

        {/* Video Section */}
        <View className="bg-white rounded-2xl mx-4 p-5 my-4 shadow-sm mb-6">
          <Text className="text-gray-800 text-xl font-bold mb-3">Documentary</Text>
          <TouchableOpacity className="bg-gray-900 rounded-xl h-48 items-center justify-center relative">
            <Play size={48} color="#FFF" fill="#FFF" />
            <Text className="text-white text-lg mt-2">Watch Documentary</Text>
            <View className="absolute inset-0 bg-black bg-opacity-30 rounded-xl" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}