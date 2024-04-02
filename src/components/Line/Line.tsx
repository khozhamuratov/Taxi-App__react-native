import React from 'react';
import {StyleSheet, View} from 'react-native';
import Driver from './Driver/Driver';

type Props = {};

const userDatas = [
  {
    id: 1,
    firstName: 'Nurman',
    lastName: 'Xojamuratov',
    carNumber: '95 G 411 GA',
    passengers: 4,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 2,
    firstName: 'Polat',
    lastName: 'Beknazarov',
    carNumber: '95 G 211 AA',
    passengers: 1,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 3,
    firstName: 'Omirzakov',
    lastName: 'Nurpolat',
    carNumber: '95 W 141 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 4,
    firstName: 'Aydos',
    lastName: 'Kasdapsdas',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 5,
    firstName: 'Владимир',
    lastName: 'Владимирович',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 6,
    firstName: 'Владимир',
    lastName: 'Владимирович',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 7,
    firstName: 'Владимир',
    lastName: 'Владимирович',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 8,
    firstName: 'Владимир',
    lastName: 'Владимирович',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 9,
    firstName: 'Владимир',
    lastName: 'Владимирович',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
  {
    id: 10,
    firstName: 'Владимир',
    lastName: 'Владимирович',
    carNumber: '95 G 411 GA',
    passengers: 0,
    joinedAt: '01.04.2024 15:38',
  },
];

const Line = ({
  setIsActive,
}: {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <View>
        {userDatas.map((user, index) => (
          <Driver
            setIsActive={setIsActive}
            key={user.id}
            user={user}
            index={index}
          />
        ))}
      </View>
    </>
  );
};

export default Line;

const styles = StyleSheet.create({});
