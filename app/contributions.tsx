import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
    ChevronLeft,
    Send,
    User,
    FileCheck,
    Clock,
    CheckCircle,
    XCircle,
} from 'lucide-react-native';

// Mock data for pending submissions
const mockPendingSubmissions = [
    {
        id: 1,
        type: 'hero',
        name: 'Thomas Sankara',
        country: 'Burkina Faso',
        category: 'Leaders',
        description: 'Known as "Africa\'s Che Guevara", a revolutionary leader...',
        status: 'pending',
        submittedBy: 'historian123',
        submittedAt: '2024-01-15',
    },
    {
        id: 2,
        type: 'content',
        heroName: 'Queen Amina',
        title: 'New historical evidence',
        description: 'Recently discovered documents reveal Queen Amina\'s...',
        status: 'pending',
        submittedBy: 'researcher456',
        submittedAt: '2024-01-14',
    },
];

export default function ContributionsScreen() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState<'submit' | 'review'>('submit');
    const [formType, setFormType] = useState<'hero' | 'content'>('hero');

    // Form states
    const [heroName, setHeroName] = useState('');
    const [country, setCountry] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [sources, setSources] = useState('');

    const handleSubmit = () => {
        if (!heroName || !description) {
            Alert.alert('Required Fields', 'Please fill in all required fields');
            return;
        }
        Alert.alert(
            'Success',
            'Your submission has been received and is pending review.',
            [{ text: 'OK', onPress: () => resetForm() }]
        );
    };

    const resetForm = () => {
        setHeroName('');
        setCountry('');
        setCategory('');
        setDescription('');
        setSources('');
    };

    const handleReviewAction = (id: number, action: 'approve' | 'reject') => {
        Alert.alert(
            'Confirm Action',
            `Are you sure you want to ${action} this submission?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        Alert.alert('Success', `Submission ${action}d successfully`);
                    },
                },
            ]
        );
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#2196F3] pt-12 pb-4 px-4 rounded-b-3xl">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2"
                        accessibilityLabel="Go back"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold">Contributions</Text>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-white">Admin Mode</Text>
                        <Switch
                            value={isAdmin}
                            onValueChange={setIsAdmin}
                            trackColor={{ false: '#ffffff50', true: '#4CAF50' }}
                        />
                    </View>
                </View>
            </View>

            {/* Tab Navigation */}
            <View className="flex-row border-b border-gray-200">
                <TouchableOpacity
                    onPress={() => setActiveTab('submit')}
                    className={`flex-1 py-3 ${activeTab === 'submit' ? 'border-b-2 border-[#2196F3]' : ''
                        }`}
                >
                    <Text
                        className={`text-center ${activeTab === 'submit' ? 'text-[#2196F3]' : 'text-gray-600'
                            }`}
                    >
                        Submit
                    </Text>
                </TouchableOpacity>
                {isAdmin && (
                    <TouchableOpacity
                        onPress={() => setActiveTab('review')}
                        className={`flex-1 py-3 ${activeTab === 'review' ? 'border-b-2 border-[#2196F3]' : ''
                            }`}
                    >
                        <Text
                            className={`text-center ${activeTab === 'review' ? 'text-[#2196F3]' : 'text-gray-600'
                                }`}
                        >
                            Review
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView className="flex-1">
                {activeTab === 'submit' ? (
                    <View className="p-4">
                        {/* Submission Type Selection */}
                        <View className="flex-row gap-4 mb-6">
                            <TouchableOpacity
                                onPress={() => setFormType('hero')}
                                className={`flex-1 p-4 rounded-xl border ${formType === 'hero'
                                    ? 'border-[#2196F3] bg-blue-50'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <User
                                    size={24}
                                    color={formType === 'hero' ? '#2196F3' : '#666666'}
                                    className="mb-2"
                                />
                                <Text
                                    className={`${formType === 'hero' ? 'text-[#2196F3]' : 'text-gray-600'
                                        }`}
                                >
                                    New Hero
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFormType('content')}
                                className={`flex-1 p-4 rounded-xl border ${formType === 'content'
                                    ? 'border-[#2196F3] bg-blue-50'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <FileCheck
                                    size={24}
                                    color={formType === 'content' ? '#2196F3' : '#666666'}
                                    className="mb-2"
                                />
                                <Text
                                    className={`${formType === 'content' ? 'text-[#2196F3]' : 'text-gray-600'
                                        }`}
                                >
                                    New Content
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Submission Form */}
                        <View className="space-y-4">
                            <View>
                                <Text className="text-gray-700 mb-1">
                                    {formType === 'hero' ? "Hero's Name" : 'Content Title'}*
                                </Text>
                                <TextInput
                                    value={heroName}
                                    onChangeText={setHeroName}
                                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                                    placeholder={
                                        formType === 'hero'
                                            ? 'Enter hero name'
                                            : 'Enter content title'
                                    }
                                />
                            </View>

                            {formType === 'hero' && (
                                <>
                                    <View>
                                        <Text className="text-gray-700 mb-1">Country</Text>
                                        <TextInput
                                            value={country}
                                            onChangeText={setCountry}
                                            className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                                            placeholder="Enter country"
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-gray-700 mb-1">Category</Text>
                                        <TextInput
                                            value={category}
                                            onChangeText={setCategory}
                                            className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                                            placeholder="E.g., Leader, Inventor, Activist"
                                        />
                                    </View>
                                </>
                            )}

                            <View>
                                <Text className="text-gray-700 mb-1">Description*</Text>
                                <TextInput
                                    value={description}
                                    onChangeText={setDescription}
                                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                                    placeholder="Enter detailed description"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View>
                                <Text className="text-gray-700 mb-1">Sources & References</Text>
                                <TextInput
                                    value={sources}
                                    onChangeText={setSources}
                                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                                    placeholder="Enter sources and references"
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="bg-[#2196F3] p-4 rounded-lg flex-row items-center justify-center gap-2 mt-4"
                            >
                                <Send color="white" size={20} />
                                <Text className="text-white font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    // Review Interface (Admin Only)
                    <View className="p-4">
                        <Text className="text-lg font-semibold mb-4">
                            Pending Submissions
                        </Text>
                        {mockPendingSubmissions.map((submission) => (
                            <View
                                key={submission.id}
                                className="bg-white border border-gray-200 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row items-center justify-between mb-2">
                                    <View className="flex-row items-center gap-2">
                                        {submission.type === 'hero' ? (
                                            <User size={20} color="#666666" />
                                        ) : (
                                            <FileCheck size={20} color="#666666" />
                                        )}
                                        <Text className="text-gray-600 capitalize">
                                            {submission.type}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <Clock size={16} color="#666666" />
                                        <Text className="text-gray-600 text-sm">
                                            {submission.submittedAt}
                                        </Text>
                                    </View>
                                </View>

                                <Text className="text-lg font-semibold mb-1">
                                    {submission.type === 'hero'
                                        ? submission.name
                                        : submission.title}
                                </Text>
                                <Text className="text-gray-600 mb-3">
                                    {submission.description}
                                </Text>

                                <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                                    <Text className="text-gray-600">
                                        By: {submission.submittedBy}
                                    </Text>
                                    <View className="flex-row gap-2">
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleReviewAction(submission.id, 'reject')
                                            }
                                            className="bg-red-100 p-2 rounded-lg"
                                        >
                                            <XCircle size={20} color="#DC2626" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleReviewAction(submission.id, 'approve')
                                            }
                                            className="bg-green-100 p-2 rounded-lg"
                                        >
                                            <CheckCircle size={20} color="#059669" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
