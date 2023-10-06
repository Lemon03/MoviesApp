import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function DropDown({ options, handleChange, selectedValue, showError }) {
    const [visible, setVisible] = useState(false);

    const toggleDropdown = () => {
        setVisible(prevVisible => !prevVisible);
    };

    const handleOptionSelect = (value) => {
        if (handleChange) {
            handleChange(value);
        }
        toggleDropdown();
    };

    const selectedOption = options.find(opt => opt.value === selectedValue);
    const label = selectedOption ? selectedOption.label : "";

    return (
        <View>
            <Button 
                containerStyle={{
                    borderColor: showError ? 'red' : 'gray',
                    borderWidth: 1, 
                    width: 150,
                }}
                onPress={toggleDropdown} 
                type='clear' 
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{fontSize: 15, color: 'black'}}>
                        {label}
                    </Text>
                    <Icon type='entypo' name='chevron-down' color='grey' />
                </View>
            </Button>


            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={toggleDropdown}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="flex-1 justify-end items-center mt-22">
                        <View 
                            style={styles.android} 
                            className="w-full bg-white rounded-t-xl p-3 pb-12 shadow-md">
                            {options.map((option, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    onPress={() => handleOptionSelect(option.value)}
                                    className={`text-lg py-2 rounded ${selectedValue === option.value ? 'bg-emerald-500' : ''}`}
                                >
                                    <View className="flex-row justify-start items-center">
                                        <Text className={`text-lg p-2 pl-4 font-bold ${selectedValue === option.value ? 'text-white' : ''}`}>
                                            {option.label}
                                        </Text>
                                        <Icon type='entypo' name='check' color="white" style={{marginLeft: 10}}/>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    android: {
        elevation: 8
    }
});
