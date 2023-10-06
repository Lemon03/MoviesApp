import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import DropDown from '../dropdown/DropDown';
import MediaItem from './MediaItem';
import { fetchNowplaying, fetchPopular, fetchTopRate, fetchUpcoming } from '../../../services/api'

export default function Movietab({ navigation }) {

    const options = [
        { label: "now playing", value: 1 },
        { label: "popular", value: 2 },
        { label: "top rated", value: 3 },
        { label: "upcoming", value: 4 }
    ];

    const [selectedValue, setSelectedValue] = useState(2);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async (value) => {
            try {
                let data;
                switch (value) {
                    case 1:
                        data = await fetchNowplaying();
                        break;
                    case 2:
                        data = await fetchPopular();
                        break;
                    case 3:
                        data = await fetchTopRate();
                        break;
                    case 4:
                        data = await fetchUpcoming();
                        break;
                    default:
                        data = await fetchPopular();
                }

                setMovies(data.results || []);
            } catch (error) {
                console.error(`Error with fetching`, error);
            }
        };
        fetchData(selectedValue);
    }, [selectedValue]);

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <View className="flex-1 justify-center items-center pt-5">
            <DropDown 
            options={options} 
            handleChange={handleChange} 
            selectedValue={selectedValue} 
            />
            <FlatList
                className="pt-5"
                data={movies}
                renderItem={({ item }) => <MediaItem navigation={navigation} key={item.id} item={item} />}
            />
        </View>
    )
}
