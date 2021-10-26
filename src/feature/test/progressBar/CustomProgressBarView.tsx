import React, { useState } from 'react';
import { View } from 'react-native';
import { StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import CustomProgressBar from './CustomProgressBar';

const CustomProgressBarView = () => {
    const [currentProgress, setCurrentProgress] = useState(0);

    const increaseWidth = () => {
        if (currentProgress <= 90) {
            setCurrentProgress(currentProgress + 10);
        }
    };

    const decreaseWidth = () => {
        if (currentProgress >= 10) {
            setCurrentProgress(currentProgress - 10);
        }
    };

    return (
        <View style={{ paddingTop: 100, flex: 1 }}>
            <View style={{ flexDirection: 'row', width: Metrics.screenWidth * 0.6, justifyContent: 'space-between' }}>
                <StyledTouchable onPress={decreaseWidth}>
                    <StyledText i18nText="Decrease" />
                </StyledTouchable>
                <StyledTouchable onPress={increaseWidth}>
                    <StyledText i18nText="Increase" />
                </StyledTouchable>
            </View>

            <CustomProgressBar containerWidth={350} currentPropsProgress={currentProgress} />
        </View>
    );
};

export default CustomProgressBarView;
