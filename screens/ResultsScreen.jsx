import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import TextHighlight from "react-native-text-highlighter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResultsScreen = ({ navigation }) => {
  const route = useRoute();
  const { barcode } = route.params;

  const [productData, setProductData] = useState(null);
  const [listData, setListData] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 1) {
        const product = data.product;
        setProductData(product);
      } else {
        console.log("Product not found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const loadListData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("listData");
      if (storedData !== null) {
        setListData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading data:", error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
    loadListData();
  }, []);

  if (!productData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />

        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {"Name: " + (productData.product_name || "No product name available")}
        </Text>
        <Text style={styles.header}>
          {"Brand: " + (productData.brands || "No brand name available")}
        </Text>
        <Text style={styles.text}>Ingredients:</Text>
        <TextHighlight
          textToHighlight={
            productData.ingredients_text
              ? productData.ingredients_text.toUpperCase()
              : "No ingredients information available"
          }
          searchWords={listData}
          fontSize={18}
          highlightTextStyle={{ backgroundColor: "#ff6961" }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 25,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  button: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#6BED74",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ResultsScreen;
