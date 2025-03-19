import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { ChevronRight, Heart, ArrowLeft } from 'react-native-feather';
import Svg, { Path } from 'react-native-svg';

const Home = () => {
  const [sliderPosition, setSliderPosition] = useState(100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Main Content Container */}
      <View style={styles.container}>
        {/* Main content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>
            Speak{'\n'}
            With{'\n'}
            Confidence
          </Text>

          {/* Slider */}
          <View style={styles.sliderContainer}>
            <View 
              style={[
                styles.sliderHandle, 
                { transform: [{ translateX: sliderPosition > 100 ? 0 : -sliderPosition }] }
              ]}
            >
              <View style={styles.sliderDot}></View>
            </View>
          </View>

          {/* Heart icon */}
          <View style={styles.heartContainer}>
            <Heart style={styles.heartIcon} fill="black" />
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {/* Red star */}
            <View style={styles.redStarContainer}>
              <Svg viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="#FF5252"
                />
              </Svg>
            </View>

            {/* Character in bubble */}
            <View style={styles.bubbleContainer}>
              {/* Bubble */}
              <View style={styles.bubble}></View>

              {/* Sparkles */}
              <View style={styles.sparkleTopRight}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2L12.7608 9.23915L20 10L12.7608 10.7608L12 18L11.2392 10.7608L4 10L11.2392 9.23915L12 2Z"
                    stroke="black"
                    strokeWidth="1"
                  />
                </Svg>
              </View>
              <View style={styles.sparkleRight}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2L12.7608 9.23915L20 10L12.7608 10.7608L12 18L11.2392 10.7608L4 10L11.2392 9.23915L12 2Z"
                    stroke="black"
                    strokeWidth="1"
                  />
                </Svg>
              </View>

              {/* Character */}
              <View style={styles.character}>
                <View style={styles.characterContent}>
                  {/* Eyes */}
                  <View style={styles.eyes}>
                    <View style={styles.eye}></View>
                    <View style={styles.eye}></View>
                  </View>

                  {/* Hair */}
                  <View style={styles.hairContainer}>
                    <View style={styles.hairStrand}></View>
                    <View style={styles.hairStrand}></View>
                    <View style={styles.hairStrand}></View>
                  </View>

                  {/* Desk */}
                  <View style={styles.desk}></View>

                  {/* Phone in hand */}
                  <View style={styles.phone}></View>
                </View>
              </View>

              {/* Yellow drip */}
              <View style={styles.yellowDripContainer}>
                <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
                    fill="#EAB308"
                  />
                  <Path d="M12 22C10 24 8 26 6 26C4 26 2 24 4 22C6 20 8 22 12 22Z" fill="#EAB308" />
                </Svg>
              </View>
            </View>
          </View>
        </View>

        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          <View style={styles.paginationActiveDot}></View>
          <View style={styles.paginationDot}></View>
          <View style={styles.paginationDot}></View>
        </View>

        {/* Get Started button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
            <ChevronRight style={styles.buttonIcon} stroke="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  backIcon: {
    marginRight: 16,
    width: 24,
    height: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAB308', // Yellow background
    borderRadius: 24,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    flexDirection: 'column',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 40,
    color: 'black',
  },
  sliderContainer: {
    position: 'relative',
    marginTop: 16,
    height: 32,
    width: 192,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  sliderHandle: {
    position: 'absolute',
    right: 0,
    height: 32,
    width: 32,
    backgroundColor: '#F97316', // orange-500
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderDot: {
    width: 4,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  heartContainer: {
    alignSelf: 'flex-end',
    marginRight: 32,
    marginTop: 8,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  illustrationContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redStarContainer: {
    position: 'absolute',
    left: 0,
    top: '25%',
    width: 48,
    height: 48,
  },
  bubbleContainer: {
    position: 'relative',
    width: 192,
    height: 192,
  },
  bubble: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 96,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  sparkleTopRight: {
    position: 'absolute',
    right: -16,
    top: -16,
  },
  sparkleRight: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  character: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: 96,
    height: 96,
    backgroundColor: 'white',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterContent: {
    position: 'relative',
  },
  eyes: {
    flexDirection: 'row',
    gap: 4,
  },
  eye: {
    width: 16,
    height: 16,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  hairContainer: {
    position: 'absolute',
    top: -24,
    left: '50%',
    width: 40,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    transform: [{ translateX: -20 }],
  },
  hairStrand: {
    width: 4,
    height: 24,
    backgroundColor: 'black',
    borderRadius: 2,
    marginHorizontal: 2,
  },
  desk: {
    position: 'absolute',
    top: 32,
    left: '50%',
    width: 128,
    height: 16,
    backgroundColor: 'black',
    transform: [{ translateX: -64 }],
  },
  phone: {
    position: 'absolute',
    top: 24,
    right: 0,
    width: 8,
    height: 16,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  yellowDripContainer: {
    position: 'absolute',
    bottom: -32,
    left: '50%',
    transform: [{ translateX: -24 }],
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  paginationActiveDot: {
    width: 24,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  paginationDot: {
    width: 4,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 2,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
});

export default Home;