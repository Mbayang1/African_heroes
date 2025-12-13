import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, ChevronLeft, Flag, Calendar, Building2 } from 'lucide-react-native';

// Mock data for African countries
const AFRICAN_COUNTRIES = [
  {
    id: '1',
    name: 'Nigeria',
    capital: 'Abuja',
    independenceYear: 1960,
    flag: '🇳🇬',
    heroes: [
      { id: '1', name: 'Funmilayo Ransome-Kuti', title: 'Women\'s Rights Activist' },
      { id: '2', name: 'Herbert Macaulay', title: 'Nationalist Leader' },
    ]
  },
  {
    id: '2',
    name: 'Kenya',
    capital: 'Nairobi',
    independenceYear: 1963,
    flag: '🇰🇪',
    heroes: [
      { id: '3', name: 'Wangari Maathai', title: 'Environmental Activist' },
      { id: '4', name: 'Dedan Kimathi', title: 'Freedom Fighter' },
    ]
  },
  {
    id: '3',
    name: 'Egypt',
    capital: 'Cairo',
    independenceYear: 1952,
    flag: '🇪🇬',
    heroes: [
      { id: '5', name: 'Gamal Abdel Nasser', title: 'Revolutionary Leader' },
      { id: '6', name: 'Um Kulthum', title: 'Cultural Icon' },
    ]
  },
  // Add more countries as needed
];

export default function InteractiveMapScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<typeof AFRICAN_COUNTRIES[0] | null>(null);

  const handleCountryPress = (country: typeof AFRICAN_COUNTRIES[0]) => {
    setSelectedCountry(country);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#2196F3] pt-12 pb-6 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center px-6">
          <TouchableOpacity
            onPress={() => router.push('/')}
            className="p-2 rounded-full bg-white/20"
            accessibilityLabel="Go back"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">
            African Heroes Map
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Map Region */}
        <View className="p-6">
          <View className="bg-gray-50 rounded-2xl p-4 shadow-sm">
            <Text className="text-gray-600 text-center mb-4">
              Tap on a country to explore its heroes and facts
            </Text>
            
            {/* Countries List (Temporary representation of map) */}
            <View className="flex-row flex-wrap gap-2">
              {AFRICAN_COUNTRIES.map((country) => (
                <TouchableOpacity
                  key={country.id}
                  onPress={() => handleCountryPress(country)}
                  className={`p-3 rounded-xl flex-row items-center ${
                    selectedCountry?.id === country.id
                      ? 'bg-[#2196F3]'
                      : 'bg-white border border-gray-200'
                  }`}
                  accessibilityLabel={`Select ${country.name}`}
                >
                  <MapPin
                    size={16}
                    color={selectedCountry?.id === country.id ? 'white' : '#666666'}
                  />
                  <Text
                    className={`ml-2 ${
                      selectedCountry?.id === country.id
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {country.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Country Details */}
        {selectedCountry && (
          <View className="px-6 pb-6">
            <View className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {/* Country Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl font-bold text-gray-800">
                  {selectedCountry.name}
                </Text>
                <Text className="text-4xl">{selectedCountry.flag}</Text>
              </View>

              {/* Country Facts */}
              <View className="mb-6 space-y-3">
                <View className="flex-row items-center">
                  <Building2 size={20} color="#666666" />
                  <Text className="ml-2 text-gray-600">
                    Capital: {selectedCountry.capital}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Calendar size={20} color="#666666" />
                  <Text className="ml-2 text-gray-600">
                    Independence: {selectedCountry.independenceYear}
                  </Text>
                </View>
              </View>

              {/* Heroes Section */}
              <Text className="text-lg font-bold text-gray-800 mb-4">
                Notable Heroes
              </Text>
              <View className="space-y-3">
                {selectedCountry.heroes.map((hero) => (
                  <TouchableOpacity
                    key={hero.id}
                    onPress={() => router.push('/hero-profile')}
                    className="bg-gray-50 p-4 rounded-xl"
                    accessibilityLabel={`View ${hero.name}'s profile`}
                  >
                    <Text className="font-bold text-gray-800">{hero.name}</Text>
                    <Text className="text-gray-600">{hero.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}