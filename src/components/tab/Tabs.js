import { Tab } from "@rneui/themed"
import React, { useState } from 'react';

export default function Tabs({ initialIndex = 0, onTabChange }) {
    const [index, setIndex] = useState(initialIndex);

    const handleChange = (newIndex) => {
        setIndex(newIndex);
        if (onTabChange) {
            onTabChange(newIndex);
        }
    }

    return (
        <Tab 
            value={index} 
            onChange={handleChange} 
            titleStyle={{fontSize:15, paddingVertical: 8, color:'#2e4a70', }}
            indicatorStyle={{backgroundColor:'#2e4a70'}}
        dense>
            <Tab.Item>Movies</Tab.Item>
            <Tab.Item>Search Results</Tab.Item>
            <Tab.Item>TV Shows</Tab.Item>
        </Tab>
    )
}
