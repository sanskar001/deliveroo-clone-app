import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Image, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomSafeAreaView from "../components/UI/CustomSafeAreaView";
import { avatarImage } from "../assets/images/path";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Category/Categories";
import FeaturedRow from "../components/FeaturedRow/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->{
              ...,
            }
          }
        }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <CustomSafeAreaView classValue="bg-white">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: avatarImage,
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-lg">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 p-3 flex-1 bg-gray-200">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Resturants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories />

        {featuredCategories.map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default HomeScreen;
