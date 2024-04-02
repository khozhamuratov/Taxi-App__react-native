import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const driverProfileData = {
  id: 5,
  fullName: 'Владимир Владимирович',
  carNumber: '95 G 411 GA',
  phoneNumber: '+998 91 303 71 13',
  passengers: 0,
  balance: 25000,
};

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Icon name="person-circle" size={90} color={'white'} />
        <View style={styles.userData}>
          <View>
            <Text style={styles.title}>{driverProfileData.fullName}</Text>
          </View>
          <Text style={styles.carNumber}>{driverProfileData.phoneNumber}</Text>
          <Text style={styles.carNumber}>{driverProfileData.carNumber}</Text>
        </View>
      </View>
      <ScrollView style={styles.itemsContainer}>
        <View style={styles.wrapper}>
          <View style={styles.balance}>
            <View style={styles.iconWrapper}>
              <Icon name="wallet" size={30} color="white" />
            </View>
            <Text style={styles.balanceTxt}>Баланс:</Text>
          </View>
          <Text style={styles.balanceNum}>
            {driverProfileData.balance.toLocaleString()} сум
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 50,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#414141',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carNumber: {
    fontSize: 12,
    color: '#CCC',
  },
  userInfo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  userData: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  balanceTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  balance: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  balanceNum: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },
  itemsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});

export default ProfilePage;
