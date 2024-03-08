import React, {useState} from 'react'
import { View, Text, StyleSheet} from 'react-native'

const Info = ({ route }) => {
    const {city} = route.params;
    return (
            <View style={styles.container}>
                {/*TO DO: Add more functionality*/}
                <Text style={styles.header}>Environmental information about {city} to be filled in</Text>
            </View>
        )
}

export default Info;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2E8B57',
        padding:15

    },
    header: {
        fontSize: 30,
        color: 'black',
        marginBottom: 30,
        textAlign: "center"
    }
}
);