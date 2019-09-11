import React, { Component } from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SliderBox } from 'react-native-image-slider-box';


export default class HomeScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			images: [
		'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree'
			]
		}
	}



	render() {
		return (

<View style={{flex:1}} >
		<TouchableOpacity style={styles.container} >
				
			<Icon name='account-circle' size= {40} color='#0260E8'  />
				
	    </TouchableOpacity>

	    <View style={{paddingBottom: 50, padding: 30, }} >
	    <SliderBox images={this.state.images}
	    autoplay= {true}
	    sliderBoxHeight={250}
		onCurrentImagePressed={index =>
		console.warn(`image ${index} pressed`)
		}
		dotColor="#FFEE58"
		inactiveDotColor="#90A4AE"
		paginationBoxVerticalPadding={20}
		circleLoop
	    />
	    </View>
	   
	 <View style={{backgroundColor: '#4A69FF', borderTopLeftRadius: 20, borderTopRightRadius: 20}} >
	   
	    <View style={styles.marginatas} >
        <TouchableHighlight onPress = {() => this.props.navigation.navigate('Laptop')}>
        <View style={styles.border} >
        <Image source={require('../icon/komputer.png')} style={{height: 80, width: 80}} />
        <Text style={styles.text} >Komputer / Laptop</Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.props.navigation.navigate('Handphone')}>
        <View style={styles.border} >
        <Image source={require('../icon/android.png')} style={{height: 80, width: 80}} />
        <Text style={styles.text} >Handphone</Text>
        </View>
        </TouchableHighlight>
        </View>

        <View style={styles.marginbawah} >
        <TouchableHighlight onPress = {() => this.props.navigation.navigate('Komputer')}>
        <View style={styles.border} >
        <Image source={require('../icon/car.png')} style={{height: 80, width: 80}} />
        <Text style={styles.text} >Mobil / Motor</Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this.props.navigation.navigate('Ac')}>
        <View style={styles.border} >
        <Image source={require('../icon/ac.jpg')} style={{height: 80, width: 80}} />
        <Text style={styles.text} >AC</Text>
        </View>
        </TouchableHighlight>
        </View>
	

	</View>
</View>
				

			);
	}
}

const styles = {

  container: {
	 flex: 1,
	 alignItems: 'flex-end',
     padding: 10,
  }, 
  border: {
     backgroundColor: 'white', height: 190, width: 190, borderRadius: 15, borderWidth: 3, borderColor: '#D7E1E9', justifyContent: 'center', alignItems: 'center'
  },
  marginatas : {
    paddingBottom: 20 , flexDirection: 'row', justifyContent: 'space-around', marginTop: 25, marginHorizontal: 30
  },
  text: {fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginTop: 20
  },
  marginbawah : {
    paddingBottom: 20 , flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginHorizontal: 30
  },
	
}

