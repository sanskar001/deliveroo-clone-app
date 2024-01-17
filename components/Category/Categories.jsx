import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import { foodImage } from "../../assets/images/path";
import { useEffect, useState } from "react";
import sanityClient from "../../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"] {
      ...,
     }`
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={category.image}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
