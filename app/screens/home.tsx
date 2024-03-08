import React, {useState} from 'react'
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native'
import {NavigationProp} from '@react-navigation/native'
import { firebaseAuth, firestore } from '../../FirebaseConfig'
import { getSingleDocumentByField } from '../../user_data';
import { Button } from '@rneui/themed';


//To route between components
  interface RouterProps {
    navigation: NavigationProp<any, any>;
  }
  

 const Home = ({navigation}: RouterProps) => {
    const [data, setData] = useState(null);

    //Query firebase to get current users info
    let email = firebaseAuth.currentUser.email; //Says error but I think currentuser will never be null
    if(email){
        //Function defined in user_data.ts for reusability
        getSingleDocumentByField("user_data", "email", email)
            .then((data: UserData | null) => {
                if (data) {
                // Log only the retrieved document data
                setData(data);
                } else {
                console.log("Document not found.");
                }
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }
    else{
        console.log("no email");
    }

    return (
        (data ? 
            // Render if user is loaded from query
            (
            <View style={styles.container}> 
                <Text style={styles.header}>Hi {data.Name},{"\n"} How is {data.city}?</Text> {/* throws error in vscode but is working currently*/}
                <Button 
                    containerStyle={{
                    marginHorizontal: 50,
                    marginVertical: 10,
                    borderRadius: 10,
                    }}color='black' title='Environmental Information' onPress={() => navigation.navigate('Info', { city: data.city})}>
                        
                </Button>
                <Button  
                    containerStyle={{
                        borderRadius: 10,
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    color='black' title='Sign Out' onPress={() => firebaseAuth.signOut()}>

                </Button>
 
            </View>
            )
            : 
            // Render if user is not yet loaded from query
            (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )

        )
    )
}
export default Home; 
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