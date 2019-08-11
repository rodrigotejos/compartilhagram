import react, { Component } from 'react';
import api from '../services/api';

import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


export default class Feed extends Component{
    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigation('New')}>
                <Image source={camera} />
            </TouchableOpacity>
        ),
    });

    state = {
        feed: [],
    };

    async componentDidMount(){
        //this.registerToSocket();

        const response = await api.get('posts');
        this.setState({feed: response.data});
    }

    render(){
        return(
            <View style= {styles.Component}>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={({item}) =>(
                        <View style={styles.feedItem}>
                            <View style={styles.feedItemHeader}>
                                <View style={styles.uderInfo}>
                                    <Text style={styles.name}>{item.author}</Text>>
                                    <Text style={styles.place}>{item.place}</Text>>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </ View>
        );
    }
}

const styles = StyleSheet.create({});