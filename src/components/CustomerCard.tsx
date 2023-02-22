import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import useCustomerOrders from '../../hooks/useCustomerOrders';
import {useTailwind} from 'tailwind-rn/dist';
import {useNavigation} from '@react-navigation/native';
import {CustomersScreenNavigationProp} from '../screens/CustomersScreen';
import {Card, Icon} from '@rneui/themed';

type CustomerCardProps = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({userId, name, email}: CustomerCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading, error, orders} = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderModal', {userId, name})}>
      <Card containerStyle={tw('p-5 rounded-lg')}>
        <View>
          <View style={tw('flex-row justify-between')}>
            <View>
              <Text style={tw('text-2xl font-bold')}>{name}</Text>
              <Text style={[tw('text-sm'), styles.primaryColor]}>
                ID: {userId}
              </Text>
            </View>

            <View style={tw('flex-row items-center justify-end')}>
              <Text style={styles.primaryColor}>
                {loading ? 'loading...' : `${orders.length} x`}
              </Text>
              <Icon
                style={tw('ml-auto')}
                name="box"
                type="entypo"
                color={'#59C1CC'}
                size={30}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({primaryColor: {color: '#59C1CC'}});
