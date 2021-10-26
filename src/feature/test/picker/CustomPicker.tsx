/* eslint-disable no-underscore-dangle */
import React, { ReactNode, useRef, useState } from 'react';
import { View, StyleProp, ViewStyle, Animated, ScrollView } from 'react-native';
import { Themes } from 'assets/themes';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import Images from 'assets/images';
import { isIos } from 'utilities/helper';

export interface ItemComponentProps {
    index: number;
    currentIndex: number;
}

interface Props {
    data: Array<any>;
    containerHeight?: number;
    itemHeight?: number;
    customContainerStyle?: StyleProp<ViewStyle>;
    customChooseStyle?: StyleProp<ViewStyle>;
    customItemStyle?: StyleProp<ViewStyle>;
    ItemComponent?: ReactNode;
    activeColor?: string;
    inactiveColor?: string;
}

const CustomPicker = (props: Props) => {
    const {
        data,
        containerHeight = Metrics.screenHeight / 3,
        itemHeight = 40,
        customContainerStyle = {},
        customChooseStyle = {},
        customItemStyle = {},
        ItemComponent = null,
        activeColor = Themes.COLORS.blue,
        inactiveColor = Themes.COLORS.grey,
    } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef();
    const numsOfVisibleItems = Math.floor(containerHeight / itemHeight);

    return (
        <View style={[styles.container, customContainerStyle, { height: containerHeight }]}>
            <View
                style={[
                    styles.contChoose,
                    customChooseStyle,
                    { height: itemHeight, top: containerHeight / 2 - itemHeight / 2 },
                ]}
                pointerEvents="none"
            />
            <ScrollView
                ref={scrollViewRef as any}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: containerHeight / 2 - itemHeight / 2,
                    paddingBottom: containerHeight / 2 - itemHeight / 2,
                }}
                scrollEventThrottle={16}
                snapToInterval={itemHeight}
                decelerationRate="fast"
                onScroll={(event) => {
                    setCurrentIndex(Math.round(event?.nativeEvent?.contentOffset?.y / itemHeight));
                }}
                scrollEnabled={true}
            >
                {data.map((item, index) => {
                    let rotationDegree = new Animated.Value(0);
                    if (
                        currentIndex + Math.floor(numsOfVisibleItems / 2) <= index ||
                        currentIndex - Math.floor(numsOfVisibleItems / 2) >= index
                    ) {
                        rotationDegree = new Animated.Value(Math.PI / 4);
                    }
                    // Nếu có itemComponent thì height của itemComponent phải = itemHeight
                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.contItemView,
                                customItemStyle,
                                { height: itemHeight },
                                {
                                    transform: [
                                        { rotateX: isIos ? rotationDegree : `${(rotationDegree as any)._value}deg` },
                                    ],
                                },
                            ]}
                        >
                            {ItemComponent ? (
                                <ItemComponent index={index} currentIndex={currentIndex} />
                            ) : (
                                <StyledTouchable
                                    customStyle={styles.contItemButton}
                                    onPress={() => console.log('Hello')}
                                    disabled={index !== currentIndex}
                                >
                                    <StyledIcon
                                        source={Images.icons.radio.check}
                                        size={20}
                                        customStyle={{
                                            tintColor: index === currentIndex ? activeColor : inactiveColor,
                                        }}
                                    />
                                    <StyledText
                                        originValue={item?.label || ''}
                                        customStyle={{
                                            color: index === currentIndex ? activeColor : inactiveColor,
                                            marginLeft: 10,
                                        }}
                                    />
                                </StyledTouchable>
                            )}
                        </Animated.View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        borderWidth: 1,
    },
    contChoose: {
        position: 'absolute',
        width: Metrics.screenWidth,
        backgroundColor: 'green',
        zIndex: 1,
        opacity: 0.3,
    },
    contItemView: {
        width: Metrics.screenWidth * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contItemButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: Metrics.screenWidth,
    },
});
export default CustomPicker;
