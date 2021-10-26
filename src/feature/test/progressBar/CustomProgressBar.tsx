import React, { useEffect, useRef, useState } from 'react';
import { View, StyleProp, ViewStyle, Animated } from 'react-native';
import Metrics from 'assets/metrics';

interface Props {
    containerWidth?: number;
    currentPropsProgress?: number;
    containerStyle?: StyleProp<ViewStyle>;
}

const CustomProgressBar = (props: Props) => {
    const { currentPropsProgress, containerStyle, containerWidth = Metrics.screenWidth } = props;
    const [currentStateProgress, setCurrentPropsProgress] = useState(currentPropsProgress);
    const widthAnim = useRef(new Animated.Value((containerWidth * (currentStateProgress || 0)) / 100))?.current;

    useEffect(() => {
        if (currentStateProgress !== currentPropsProgress) {
            Animated.timing(widthAnim, {
                toValue: (containerWidth * (currentPropsProgress || 0)) / 100,
                duration: 500,
                useNativeDriver: false,
            }).start();
            setCurrentPropsProgress(currentPropsProgress);
        }
    }, [currentPropsProgress]);

    return (
        <View style={[{ width: containerWidth, height: 30, backgroundColor: 'grey' }, containerStyle]}>
            <Animated.View style={{ width: widthAnim, height: 30, backgroundColor: 'red' }} />
        </View>
    );
};

export default CustomProgressBar;
