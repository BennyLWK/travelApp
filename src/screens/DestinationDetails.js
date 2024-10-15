import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const DestinationDetails = ({navigation, route}) => {
  const {item} = route.params;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial position is off-screen

  // Start zoom-in animation
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1, // Final scale
      duration: 500, // Duration of the animation
      useNativeDriver: true,
    }).start();
    startAnimations();
  }, []);

  // Function to start the animations
  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade to full opacity
        duration: 1000, // Duration of the fade-in effect
        useNativeDriver: true, // Use native driver for performance
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to original position
        duration: 1000, // Duration of the slide-in effect
        useNativeDriver: true, // Use native driver for performance
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{flex: 2}}>
        <Animated.Image
          source={{
            uri: item.image,
          }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '80%',
            transform: [{scale: scaleAnim}],
          }}
        />
        <View
          style={[
            {
              position: 'absolute',
              bottom: '5%',
              left: '5%',
              right: '5%',
              borderRadius: 15,
              padding: SIZES.padding,
              backgroundColor: COLORS.white,
            },
            styles.shadow,
          ]}>
          <Animated.View
            style={{
              flexDirection: 'row',
              opacity: fadeAnim, // Set the opacity for fade-in
              transform: [{translateY: slideAnim}],
            }}>
            <View style={styles.shadow}>
              <Image
                source={icons.airplane}
                resizeMode="cover"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 15,
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                }}>
                {item.name}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Header Buttons */}
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            right: 20,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={icons.back}
                resizeMode="cover"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Body */}
      <View style={{flex: 1.5}}>
        {/* Description */}
        <View
          style={{marginTop: SIZES.radius, paddingHorizontal: SIZES.padding}}>
          <Text style={{...FONTS.h2}}>About</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}>
            {item.description}
          </Text>
        </View>
        <View
          style={{marginTop: SIZES.radius, paddingHorizontal: SIZES.padding}}>
          <Text style={{...FONTS.h2}}>Suggested Travel Dates</Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.gray,
              ...FONTS.body3,
            }}>
            {item.suggestedTravelDates.join(' to ')}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={{flex: 0.5, paddingHorizontal: SIZES.padding}}>
        <LinearGradient
          style={[{height: 70, width: '100%', borderRadius: 15}]}
          colors={['#edf0fc', '#d6dfff']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 1,
                marginHorizontal: SIZES.padding,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.h4}}>Add travel event to calendar</Text>
            </View>

            <TouchableOpacity
              style={{
                width: 130,
                height: '80%',
                marginHorizontal: SIZES.radius,
              }}
              onPress={() => {
                console.log('Booking on pressed');
              }}>
              <LinearGradient
                style={[
                  {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  },
                ]}
                colors={['#46aeff', '#5884ff']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={{color: COLORS.white, ...FONTS.h2}}>BOOKING</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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

export default DestinationDetails;
