import Metrics from 'assets/metrics';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomPicker from './CustomPicker';

const data = Array(10)
    .fill(0)
    .map((_, index) => ({
        value: index + 1,
        label: String(index + 1),
    }));

const CustomPickerView = () => {
    return (
        <SafeAreaView>
            <CustomPicker containerHeight={Metrics.screenHeight / 1.5} itemHeight={80} data={data} />
        </SafeAreaView>
    );
};

export default CustomPickerView;
