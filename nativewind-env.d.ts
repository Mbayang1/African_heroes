/// <reference types="nativewind/types" />

import { LinearGradientProps } from 'expo-linear-gradient';

declare module 'expo-linear-gradient' {
    interface LinearGradientProps {
        className?: string;
    }
}
