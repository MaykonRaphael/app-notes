import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const statusBarColor = '#069';

    const [estado, setEstado] = useState('leitura');
    const [anotacao, setAnotacao] = useState('');

    useEffect(()=>{
        (async () => {
            try{
                const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
                setAnotacao(anotacaoLeitura);
            }catch(error){}
        })();
    },[])

    const setData = async() => {
        try{
            await AsyncStorage.setItem('anotacao', anotacao);
        }catch(error){}

        alert("Sua anotacao foi salva");
    }

    function atualizarTexto(){
        setEstado('leitura');
        setData();
    }

    if(estado == 'leitura'){
        return (
            <>
            <StatusBar hidden/>
            <SafeAreaView style={{flex:0, backgroundColor: statusBarColor}}/>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        
                        <Text style={styles.text}>
                            Aplicativo Anotacao
                        </Text>

                    </View>
                    {
                        (anotacao != '')?
                        <View style={styles.body}>

                        <Text style={styles.anotacao}>
                            {anotacao}
                        </Text>

                        </View>
                        :
                        <View style={{padding: 20}}>
                            <Text style={{opacity:0.3}}>
                                Nenhuma Anotacao encontrada 😞
                            </Text>
                        </View>
                    }
                    {
                        (anotacao == '')?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setEstado('atualizando')}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => setEstado('atualizando')}
                        >
                            <Text style={styles.buttonText2}>Editar</Text>
                        </TouchableOpacity>
                    }
                </View>
            </SafeAreaView>
            </>
        );
    } else if (estado == 'atualizando'){
        return(
            <>
            <StatusBar hidden/>
            <SafeAreaView style={{flex:0, backgroundColor: statusBarColor}}/>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <View style={styles.header}>
                                
                                <Text style={styles.text}>
                                    Aplicativo Anotacao
                                </Text>

                            </View>
                            <TextInput
                                autofocus={true}
                                onChangeText={(text)=>setAnotacao(text)}
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={5}
                                value={anotacao}
                            ></TextInput>

                            <TouchableOpacity
                                onPress={() => atualizarTexto()}
                                style={styles.button2}
                            >
                                <Text style={styles.buttonText2}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            </>
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: '#069'
    },
    body: {
        padding: 20
    },
    text: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18
    },
    textInput: {
        paddingTop: Platform.OS == 'ios' ? 20 : 0,
        padding:20,
        height:300,
        textAlignVertical:'top'
    },
    anotacao: {
        fontSize: 14
    },
    button: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        backgroundColor: '#069',
        borderRadius: 25
    },
    buttonText: {
        color: '#FFF',
        position: 'relative',
        textAlign: 'center',
        top: 3,
        fontSize: 30
    },
    button2: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 100,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#069',
    },
    buttonText2: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20
    }
});
