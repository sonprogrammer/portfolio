import { KakaoPlace } from '@/entities/mungpass/shops/model/types';
import { create } from "zustand";

interface SelectedPlace{
    selectedPlace: KakaoPlace | null
    setSelectedPlace: (place: KakaoPlace | null) =>void
    reset: () => void
}

export const useSelectedPlace = create<SelectedPlace>()(set => ({
    selectedPlace: null,
        setSelectedPlace: (place) => set({selectedPlace: place}),
        reset: () => set({selectedPlace: null})
}))