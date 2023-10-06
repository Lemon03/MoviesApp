import React, { useState } from 'react';
import { View } from 'react-native';
import Movietab from '../containers/Movietab';
import Searchtab from '../containers/Searchtab';
import TVtab from '../containers/TVtab';
import Tabs from '../tab/Tabs';

export default function Index( {navigation} ){
    const [index, setIndex] = useState(0);

    return(
        <View className="flex flex-1">
            <Tabs initialIndex={index} onTabChange={setIndex} />

            {index === 0 && <Movietab navigation = {navigation} /> }
            {index === 1 && <Searchtab navigation = {navigation} /> }
            {index === 2 && <TVtab navigation = {navigation} /> }
        </View>
    )
}