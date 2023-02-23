import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {TabStackParamList} from '../navigator/TabNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigator/RootNavigator';
import {useTailwind} from 'tailwind-rn/dist';
import useOrders from '../../hooks/useOrders';
import {Button, Image} from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const tw = useTailwind();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading, error, orders} = useOrders();
  const [ascending, setAscending] = useState<Boolean>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({focused, color}) => {
        return (
          <Text style={{color: focused ? '#EB6A7c' : color, fontSize: 10}}>
            Orders
          </Text>
        );
      },
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: 'https://links.papareact.com/m51'}}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          color="pink"
          titleStyle={styles.btnTitle}
          style={tw('py-2 px-5')}
          onPress={() => setAscending(!ascending)}>
          {ascending ? 'Showing: Oldest First' : 'Showing: Most Recent First'}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map(order => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  btnTitle: {color: 'gray', fontWeight: '400'},
  container: {backgroundColor: '#EB6A7c'},
});
