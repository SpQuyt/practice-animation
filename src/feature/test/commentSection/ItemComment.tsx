import React from 'react';
import { View } from 'react-native';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import { ItemCommentProps } from './CommentSectionView';

export const EDGE = 30;

export const renderColor = (name: string) => {
    if (name === 'Quoc') return 'yellow';
    if (name === 'Hieu') return 'red';
    if (name === 'Thuc') return 'blue';
    if (name === 'Khanh') return 'green';
    if (name === 'Dat') return 'purple';
    return 'black';
};

interface Props {
    item: ItemCommentProps;
    handlePressReply?(): void;
    level?: number;
}

const ItemComment = (props: Props) => {
    const { item, handlePressReply, level = 0 } = props;
    return (
        <View
            style={{
                marginBottom: 10,
                marginLeft: level * 20,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginLeft: 5 }}>
                <View
                    style={{
                        width: EDGE,
                        height: EDGE,
                        borderRadius: EDGE / 2,
                        backgroundColor: renderColor(item?.creatorName),
                    }}
                />
                <StyledText originValue={item?.creatorName} customStyle={{ marginLeft: 5 }} />
            </View>
            <View
                style={{
                    width: '100%',
                    backgroundColor: Themes.COLORS.captionText,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 50,
                }}
            >
                <StyledText originValue={item?.content} />
            </View>
            {level === 0 ? (
                <View style={{ width: '95%', alignItems: 'flex-end' }}>
                    <StyledTouchable onPress={handlePressReply} customStyle={{}}>
                        <StyledText i18nText="Reply" />
                    </StyledTouchable>
                </View>
            ) : null}
        </View>
    );
};

export default ItemComment;
