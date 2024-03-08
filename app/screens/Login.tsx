import {View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { firebaseAuth, firestore, collectionRef } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from "firebase/firestore"; // Import addDoc from Firebase

import { Button } from '@rneui/themed';




const Login = () => {

    //State variables which track and display users inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setPassword2] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    //state variable sets whether user would like to login or sign up
    const [login, setLogin] = useState(true);

    //Import auth object from firebase which allows user to login and sign up
    const auth = firebaseAuth; 

    //Function to sign in using firebase
    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error); //alert user of error if fail
        }
        finally {
            setLoading(false);
        }
    }

    //Function to sign up
    const signUp = async () => {
        if(password != confirm_password){
            alert("Passwords do not match"); //Alerts user if password and confirm password do not match
            return;
        }
        //Add more input checks here 
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error); //alert user if sign up failed and show them the error from firebase
        }
        finally {

            //add user data to database 
            try {
            // Add data to the collection user_data
            await addDoc(collectionRef, {
                Name: name,
                email: email.toLowerCase(), //To convert Lower Case,
                city: city
            });
        
            console.log('Data added to collection successfully!');
            } catch (error) {
            console.error('Error adding data to collection: ', error);
            }
            setLoading(false);
        }
    };

    return (
        (login ? 

        /*Render in case when user needs to login*/
        (
                <View style={styles.container}>
                    <Text style={styles.title}>Street Teams</Text>
                    <KeyboardAvoidingView behavior='padding'>
                        <TextInput textContentType='oneTimeCode' value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                        <TextInput textContentType='oneTimeCode' value={password} style={styles.input} placeholder="Password" secureTextEntry={true} autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

                        {loading  ? (<ActivityIndicator size="large" color="0000ff"/>)
                        : (<>
                        {/* To Do: Move button styling to make code cleaner*/}
                        <Button title="Login" onPress={() => signIn()}
                            buttonStyle={{
                            backgroundColor: 'rgba(78, 116, 289, 1)',
                            borderRadius: 10,
                            }}
                            loading={loading}
                            containerStyle={{
                            marginHorizontal: 90,
                            marginVertical: 10,
                            }}
                        />
                        {/* To Do: Move button styling to make code cleaner*/}
                        <Button title="Need to create an account?" onPress={() => setLogin(false)}
                            buttonStyle={{
                            backgroundColor: 'gray',
                            borderRadius: 10,
                            }}
                            loading={loading}
                            titleStyle={{
                                color: 'black',
                                marginHorizontal: 20,
                              }}
                            containerStyle={{
                            marginHorizontal: 90,
                            marginVertical: 10,
                            }}
                        />

                        </>
                        )}
                    </KeyboardAvoidingView>
                </View>
        )
        :
        /*Render in case when user needs to sign up*/
        (
        <View style={styles.container}>
            <Text style={styles.title}>Street Teams</Text>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput textContentType='oneTimeCode' value={name} style={styles.input} placeholder="Name"  onChangeText={(text) => setName(text)}></TextInput>
                <TextInput textContentType='oneTimeCode' value={city} style={styles.input} placeholder="Enter Your City" onChangeText={(text) => setCity(text)}></TextInput>
                <TextInput textContentType='oneTimeCode' value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput textContentType='oneTimeCode' value={password} style={styles.input} placeholder="Password" secureTextEntry={true} autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                <TextInput  textContentType='oneTimeCode'value={confirm_password} style={styles.input} placeholder="Confirm Password" secureTextEntry={true} autoCapitalize="none" onChangeText={(text) => setPassword2(text)}></TextInput>


                {loading  ? (<ActivityIndicator size="large" color="0000ff"/>)
                : (<>
                <Button title="Create Account" onPress={() => signUp()}
                    buttonStyle={{
                        backgroundColor: 'rgba(78, 116, 289, 1)',
                        borderRadius: 10,
                        }}
                        loading={loading}
                        containerStyle={{
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                />
                <Button title="Need to Login?" onPress={() => setLogin(true)}
                    buttonStyle={{
                        backgroundColor: 'gray',
                        borderRadius: 10,
                        }}
                        loading={loading}
                        titleStyle={{
                            color: 'black',
                            marginHorizontal: 20,
                            }}
                        titleProps={{
                            
                        }}
                        containerStyle={{
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}/>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
        )
    )
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2ECC71',
        padding:15

    },
    input: {
        position: 'relative',
        marginVertical: 4,
        marginHorizontal: 70,
        height: 50,
        borderWidth: 1,
        borderRadius: 9,
        padding: 10,
        backgroundColor: "#fff",
        alignContent: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 70,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        marginBottom: 30
    }
});