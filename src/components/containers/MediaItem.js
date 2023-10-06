import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Button } from '@rneui/themed';

export default function MediaItem({ item , navigation }) {
    const isMovie = item.title !== undefined;
    const titleOrName = isMovie ? item.title : item.name;
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    
    return (
        <View className="flex-row mx-4 my-2">
            <Image 
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
                className="w-24 h-24" 
            />
            <View className="w-11/12 ml-3">
                <View style={{flexGrow: 1, flexDirection: 'row'}}>
                    <Text id="title" className="font-bold">{titleOrName}</Text>
                </View>
                <Text id="popularity">{`Popularity: ${item.popularity}`}</Text>
                <Text id='release'>{`Release Date: ${releaseDate}`}</Text>
                <View className="w-7/12">
                <Button 
                  title="More Details" 
                  onPress={() => {
                      const mediaType = item.title ? 'movie' : 'tv';
                      navigation.navigate('MediaDetailScreen', { itemId: item.id, type: mediaType });
                  }}
                />
                </View>
            </View>
        </View>
    );
}
