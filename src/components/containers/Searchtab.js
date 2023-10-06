import SearchInput from '../forms/SearchInput';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import MediaItem from './MediaItem';
import { searchMovie, searchMulti, searchTV } from '../../../services/api'

export default function Searchtab({ navigation }){
    const options = [
        { label: "movie", value: 1 },
        { label: "multi", value: 2 },
        { label: "TV", value: 3 },
    ];
    
        const [selectedValue, setSelectedValue] = useState(2);
        const [tv, settv] = useState([]);
        const [keyword, setkeyword] = useState('');
    
        useEffect(() => {
            const fetchData = async (selectedOption, searchKeyword) => {
                if (searchKeyword === '') return;
                try {
                    let data;
                    switch (selectedOption) {
                        case 1:
                            data = await searchMovie({searchKeyword});
                            break;
                        case 2:
                            data = await searchMulti({searchKeyword});
                            break;
                        case 3:
                            data = await searchTV({searchKeyword});
                            break;
                    }
                    settv(data.results || []);
                } catch (error) {
                    console.error(`Error with fetching`, error);
                }
            };
            fetchData(selectedValue, keyword);
        }, [selectedValue, keyword]);
        
    
        const handleChange = (value) => {
            setSelectedValue(value);
        };

        const handleInputChange = (value) => {
            setkeyword(value);
        }
    
        return (
            <View className="flex-1 justify-center items-center">
                <SearchInput 
                    onSearch={handleInputChange} 
                    options={options} 
                    handleChange={handleChange} 
                    selectedValue={selectedValue} 
                />
                {keyword === '' ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-xl font-bold">Please initiate a search</Text>
                    </View>
                ) : (
                    <View className="flex-1">
                        <FlatList
                            data={tv}
                            renderItem={({ item }) => <MediaItem navigation={navigation} key={item.id} item={item} />}
                        />
                    </View>
                )}
            </View>
        )
    
}