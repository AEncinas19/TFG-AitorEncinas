import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import {View, Image, Text, StyleSheet, Alert, TouchableHighlight} from "react-native";
import App from './AppDemo';
import Map from './Map';
import {addProduct, arriveShop, removeProduct} from '../redux/actions';


//import {SafeAreaView} from "react-native-safe-area-context";

class AppScreen extends React.Component {

    render() {
        if (this.props.activated) {
            if (this.props.locationdetected){
                return(
                    <View style= {{flex:1}} className="IndexScreen">
                        <App shop = {this.props.shop}
                                 onAddProduct = {(product) => {this.props.dispatch(addProduct(product))}}
                                 onRemoveProduct = {(product) => {this.props.dispatch(removeProduct(product))}}
                                 onResetShop = {(shop) => {this.props.dispatch(arriveShop(shop))}}
                        />
                    </View>
                )
            }else{
            return (
                <Map />
            )
            }
        }
        else {
            return  <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                        <Image source={require('../assets/no-site.png')}/>
                        <Text>Empieza la búsqueda para buscar tienda</Text>
                    </View>
        } 
    }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

//export default App;
export default connect(mapStateToProps)(AppScreen);

