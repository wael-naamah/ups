import React, {useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomersScreen from '../screens/CustomersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

type TabIconProps = {
  route: RouteProp<any, string>;
  focused: Boolean;
  color?: string;
  size?: number;
};

const TabIcon = ({route, focused}: TabIconProps) => {
  if (route.name === 'Customers') {
    return (
      <Icon name="users" type="entypo" color={focused ? '#59C1CC' : 'gray'} />
    );
  } else if (route.name === 'Orders') {
    return (
      <Icon name="box" type="entypo" color={focused ? '#EB6A7c' : 'gray'} />
    );
  } else {
    return (
      <Icon name="home" type="entypo" color={focused ? '#59C1CC' : 'gray'} />
    );
  }
};
export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#59C1CC',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => (
          <TabIcon route={route} focused={focused} color={color} size={size} />
        ),
      })}>
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
