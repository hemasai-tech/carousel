import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  State,
  FlingGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
import GmailLogin from '../login/GmailLogin';
const {width, height} = Dimensions.get('screen');

const images = [
  {
    title: 'img1',
    path: 'https://img.freepik.com/free-photo/vertical-shot-yellow-green-tree-near-water-with-sun-shining-mountain-distance_181624-2197.jpg?size=626&ext=jpg',
    date: '4th July',
    location: 'New York',
    finalDate: 'Oct 11',
  },
  {
    title: 'img2',
    path: 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
    date: '16th Aug',
    location: 'San Diego',
    finalDate: 'Nov 5',
  },
  {
    title: 'img3',
    path: 'https://fastly.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o',
    date: '27th Dec',
    location: 'France',
    finalDate: 'Sep 20',
  },
  {
    title: 'img4',
    path: 'https://images.pexels.com/photos/6797836/pexels-photo-6797836.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400',
    date: '16th Aug',
    location: 'Paris',
    finalDate: 'Nov 15',
  },
  {
    title: 'img5',
    path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy5vfsI7hjdVbpQsWSUihGk-fovIbwU4jEow&usqp=CAU',
    date: '10th Aug',
    location: 'Germany',
    finalDate: 'Dec 11',
  },
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival- path.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    path: 'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const SPACING = 10;
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = height / 2;

export default function Carousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(images);
  const [scrollIndex, setScrollIndex] = useState(0);

  const setAnimatedIndex = useCallback(i => {
    setIndex(i);
    scrollX.setValue(i);
    setScrollIndex(i); // Set the scrollIndex when the index changes.
  }, []);

  // interconnected animations aka reactive animations :D
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });

  return (
    <>
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              // setAnimatedIndex(0)
              return;
            }
            setAnimatedIndex(index + 1);
          }
        }}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={e => {
            if (e.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setAnimatedIndex(index - 1);
            }
          }}>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={data}
              keyExtractor={(_, index) => String(index)}
              scrollEnabled={false}
              renderToHardwareTextureAndroid
              removeClippedSubviews={false}
              contentContainerStyle={{
                flex: 1,
                marginTop: 30,
                padding: SPACING * 2,
              }}
              CellRendererComponent={({children, index, style, ...props}) => {
                const cellStyle = [style, {zIndex: data.length - index}];
                return (
                  <View style={cellStyle} index={index} {...props}>
                    {children}
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                const inputRange = [index - 1, index, index + 1];
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [-0.1, 0.2, -100],
                });

                const translateY = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0, 1.2, 0],
                });

                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                });
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1, 0.8, 1],
                });

                const zIndex = data.length - Math.abs(index - scrollIndex);

                return (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      width: ITEM_WIDTH,
                      top: -ITEM_HEIGHT / 2,
                      borderRadius: 10,
                      transform: [{translateX}, {translateY}, {scale}],
                      opacity,
                      zIndex,
                      marginTop: height / 6.5,
                      marginLeft: 20,
                      marginRight: 'auto',
                    }}>
                    <Image
                      source={{uri: item.path}}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                      }}
                    />
                  </Animated.View>
                );
              }}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
      <GmailLogin />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
});
