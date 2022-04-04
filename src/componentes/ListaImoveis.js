import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ListaImoveis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: []
        }
    }
    componentDidMount() {
        this.recuperaDados();
    }
    recuperaDados = () => {
        this.setState({ loading: true });

        fetch("http://192.168.2.110:5000/imoveis/api/Imoveis")
            .then(response => response.json())
            .then((dadosJson) => {
                this.setState({
                    loading: false,
                    dataSource: dadosJson
                });
                console.log('Dados recuperados');
            })
            .catch(error => console.log("Falha ao recuperar dados: " + error));
    }
    montaItemLista = (data) => {
        let imageUri = "data:image/png;base64,";
        return (
            <TouchableOpacity style={StyleLista.line} onPress={() => { this.props.navigation.navigate('Detalhe', {imvId: data.item.imovelId, imvNome: data.item.titulo, imvValor: data.item.valor, imvDescricao:data.item.descricao, imvImagens: data.item.imagens}); } }>
                <View style={StyleLista.info}>
                    <Text style={StyleLista.name}>{data.item.titulo}</Text>
                    
                    <Image source={{ uri: imageUri + data.item.imagens[0].imgByteG }} style={{ height: hp('17%'), width: wp('47.5%') }} />
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        {

                            data.item.imagens.map(item => (
                                <View>
                                    <Image source={{ uri: imageUri + item.imgByteG }} style={{ height: 25, width: 40, margin: 2 }} />
                                </View>
                            ))

                        }
                    </View>
                    <Text style={StyleLista.price}>R$ {data.item.valor.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <View style={StyleLista.container}>
                <FlatList data={this.state.dataSource}
                    renderItem={item => this.montaItemLista(item)}
                    keyExtractor={item => item.id}
                    numColumns={2} />
            </View>
        );
    }
}

export default ListaImoveis;

const StyleLista = StyleSheet.create({
    container: {
        marginTop: hp('1%'),
        marginLeft: hp('0.2%'),
        backgroundColor: "#FfF",
    },
    line: {

        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginHorizontal: wp('1.6%'),
        marginTop: hp('4%')

    },
    info: {
        width: wp('45.5%')
    },
    name: {
        fontSize: hp('2.4%'),
        fontWeight: "bold"
    },
    price: {
        fontSize: hp('2.5%'),
        color: "#060"
    }

})