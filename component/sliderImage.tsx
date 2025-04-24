// import { StatusBar } from 'expo-status-bar';
// import { Dimensions, Image, StyleSheet, Text, View, ViewToken } from 'react-native';
// import Animated, {
//     useAnimatedScrollHandler,
//     useScrollViewOffset,
//     useSharedValue,
// } from 'react-native-reanimated';
// import { carousel } from "@/data/carousel";
// import CarouselItem from './carouselItem';
// import { useRef, useState } from 'react';
// import Pagination from './pagination';

// const { width } = Dimensions.get("window");

// type Props = {
//     item: {
//         id: number;
//         image: any;
//     };
//     index: number;
//     scrollX: Animated.SharedValue<number>;
// };


// export default function SliderImage() {
//     const [isPagination, setIsPagination] = useState(0)
//     const scrollX = useSharedValue(0);
//     const onScrollHandler = useAnimatedScrollHandler((event) => {
//         scrollX.value = event.contentOffset.x;
//     });

//     const ITEM_WIDTH = width * 0.8;
//     const ITEM_SPACING = (width - ITEM_WIDTH) / 2;


//     const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
//         if (viewableItems.length > 0 && viewableItems[0] && viewableItems[0].index !== null) {
//             const index = viewableItems[0].index;
//             setIsPagination(index);
//         } else {
//             console.log('No viewable items found');
//         }
//     };

//     const viewabilityConfig = {
//         itemVisiblePercentThreshold: 50
//     };
//     const viewabilityConfigCallbackPairs = useRef([
//         { viewabilityConfig, onViewableItemsChanged }
//     ])

//     return (
//         <View style={styles.container}>
//             <StatusBar style="auto" />
//             <Animated.FlatList

// data={carousel}
// keyExtractor={(item) => item.id.toString()}
// renderItem={({ item, index }) => (
//   <CarouselItem item={item} index={index} scrollX={scrollX} />
// )}
// horizontal
// showsHorizontalScrollIndicator={false}
// snapToInterval={ITEM_WIDTH}
// decelerationRate="fast"
// bounces={false}
// pagingEnabled={false}
// scrollEventThrottle={16}
// onScroll={onScrollHandler}
// viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
// contentContainerStyle={{
//   paddingHorizontal: ITEM_SPACING, // makes the next slide peek in
// }}
// snapToAlignment="start"
//             // contentContainerStyle={{  height: 285,
//             //     alignItems: "center",
//             //     paddingHorizontal: ITEM_SPACING, // Add padding to peek sides
//             //     marginBottom: 10,
//             //  }}
//             // decelerationRate="fast" // Smooth scrolling
//             // // snapToInterval={width} // Ensures snapping
//             // snapToAlignment="center"
//             // horizontal
//             // snapToInterval={ITEM_WIDTH + 20} // add marginHorizontal spacing
//             // showsHorizontalScrollIndicator={false}
//             // onScroll={onScrollHandler}
//             // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
//             // data={carousel}
//             // keyExtractor={(item) => item.id.toString()}
//             // pagingEnabled={false}
//             // renderItem={({ item, index }) => {
//             //     return <CarouselItem item={item} index={index} scrollX={scrollX} />;
//             // }}
//             />
//             <Pagination items={carousel} scrollX={scrollX} paginationIndex={isPagination} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         // justifyContent: "center"
//         // backgroundColor: '#fff',
//         // marginTop: 80,
//     },
// });


import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, View, ViewToken } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { carousel } from "@/data/carousel"; // Your data
import { useRef, useState } from 'react';
import Pagination from './pagination';
import CarouselItem from './carouselItem';

const { width } = Dimensions.get("window");

// Adjust image and spacing
const ITEM_WIDTH = width * 0.7; // Image width is 70% of the screen width
const ITEM_SPACING = (width - ITEM_WIDTH) / 2; // Space for next image to peek

export default function SliderImage() {
  const [isPagination, setIsPagination] = useState(0);
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  // Adjust ITEM_WIDTH to control how much of the next image is visible
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0] && viewableItems[0].index !== null) {
      const index = viewableItems[0].index;
      setIsPagination(index);
    } else {
      console.log('No viewable items found');
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.FlatList
        data={carousel}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH} // Ensures snapping to exact image width
        decelerationRate="fast" // Faster scrolling to make it smoother
        bounces={false} // Disable bounce effect for smoothness
        pagingEnabled={false} // Disable paging to allow custom animation
        scrollEventThrottle={16} // Update scroll position more frequently
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentContainerStyle={{
          paddingHorizontal: ITEM_SPACING, // Space for next image to peek
        }}
        snapToAlignment="center" // Ensures each image stays centered when scrolling
      />
      <Pagination items={carousel} scrollX={scrollX} paginationIndex={isPagination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center the images in the container
  },
});
