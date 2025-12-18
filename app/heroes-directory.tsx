import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Search, Filter, ChevronDown, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

// Enable className support for LinearGradient
cssInterop(LinearGradient, {
  className: 'style',
});

// const { width } = Dimensions.get('window');

// Mock data for heroes
const mockHeroes = [
  {
    id: '1',
    name: 'Nelson Mandela',
    country: 'South Africa',
    countryCode: 'ZA',
    category: 'Politics',
    era: 'Post-Independence',
    popularity: 98,
    dateAdded: '2023-01-15',
    description: 'Anti-apartheid revolutionary and political leader who served as President of South Africa.',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP._jHrZ_Loev8LRdMNzzp4CwHaIV?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '2',
    name: 'Lat Dior Ngoné Latyr Diop',
    country: 'Senegal',
    countryCode: 'SN',
    category: 'Environment',
    era: 'Contemporary',
    popularity: 87,
    dateAdded: '2023-02-20',
    description: 'Environmental and political activist known for founding the Green Belt Movement.',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.F3DbQGGR9W_HNe6Ag_L7PQHaFJ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '3',
    name: 'Kwame Nkrumah',
    country: 'Ghana',
    countryCode: 'GH',
    category: 'Politics',
    era: 'Post-Independence',
    popularity: 92,
    dateAdded: '2023-03-10',
    description: 'First Prime Minister and President of Ghana, key figure in Pan-Africanism.',
    imageUrl: 'https://thisisafrica.me/wp-content/uploads/2022/09/Kwame-Nkrumah.jpg',
  },
  {
    id: '4',
    name: 'Chinua Achebe',
    country: 'Nigeria',
    countryCode: 'NG',
    category: 'Arts',
    era: 'Post-Independence',
    popularity: 89,
    dateAdded: '2023-04-05',
    description: 'Renowned novelist, poet, professor, and critic, author of Things Fall Apart.',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.dgnAacBIcC-RdqCmQKlnRQHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '5',
    name: 'Yaa Asantewaa',
    country: 'Ghana',
    countryCode: 'GH',
    category: 'Politics',
    era: 'Pre-Colonial',
    popularity: 94,
    dateAdded: '2023-05-12',
    description: 'Queen mother of Ejisu and leader of the War of the Golden Stool against British colonialism.',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.R6OwLDOcfT0h7uapT_P6hgHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '6',
    name: 'Miriam Makeba',
    country: 'South Africa',
    countryCode: 'ZA',
    category: 'Arts',
    era: 'Post-Independence',
    popularity: 86,
    dateAdded: '2023-06-18',
    description: 'Internationally celebrated singer and civil rights activist known as Mama Africa.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5984394de6f2e181003b0dab/1551788898420-QOYY71I45IOOMLS5DO6O/Miriam+Makeba+-+Taste+of+Southern+Africa.jpg',
  },
];

// Filter options
const countries = ['All', 'Ghana', 'Senegal', 'Nigeria', 'South Africa', 'Egypt', 'Ethiopia'];
const categories = ['All', 'Politics', 'Arts', 'Science', 'Religion', 'Sports', 'Environment'];
const eras = ['All', 'Pre-Colonial', 'Post-Independence', 'Contemporary'];
const sortOptions = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Date Added', value: 'dateAdded' },
  { label: 'Name', value: 'name' }
];

const HeroesDirectoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort heroes
  const filteredHeroes = useMemo(() => {
    let result = [...mockHeroes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(hero =>
        hero.name.toLowerCase().includes(query) ||
        hero.description.toLowerCase().includes(query) ||
        hero.country.toLowerCase().includes(query) ||
        hero.category.toLowerCase().includes(query)
      );
    }

    // Apply country filter
    if (selectedCountry !== 'All') {
      result = result.filter(hero => hero.country === selectedCountry);
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(hero => hero.category === selectedCategory);
    }

    // Apply era filter
    if (selectedEra !== 'All') {
      result = result.filter(hero => hero.era === selectedEra);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularity - a.popularity;
      } else if (sortBy === 'dateAdded') {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [searchQuery, selectedCountry, selectedCategory, selectedEra, sortBy]);

  // Render hero card
  const renderHeroCard = ({ item }: { item: typeof mockHeroes[0] }) => (
    <View className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
      <View className="flex-row">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-24 h-32 rounded-l-2xl"
        />
        <View className="flex-1 p-3">
          <View className="flex-row justify-between items-start">
            <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
            <View className="flex-row items-center bg-blue-100 px-2 py-1 rounded-full">
              <Star size={14} color="#FFC107" fill="#FFC107" />
              <Text className="text-xs font-semibold ml-1 text-blue-800">{item.popularity}%</Text>
            </View>
          </View>

          <View className="flex-row mt-1 items-center">
            <Text className="text-sm text-gray-600">{item.country}</Text>
            <View className="w-4 h-3 bg-gray-200 ml-2 rounded-sm">
              {/* Country flag placeholder */}
              <Text className="text-[8px] text-center font-bold text-gray-700">{item.countryCode}</Text>
            </View>
          </View>

          <View className="flex-row mt-2">
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-xs text-green-800">{item.category}</Text>
            </View>
            <View className="bg-purple-100 px-2 py-1 rounded-full ml-2">
              <Text className="text-xs text-purple-800">{item.era}</Text>
            </View>
          </View>

          <Text className="mt-2 text-sm text-gray-600 flex-1" numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#4CAF50']}
        className="rounded-b-3xl pb-6"
      >
        <View className="pt-12 px-4">
          <Text className="text-2xl font-bold text-white">African Heroes</Text>
          <Text className="text-white/90 mt-1">Discover inspiring leaders and changemakers</Text>
        </View>

        {/* Search Bar */}
        <View className="mt-4 mx-4 relative">
          <TextInput
            placeholder="Search heroes, countries, categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-white/20 pl-12 pr-4 py-3 rounded-full text-white placeholder-white/70"
          />
          <Search size={20} color="white" className="absolute left-4 top-3.5" />
        </View>
      </LinearGradient>

      {/* Filters Toggle */}
      <TouchableOpacity
        onPress={() => setShowFilters(!showFilters)}
        className="mx-4 mt-4 flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm"
      >
        <View className="flex-row items-center">
          <Filter size={20} color="#2196F3" />
          <Text className="ml-2 font-medium text-gray-800">Filters</Text>
        </View>
        <ChevronDown
          size={20}
          color="#666"
          className={`transform ${showFilters ? 'rotate-180' : ''}`}
        />
      </TouchableOpacity>

      {/* Filters Panel */}
      {showFilters && (
        <View className="mx-4 mt-2 bg-white rounded-xl p-4 shadow-sm">
          <View className="mb-4">
            <Text className="font-semibold text-gray-700 mb-2">Sort By</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded-full ${sortBy === option.value
                      ? 'bg-blue-500'
                      : 'bg-gray-100'
                      }`}
                  >
                    <Text
                      className={
                        sortBy === option.value
                          ? 'text-white font-medium'
                          : 'text-gray-700'
                      }
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-2">
              <Text className="font-semibold text-gray-700 mb-2">Country</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {countries.map(country => (
                    <TouchableOpacity
                      key={country}
                      onPress={() => setSelectedCountry(country)}
                      className={`px-3 py-1.5 rounded-full border ${selectedCountry === country
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-white border-gray-300'
                        }`}
                    >
                      <Text
                        className={
                          selectedCountry === country
                            ? 'text-white text-sm'
                            : 'text-gray-700 text-sm'
                        }
                      >
                        {country}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View className="flex-1 ml-2">
              <Text className="font-semibold text-gray-700 mb-2">Era</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {eras.map(era => (
                    <TouchableOpacity
                      key={era}
                      onPress={() => setSelectedEra(era)}
                      className={`px-3 py-1.5 rounded-full border ${selectedEra === era
                        ? 'bg-purple-500 border-purple-500'
                        : 'bg-white border-gray-300'
                        }`}
                    >
                      <Text
                        className={
                          selectedEra === era
                            ? 'text-white text-sm'
                            : 'text-gray-700 text-sm'
                        }
                      >
                        {era}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <View>
            <Text className="font-semibold text-gray-700 mb-2">Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full border ${selectedCategory === category
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                      }`}
                  >
                    <Text
                      className={
                        selectedCategory === category
                          ? 'text-white text-sm'
                          : 'text-gray-700 text-sm'
                      }
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Results Count */}
      <View className="mx-4 mt-4">
        <Text className="text-gray-600">
          Showing <Text className="font-bold">{filteredHeroes.length}</Text> heroes
        </Text>
      </View>

      {/* Heroes List */}
      <FlatList
        data={filteredHeroes}
        renderItem={renderHeroCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-500 text-lg">No heroes found</Text>
            <Text className="text-gray-400 mt-2 text-center">
              Try adjusting your filters or search terms
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HeroesDirectoryScreen;