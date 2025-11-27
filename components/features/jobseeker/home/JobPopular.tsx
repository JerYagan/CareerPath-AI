import React from 'react'
import { View, ScrollView, Text } from 'react-native'

const JobPopular = () => {
  return (
    <View className='px-4 flex-row items-center'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text className='p-2 text-sm pl-0 text-gray-600'>Popular:</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Developer</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Designer</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Data Science</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Virtual Assistant</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Administrative Tasks</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Data Encoder</Text>
            <Text className='p-2 text-sm bg-gray-300 rounded-md ml-2'>Web Developer</Text>
        </ScrollView>
    </View>
  )
}

export default JobPopular