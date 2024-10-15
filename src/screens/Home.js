import React, {useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS, FONTS, icons, images, SIZES} from '../constants';

const Home = ({navigation}) => {
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from json file
  const fetchData = async () => {
    try {
      const json = require('../constants/data.json');
      const uniqueDestinations = json.destinations.filter(
        (item, index, self) =>
          index === self.findIndex(t => t.name === item.name),
      );
      setDataSource(uniqueDestinations); // Set the data into state
    } catch (error) {
      setError(error.message); // Handle any errors
    } finally {
    }
  };

  const OptionItem = ({bgColor, icon, label, onPress}) => {
    return (
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={onPress}>
        <View style={[styles.shadow, {width: 60, height: 60}]}>
          <LinearGradient
            style={[
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: 'red',
              },
            ]}
            colors={bgColor}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}>
            <Image
              source={icon}
              resizeMode="cover"
              style={{
                tintColor: COLORS.white,
                width: 30,
                height: 30,
              }}
            />
          </LinearGradient>
        </View>
        <Text
          style={{marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3}}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  function renderDestinations(item, index) {
    var destinationStyle = {};

    if (index === 0) {
      destinationStyle = {marginLeft: SIZES.padding};
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Details', {item});
        }}>
        <Animated.View
          style={{
            justifyContent: 'center',
            marginHorizontal: SIZES.base,
            ...destinationStyle,
          }}>
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: SIZES.width * 0.28,
              height: '82%',
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              marginTop: SIZES.base / 2,
              ...FONTS.h4,
              width: 120,
            }}
            numberOfLines={1} // Limit the text to one line
            ellipsizeMode="tail">
            {item.name}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo & Title */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: SIZES.padding,
        }}>
        <Image
          source={icons.logo}
          style={{
            width: 60,
            height: 60,
          }}
        />

        <Text style={{...FONTS.h2}}>Welcome to Travel Agency</Text>
      </View>

      {/* Banner */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.base,
          paddingHorizontal: SIZES.padding,
        }}>
        <Image
          source={images.skiVillaBanner}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 15,
          }}
        />
      </View>

      {/* Options */}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.base,
          }}>
          <OptionItem
            icon={icons.airplane}
            bgColor={['#46aeff', '#5884ff']}
            label="Flight"
            onPress={() => {
              console.log('Flight');
            }}
          />
          <OptionItem
            icon={icons.train}
            bgColor={['#fddf90', '#fcda13']}
            label="Train"
            onPress={() => {
              console.log('Train');
            }}
          />
          <OptionItem
            icon={icons.bus}
            bgColor={['#e973ad', '#da5df2']}
            label="Bus"
            onPress={() => {
              console.log('Bus');
            }}
          />
          <OptionItem
            icon={icons.taxi}
            bgColor={['#fcaba8', '#fe6bba']}
            label="Taxi"
            onPress={() => {
              console.log('Taxi');
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.base,
          }}>
          <OptionItem
            icon={icons.bed}
            bgColor={['#ffc465', '#ff9c5f']}
            label="Hotel"
            onPress={() => {
              console.log('Hotel');
            }}
          />
          <OptionItem
            icon={icons.eat}
            bgColor={['#7cf1fb', '#4ebefd']}
            label="Eats"
            onPress={() => {
              console.log('Eats');
            }}
          />
          <OptionItem
            icon={icons.compass}
            bgColor={['#7be993', '#46caaf']}
            label="Adventure"
            onPress={() => {
              console.log('Adventure');
            }}
          />
          <OptionItem
            icon={icons.event}
            bgColor={['#fca397', '#fc7b6c']}
            label="Event"
            onPress={() => {
              console.log('Event');
            }}
          />
        </View>
      </View>

      {/* Destination */}
      <View style={{flex: 1}}>
        <Text style={{...FONTS.h2, marginLeft: SIZES.padding}}>
          Destination
        </Text>
        {error === null ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataSource}
            keyExtractor={item => `${item.name}-${item.location.latitude}`}
            renderItem={({item, index}) => renderDestinations(item, index)}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...FONTS.h3, marginTop: SIZES.padding}}>
              No Destination at the moment
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Home;
