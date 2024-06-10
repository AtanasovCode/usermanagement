import React, { useState } from 'react';
import { View, Animated, Easing } from 'react-native';

const Loader = () => {
  const [rotateOne] = useState(new Animated.Value(0));
  const [rotateTwo] = useState(new Animated.Value(0));
  const [rotateThree] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(rotateOne, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }),
      Animated.timing(rotateTwo, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }),
      Animated.timing(rotateThree, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }),
    ]).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C262B',
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: '#3C4B57',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: 32,
            transform: [
              {
                rotateX: '35deg',
                rotateY: '-45deg',
              },
              {
                rotateZ: rotateOne.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: 32,
              borderStyle: 'solid',
              borderColor: '#EFEFFA',
              borderWidth: 3,
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: 32,
            transform: [
              {
                rotateX: '50deg',
                rotateY: '10deg',
              },
              {
                rotateZ: rotateTwo.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: 32,
              borderStyle: 'solid',
              borderColor: '#EFEFFA',
              borderWidth: 3,
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            borderRadius: 32,
            transform: [
              {
                rotateX: '35deg',
                rotateY: '55deg',
              },
              {
                rotateZ: rotateThree.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              borderRadius: 32,
              borderStyle: 'solid',
              borderColor: '#EFEFFA',
              borderWidth: 3,
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Loader;
