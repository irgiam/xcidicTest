import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const Todo = ({ data, deleteFunction }) => {
    

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text>Complete: {data.completed}</Text>
                <Text>{data.todo}</Text>
                <Text>User Id: {data.userId}</Text>
            </View>
            <View style={styles.innerContainer2}>
                <TouchableOpacity onPress={deleteFunction}>
                    <Text>Delete</Text>
                </TouchableOpacity>
                <Text>Edit</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '97.5%',
        padding: 4,
        // height: 60,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
    },
    innerContainer: {
        width: '70%',
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    innerContainer2: {
        width: '20%',
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'column',
        // justifyContent: 'space-between',
    }
})

export default Todo