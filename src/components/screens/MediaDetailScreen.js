import { Text, View, ScrollView } from 'react-native';
import Loading from '../layout/Loading';
import React, { useState, useEffect } from 'react';
import { fetchSingletv, fetchSingleMovie } from '../../../services/api';
import { Image } from 'react-native-elements';

export default function MediaDetailScreen({ route }) {
    const { itemId, type } = route.params;  
    const [mediaData, setMediaData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (type === 'movie') {
                    data = await fetchSingleMovie({ itemId });
                } else if (type === 'tv') {
                    data = await fetchSingletv({ itemId });
                }
                setMediaData(data);
            } catch (error) {
                console.error(`Error fetching ${type} data:`, error);
            }
        };

        fetchData();
    }, [itemId, type]);

    if (!mediaData) {
        return (
            <View className="flex-1 justify-center items-center">
                <Loading />
            </View>
        );
    }

    const titleOrName = mediaData.title || mediaData.name;
    const releaseDate = mediaData.release_date || mediaData.first_air_date;

    return(
        <View className="flex-1 justify-start items-center">
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text className="m-12 font-bold text-2xl">{titleOrName}</Text>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${mediaData.poster_path}` }} className="w-60 h-60"/>
                
                <Text className="m-8">{mediaData.overview}</Text>
                <View className="flex-row" >
                    <Text>Popularity: {mediaData.popularity}</Text>
                    <Text> | </Text>
                    <Text>Release Date: {releaseDate}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
