/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';
import { useAppSelector } from 'app-redux/hooks';
import { isIos } from 'utilities/helper';
import CustomPickerView from 'feature/test/picker/CustomPickerView';
import CustomProgressBarView from 'feature/test/progressBar/CustomProgressBarView';
import CommentSectionView from 'feature/test/commentSection/CommentSectionView';
import { APP_ROUTE } from '../config/routes';
import navigationConfigs from '../config/options';
import MainTabContainer from './TabScenes';
import AuthStack from './AuthScenes';

const MainStack = createStackNavigator();

const AppStack = () => (
    <Host>
        <MainStack.Navigator keyboardHandlingEnabled={isIos} headerMode={'none'} screenOptions={navigationConfigs}>
            {/* <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} /> */}
            {/* <MainStack.Screen name={'CUSTOM_PICKER'} component={CustomPickerView} /> */}
            {/* <MainStack.Screen name={'CUSTOM_PROGRESS_BAR'} component={CustomProgressBarView} /> */}
            <MainStack.Screen name={'COMMENT_SECTION'} component={CommentSectionView} />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    const { token } = useAppSelector((state) => state.userInfo);
    // if (token) {
    //     return <AppStack />;
    // }
    // return <AuthStack />;
    return <AppStack />;
};

export default Navigation;
