import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import { selectStatus, dataSelector } from '../redux/dataReducer';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {fetchInformation} from '../services/fetchInformation'
import {DataElement} from '../redux/dataReducer'

const ListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const data = useAppSelector(dataSelector)
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchInformation())
  },[])

  function renderItem({item}: {item: DataElement}) {
    return(
      <View style={styles.taskCard}>
        <Image style={styles.tinyLogo} source={{uri: item.avatar}}/>
        <Text>
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {isLoading ?
        <ActivityIndicator size="large"/>
      :
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  taskCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default ListScreen;
