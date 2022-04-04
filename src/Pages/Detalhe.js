import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';

class Detalhe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            produto: { id: props.route.params.imvId, nome: props.route.params.imvNome, imagens: props.route.params.imvImagens, valor: props.route.params.imvValor },
            Nome: "",
            Email: "",
            Telefone: "",
            Mensagem: ""
        }
    }
    _renderItem = ({ item}) => {
        let imageUri = "data:image/png;base64,";
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={{width:wp('80%'), height:wp('56%')}} source={{ uri: imageUri + item.imgByteG }} />
            </View>
        );
    }
    Enviar = () => {
        let parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nome: this.state.Nome,
                Email: this.state.Email,
                Telefone: this.state.Telefone,
                Mensagem: this.state.Mensagem
            })
        }
        fetch("http://192.168.2.110:5000/imoveis/api/Imoveis", parametros)
            .then(response => response.json())
            .then((dadosJson) => {
                ToastAndroid.show("Enviado", ToastAndroid.SHORT);
                this.props.navigation.navigate('Imoveis');
            })
            .catch(error => console.log("Falha ao gravar dados: " + error));
    }

    render() {
        let imageUri = "data:image/png;base64,";
        return (
            <ScrollView>
                <Text>{this.state.produto.nome}</Text>
                
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.produto.imagens}
                    renderItem={this._renderItem}
                    sliderWidth={wp('100%')}
                    itemWidth={wp('80%')}
                />
                <Text>{this.state.produto.valor}</Text>
                <Text>Interessado neste imovel? Preencha o formulario abaixo e entraremos em contato com você</Text>
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input} placeholder='Nome' onChangeText={(valor) => this.setState({ Nome: valor })}></TextInput>
                <Text style={styles.label}>mensagem:</Text>
                <TextInput style={styles.input} onChangeText={(valor) => this.setState({ Mensagem: valor })} multiline placeholder="deixe uma mensagem..." />
                <Text style={styles.label}>Telefone:</Text>
                <TextInput style={styles.input} onChangeText={(valor) => this.setState({ Telefone: valor })} multiline placeholder="telefone para contato..." />
                <Text style={styles.label}>E-mail:</Text>
                <TextInput style={styles.input} onChangeText={(valor) => this.setState({ Email: valor })} multiline placeholder="E-mail..." />
                <TouchableOpacity style={styles.botaoCad} onPress={this.Enviar} ><Text style={styles.textoBotao}>Enviar</Text></TouchableOpacity>
            </ScrollView>
        );
    }
}

export default Detalhe;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    titulo: {
        fontSize: hp('5%'),
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#00a8ff'
    },
    label: {
        fontSize: hp('2%'),
        textAlign: 'center',
        marginTop: hp('0.5%'),
        color: '#00a8ff',
        fontWeight: 'bold',
    },
    input: {
        fontSize: hp('2.5%'),
        borderWidth: hp('.4%'),
        width: wp('98%'),
        borderColor: '#00a8ff',
        borderRadius: 20,
        margin: hp('0.1%'),
    },
    botaoCad: {
        width: wp('40%'),
        height: hp('6%'),
        backgroundColor: '#00a8ff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: hp('2.9%')
    },

    textoBotao: {
        fontSize: hp('2.5%'),
        color: 'white',
        fontStyle: 'normal',
        textTransform: 'uppercase',
        fontWeight:'bold'
    },
    textoBotaoc: {
        fontSize: hp('2.5%'),
        color: '#00a8ff',
        fontStyle: 'normal',
        textTransform: 'uppercase'
    },
    imagem: {
        height: hp('15%'),
        width: wp('40%'),
        borderColor: '#00a8ff',
        marginHorizontal: hp('2.5%'),
        margin: hp('0.5%'),
    }
})