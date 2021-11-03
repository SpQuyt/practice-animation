import React, { useEffect, useRef, useState } from 'react';
import { View, Keyboard } from 'react-native';
import { Themes } from 'assets/themes';
import { StyledInput, StyledList, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import ItemComment, { EDGE, renderColor } from './ItemComment';

const currentUserObject = {
    id: 1,
    name: 'Quoc',
};

const fakeData = [
    {
        id: 1,
        creatorName: 'Quoc',
        creatorId: 1,
        content:
            'Test 1 aisudhaisudhiasudhaisudhaisudhaisuhdaisudhiausdhiaushdaisudhiausdhaiusdhaiushdiaushdiuahsdiauhsdiuahsdiuashdiuahsdiuahsdi',
        children: [],
    },
    {
        id: 2,
        creatorName: 'Hieu',
        creatorId: 2,
        content: 'Test 2 asda sdasdasd asda sdasd asdasd asd asd asd asd asd ',
        children: [],
    },
    {
        id: 3,
        creatorName: 'Thuc',
        creatorId: 3,
        content: 'Test 3asdqweqwe qwe qwe qw edasd ase qwe da dfsf arwae fadsf asedf asdf asdf awer ',
        children: [],
    },
];

export interface ItemCommentProps {
    id: number;
    creatorName: string;
    creatorId: number;
    content: string;
    children?: Array<ItemCommentProps>;
}

const CommentSectionView = () => {
    const [currentCommentToReply, setCurrentCommentToReply] = useState<ItemCommentProps | undefined>(undefined);
    const [comment, setComment] = useState('');
    const [list, setList] = useState<any>(fakeData);
    // const [currentListInputValue, setCurrentListInputValue] = useState<Array<string>>([]);
    // const elementsRef = useRef(list.map(() => createRef()));
    const [currentMaxId, setCurrentMaxId] = useState(0);
    const commentInputRef = useRef();

    const getMaxIdFromList = (curList: Array<any>) => {
        let curMaxId = -999;
        curList?.forEach((curItem) => {
            if (curItem?.id > curMaxId) {
                curMaxId = curItem?.id;
            }
        });
        return curMaxId;
    };

    useEffect(() => {
        // const newListInputValue = list.map(() => {
        //     // return {
        //     //     text: '',
        //     //     ref: undefined,
        //     // };
        //     return '';
        // });
        // setCurrentListInputValue(newListInputValue);
        setCurrentMaxId(getMaxIdFromList(list) + 1);
    }, [list]);

    const listRef = useRef<any>();
    const handleAddCommentAndReply = () => {
        let newList = [];
        if (currentCommentToReply) {
            newList = list.map((listItem: ItemCommentProps) => {
                if (listItem?.id === currentCommentToReply?.id) {
                    return {
                        ...listItem,
                        children: [
                            ...(listItem?.children as any),
                            {
                                id: currentMaxId,
                                creatorName: currentUserObject?.name,
                                creatorId: currentUserObject?.id,
                                content: comment,
                            },
                        ],
                    };
                }
                return listItem;
            });
        } else {
            newList = [
                {
                    id: currentMaxId,
                    creatorName: currentUserObject?.name,
                    creatorId: currentUserObject?.id,
                    content: comment,
                    children: [],
                },
                ...list,
            ];
        }
        setList(newList);
        setComment('');
        setCurrentCommentToReply(undefined);
        Keyboard.dismiss();
    };

    // const handleAddReply = (item: ItemCommentProps) => {
    //     const newList = list.map((listItem: ItemCommentProps) => {
    //         if (listItem?.id === item?.id) {
    //             return {
    //                 ...listItem,
    //                 children: [
    //                     ...listItem?.children,
    //                     {
    //                         id: currentMaxId,
    //                         creatorName: currentUserObject?.name,
    //                         creatorId: currentUserObject?.id,
    //                         content: currentListInputValue?.[list?.indexOf(item)],
    //                     },
    //                 ],
    //             };
    //         }
    //         return listItem;
    //     });
    //     setList(newList);
    //     setComment('');
    //     setCurrentCommentToReply(undefined);
    //     const newListInputValue = currentListInputValue.map(() => {
    //         return '';
    //     });
    //     setCurrentListInputValue(newListInputValue);
    //     Keyboard.dismiss();
    // };

    const renderItem = ({ item }: any) => {
        const handlePressReply = () => {
            (commentInputRef?.current as any)?.focus();
            listRef?.current?.scrollToIndex({ index: list?.indexOf(item) });
            setCurrentCommentToReply(item);
            setComment(`@${item?.creatorName} `);
        };
        return item?.children?.length === 0 ? (
            <ItemComment item={item} handlePressReply={handlePressReply} />
        ) : (
            <View style={{ marginBottom: 10 }}>
                <ItemComment item={item} handlePressReply={handlePressReply} />
                {item?.children?.map((itemChildren: any, indexChildren: number) => {
                    return <ItemComment level={1} key={`${item?.id}-reply-${indexChildren}`} item={itemChildren} />;
                })}
                {item?.children?.length > 0 ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '85%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 15,
                            marginTop: 10,
                        }}
                    >
                        <View
                            style={{
                                width: EDGE,
                                height: EDGE,
                                borderRadius: EDGE / 2,
                                backgroundColor: renderColor(currentUserObject?.name),
                            }}
                        />
                        <StyledTouchable
                            customStyle={{
                                marginLeft: 8,
                                borderRadius: 20,
                                padding: 20,
                                width: '100%',
                                backgroundColor: Themes.COLORS.secondary,
                            }}
                            activeOpacity={1}
                            onPress={handlePressReply}
                        />
                    </View>
                ) : null}
            </View>
        );
    };

    return (
        <KeyboardAwareView
            style={{ flex: 1, paddingHorizontal: 10 }}
            keyboardShouldPersistTaps="handled"
            animated={true}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <StyledList
                        ref={listRef}
                        data={list}
                        renderItem={renderItem}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
                        keyExtractor={(item: any, index: number) => `${item?.id}-${index}`}
                        noDataText={' '}
                    />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: 'white',
                    }}
                >
                    <StyledInput
                        ref={commentInputRef}
                        value={comment}
                        onChangeText={setComment}
                        customStyle={{ width: Metrics.screenWidth * 0.8 }}
                    />
                    <StyledTouchable onPress={handleAddCommentAndReply}>
                        <StyledText originValue="SEND" />
                    </StyledTouchable>
                </View>
            </SafeAreaView>
        </KeyboardAwareView>
    );
};

export default CommentSectionView;
