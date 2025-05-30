// import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import Animated, {
//     Extrapolation,
//   interpolate,
//   useAnimatedStyle,
// } from 'react-native-reanimated';

// type Props = {
//   item: {
//     id: number;
//     image: any;
//   };
//   index: number;
//   scrollX: Animated.SharedValue<number>;
// };
// const { width } = Dimensions.get('window');

// const ITEM_WIDTH = width * 0.85;
// const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

// const CarouselItem = ({ item, index, scrollX }: Props) => {
//   const rnStyle = useAnimatedStyle(() => {
//     return {
//       //get the previous and next item on the view of the active item, only a little bit
//       transform: [
//         {
//           translateX: interpolate(
//             scrollX.value,
//             [(index - 1) * width, index * width, (index + 1) * width],
//             [-width * 0.25, 0, width * 0.25],
//             Extrapolation.CLAMP
//           ),
//         },
//         {
//           scale: interpolate(
//             scrollX.value,
//             [(index - 1) * width, index * width, (index + 1) * width],
//             [0.9, 1, 0.9],
//             Extrapolation.CLAMP
//           ),
//         },
//       ],
//     };
//   });
//   return (
//     <Animated.View
//       style={[
//         { width: width, height: 285, justifyContent: 'center', alignItems: 'center',  gap: 20 },
//         rnStyle,
//       ]}
//       key={item.id}
//     >
//       <Image
//         source={item.image}
//         style={{
//           width: 300,
//           height: 300,
//         }}
//         resizeMode="cover"
//       />
//     </Animated.View>
//   );
// };

// export default CarouselItem;

// const styles = StyleSheet.create({});


import { Dimensions, Image, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.7; // Image width is 70% of the screen width
const ITEM_SPACING = (width - ITEM_WIDTH) / 2; // Space for next image to peek

type Props = {
  item: {
    id: number;
    image: any;
  };
  index: number;
  scrollX: Animated.SharedValue<number>;
};

const CarouselItem = ({ item, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-ITEM_WIDTH * 0.25, 0, ITEM_WIDTH * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.container, rnStyle]}
      key={item.id}
    >
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,   // Ensure the width is 70% of the screen width
    height: 285,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ITEM_SPACING, // This spacing will show the next image
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '80%',
    height: '100%',
  },
});

