import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { urlFor } from "../../sanity";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <ImageBackground
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-20 w-20 rounded"
      />
      <View className="bg-black/30 absolute w-20 h-20 top-0 left-0"></View>
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
