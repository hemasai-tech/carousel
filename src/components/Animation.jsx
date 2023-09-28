import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = SCREEN_WIDTH - 40; // Adjust the width with gaps on both sides
const IMAGE_WIDTH = ITEM_WIDTH - 40; // Adjusted image width with space around it

const Animation = props => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [scrollIndex,setScrollIndex] = useState(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = new Animated.Value(0);
  const flatListRef = useRef(null);

  // Function to calculate the currently visible item index
  const calculateVisibleItemIndex = offsetX => {
    return Math.round(offsetX / ITEM_WIDTH);
  };

  // Function to update the zoom value based on the visible item
  const updateZoomValue = () => {
    const visibleIndex = calculateVisibleItemIndex(scrollX._value);
    setSelectedItemIndex(visibleIndex);
  };

  // Listen to scrollX changes and update zoom value
  useEffect(() => {
    updateZoomValue();
  }, [scrollX]);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const newIndex = Math.round(value / ITEM_WIDTH);
      setScrollIndex(newIndex);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const imageArr = [
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
  ];

  const scrollToItem = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index,
        viewPosition: 0.5, // Center the item
      });
    }
  };

  const renderImage = ({item, index}) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    });
    const zoom = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4], // Adjust the zoom levels as needed
    });

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [200, 0, -200],
    });

    return (
      <View>
        <View
          style={{
            marginHorizontal:
              show && selectedItemIndex === index ? 0 : SCREEN_WIDTH * 0.1,
          }}>
          <View
            style={{
              display: !show || selectedItemIndex !== index ? 'flex' : 'none',
            }}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.finalDate}>{item.finalDate}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedItemIndex(index);
              setShow(!show);
              scrollToItem(index); // Scroll to the selected item
            }}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              transform: [{scale: zoom}], // Apply the zoom transform
              opacity: opacity,
            }}
            activeOpacity={1} // Prevent the touch effect
          >
            <View>
              <Image
                source={{uri: item.path}}
                style={[
                  styles.image,
                  {
                    borderRadius: show && selectedItemIndex === index ? 0 : 20,
                    width:
                      show && selectedItemIndex === index
                        ? SCREEN_WIDTH
                        : SCREEN_WIDTH * 0.7,
                    height: 500,
                    resizeMode:
                      show && selectedItemIndex === index ? 'cover' : 'stretch',
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
        {show && selectedItemIndex === index ? (
          <View style={{margin: 20}}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={{fontSize: 15, color: '#000', fontWeight: '800'}}>
              {item.finalDate}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: show ? 0 : SCREEN_HEIGHT / 38,
          marginLeft: show ? 0 : SCREEN_WIDTH / 23,
          marginRight: show ? 0 : SCREEN_WIDTH / 20,
        },
      ]}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.FlatList
          ref={flatListRef}
          data={imageArr}
          renderItem={({item, index}) => renderImage({item, index})}
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={() => {
            // Center the selected item when scrolling ends
            flatListRef.current.scrollToIndex({
              animated: true,
              index: scrollIndex,
              viewPosition: 0.5,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  date: {
    fontWeight: 'bold',
    fontSize: 40,
    letterSpacing: 2,
    color: '#000',
  },
  location: {
    fontSize: 25,
    color: '#000',
  },
  finalDate: {
    marginLeft: 'auto',
    fontSize: 20,
    color: '#000',
  },
});

export default Animation;
