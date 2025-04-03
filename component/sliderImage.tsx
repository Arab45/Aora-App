import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, Text, View, ViewToken } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useScrollViewOffset,
    useSharedValue,
} from 'react-native-reanimated';
import { carousel } from "@/data/carousel";
import CarouselItem from './carouselItem';
import { useRef, useState } from 'react';
import Pagination from './pagination';

const { width } = Dimensions.get("window");

type Props = {
  item: {
    id: number;
    image: any;
  };
  index: number;
  scrollX: Animated.SharedValue<number>;
};

export default function SliderImage() {
    const [isPagination, setIsPagination] = useState(0)
    const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    // const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
    //     console.log(viewableItems[0].index, 'this is what i get');
    //     if(viewableItems.length > 0 && viewableItems[0].index !== null ){
    //         const index = viewableItems[0].index;
    //         console.log('my index number', index);
    //         setIsPagination(index);  
    //     }
    // }

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0] && viewableItems[0].index !== null) {
            const index = viewableItems[0].index;
            setIsPagination(index);  
        } else {
            console.log('No viewable items found');
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };
    const viewabilityConfigCallbackPairs = useRef([
        {viewabilityConfig, onViewableItemsChanged}
    ])

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Animated.FlatList
                contentContainerStyle={{ height: 285, alignItems: "center", borderRadius: 10, marginBottom: 10 }}
                decelerationRate="fast" // Smooth scrolling
                snapToInterval={width} // Ensures snapping
                snapToAlignment="center"
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={onScrollHandler}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                data={carousel}
                keyExtractor={(item) => item.id.toString()}
                pagingEnabled
                renderItem={({ item, index }) => {
                    return <CarouselItem item={item} index={index} scrollX={scrollX} />;
                }}
            />
            <Pagination items={carousel} scrollX={scrollX} paginationIndex={isPagination} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center"
        // backgroundColor: '#fff',
        // marginTop: 80,
    },
});