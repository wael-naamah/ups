import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigator/RootNavigator';
import {TabStackParamList} from '../navigator/TabNavigator';
import {Icon} from '@rneui/themed';
import useCustomerOrders from '../../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

type OrderModalNavigtionProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'OrderModal'>
>;

type OrderModalRouteProp = RouteProp<RootStackParamList, 'OrderModal'>;

const OrderModal = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderModalNavigtionProp>();
  const {
    params: {name, userId},
  } = useRoute<OrderModalRouteProp>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading, error, orders} = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={tw('absolute right-5 top-5 z-10')}>
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={tw('mt-10')}>
        <View style={[tw('py-5 border-b'), styles.primaryColor]}>
          <Text
            style={[tw('text-center text-xl font-bold'), styles.primaryColor]}>
            {name}
          </Text>
          <Text style={tw('text-center italic text-sm')}>deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={tw('pb-48')}
        data={orders}
        keyExtractor={order => order.trackingId}
        renderItem={({item: order}) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default OrderModal;

const styles = StyleSheet.create({primaryColor: {color: '#59C1CC'}});
