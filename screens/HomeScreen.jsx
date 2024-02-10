import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Camera')}>
                <FontAwesome name="search" size={100} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('List')}>
                <MaterialIcons name="playlist-add" size={45} color="black" />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        height: 200,
        width: 200,
        marginBottom: 50,
        borderRadius: 100,
        backgroundColor: "#6BED74",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button2: {
        position: "absolute",
        left: 300,
        top: 700,
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: "#6BED74",
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default HomeScreen;