import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const ListScreen = () => {
    const [inputText, setInputText] = useState('');
    const [listData, setListData] = useState([]);

    useEffect(() => {
        // Load data from AsyncStorage when the component mounts
        loadListData();
    }, []);

    useEffect(() => {
        saveListData();
    }, [listData])

    const loadListData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('listData');
            if (storedData !== null) {
                setListData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading data:', error.message);
        }
    };

    const saveListData = async () => {
        try {
            await AsyncStorage.setItem('listData', JSON.stringify(listData));
        } catch (error) {
            console.error('Error saving data:', error.message);
        }
    };

    const addToList = () => {
        if (inputText.trim() !== '') {
            setListData([...listData, inputText]);
            setInputText('');

        }
    };

    const removeFromList = (index) => {
        const updatedList = [...listData];
        updatedList.splice(index, 1);
        setListData(updatedList);
        saveListData();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editable List</Text>
            <TextInput
                style={styles.input}
                placeholder="Add item"
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />
            <Button title="Add" onPress={addToList} />
            <FlatList
                data={listData}
                renderItem={({ item, index }) => (
                    <View style={styles.listItem}>
                        <Text>{item}</Text>
                        <Button title="Remove" onPress={() => removeFromList(index)} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            {/* <Button title="Save List" onPress={saveListData} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
});

export default ListScreen;
