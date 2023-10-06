import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import DropDown from '../dropdown/DropDown';
import MediaItem from './MediaItem';
import { fetchAiringToday, fetchOnAir, fetchPopularTV, fetchTopRateTV } from '../../../services/api'

export default function TVtab({ navigation }) {

    const options = [
        { label: "airing today", value: 1 },
        { label: "on the air", value: 2 },
        { label: "popular", value: 3 },
        { label: "top rated", value: 4 }
    ];

    const [selectedValue, setSelectedValue] = useState(3);
    const [tv, settv] = useState([]);

    useEffect(() => {
        const fetchData = async (value) => {
            try {
                let data;
                switch (value) {
                    case 1:
                        data = await fetchAiringToday();
                        break;
                    case 2:
                        data = await fetchOnAir();
                        break;
                    case 3:
                        data = await fetchPopularTV();
                        break;
                    case 4:
                        data = await fetchTopRateTV();
                        break;
                    default:
                        data = await fetchPopular();
                }

                settv(data.results || []);
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
            <DropDown options={options} handleChange={handleChange} selectedValue={selectedValue} />
            <FlatList
                className="pt-5"
                data={tv}
                renderItem={({ item }) => <MediaItem navigation={navigation} key={item.id} item={item} />}
            />
        </View>
    )
}
