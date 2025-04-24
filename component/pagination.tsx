import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

type Prop = {
    items: {
        id: number;
        image: any;
    }[],
    paginationIndex: number;
    scrollX: Animated.SharedValue<number>;
};

const { width } = Dimensions.get("screen");


export default function Pagination({ items, paginationIndex, scrollX }: Prop) {
    return (
        <View style={styles.container}>

            {items.map((_, index) => {
                const pgAnimationStyle = useAnimatedStyle(() => {
                    const dotWidth = interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [8, 20, 8],
                        Extrapolation.CLAMP
                    )
                    return {
                        width: dotWidth
                    }
                })
                return (
                    <Animated.View
                        key={index}
                        style={[
                        styles.dot, 
                        pgAnimationStyle,
                        { backgroundColor: paginationIndex === index ? '#222' : '#fe9f00' }
                        ]}
                    />
                )
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: '#aaa',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        gap: 2,
        borderRadius: 8
    }
})