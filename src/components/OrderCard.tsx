import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Icon} from '@rneui/themed';
import {useTailwind} from 'tailwind-rn/dist';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabStackParamList} from '../navigator/TabNavigator';
import {RootStackParamList} from '../navigator/RootNavigator';

type OrderCardProp = {
  item: Order;
};

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderCard = ({item}: OrderCardProp) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Order', {order: item})}>
      <Card containerStyle={tw('px-5 rounded-lg')}>
        <View style={tw('flex-row justify-between items-center')}>
          <View>
            <Icon
              name="truck-delivery"
              color={'#EB6A7c'}
              type="material-community"
            />
            <Text style={styles.font10}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          <View>
            <Text style={[tw('text-gray-400'), styles.font10]}>
              {item.carrier}-{item.trackingId}
            </Text>
            <Text style={tw('text-gray-500 text-xl')}>
              {item.trackingItems.customer.name}
            </Text>
          </View>

          <View style={tw('flex-row items-center')}>
            <Text style={[tw('text-sm'), styles.colorPink]}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon name="box" style={tw('ml-2')} type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  font10: {fontSize: 10},
  colorPink: {color: '#EB6A7c'},
});
