import React, { useState } from 'react'; 
import { Button, Input, Icon } from "@rneui/themed";
import { View, Text } from "react-native";
import DropDown from '../dropdown/DropDown';

export default function SearchInput({ onSearch, options, handleChange, selectedValue }) {
    const [keyword, setKeyword] = useState('');  
    const [showError, setShowError] = useState(false);

    const handleSearch = () => {
        if (!keyword) {
            setShowError(true);  
        } else {
            setShowError(false);  
            if (onSearch) {
                onSearch(keyword, selectedValue);  
            }
        }
    }

    return (
        <View className="my-5 w-11/12">
            <Input 
                leftIcon={{ type: 'entypo', name: 'magnifying-glass', color: 'grey' }}
                label='Search Movie/TV Show Name *'
                labelStyle={{fontWeight: 'normal', color:'black',}}
                placeholder="i.e. James Bond, CSI" 
                onChangeText={value => setKeyword(value)}
                inputContainerStyle={{
                    backgroundColor: '#e5e7eb', 
                    borderBottomWidth: showError ? 1 : 0, 
                    width: '100%', 
                    paddingLeft: 10,
                    borderColor: showError ? 'red' : 'transparent',
                    borderWidth: showError ? 1 : 0,
                }}
            />
            <View className="flex-row px-3">
                <View className="content-center mr-5">
                    <DropDown 
                        options={options} 
                        handleChange={handleChange} 
                        selectedValue={selectedValue} 
                        showError={showError}
                    />
                    {showError ? 
                        <Text className="text-xs mt-3 text-red-500">Movie/TV show name is required</Text> :
                        <Text className="text-xs mt-3">Please select a search item</Text>
                    }
                </View>
                <Button onPress={handleSearch}>
                    <Icon type='entypo' name='magnifying-glass' color='white' style={{ paddingRight: 8 }}/>
                    Search
                </Button>
            </View>
        </View>
    )
}