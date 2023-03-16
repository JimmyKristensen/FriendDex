import { StyleSheet, Text, View, FlatList, Pressable} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import {database} from '../confiq/Firebase';
import {collection, query, onSnapshot} from 'firebase/firestore';
import { async } from '@firebase/util';

const AllDexEntries = ({navigation, route}) => {

    const [friendDex, setFriendDex] = useState([])

    /* Name of the collection on firebase */
    const fireFriedDex = 'friendMons';
    const fireFriendDexRef = collection(database,fireFriedDex)

    useEffect(() => {
        readDB();
    }, []);
    
    /* reads the note collection */
    const readDB = async () => {
        const q = query(fireFriendDexRef, ref => ref.orderBy('createdAt', 'desc'));
        /* New array to save the data in */
        const snapArrya = [];
        /* Snapshit is an active listener to react to any changes to the query,
        call the onSnapshot method with an event handler callback*/
        onSnapshot(q, snapshot => {
          snapshot.forEach(snap =>{
            snapArrya.push({
              ...snap.data(),
              key : snap.id
            });
          });
          setFriendDex(snapArrya);
          console.log(snapArrya)
        });
    }

    const renderItem = (itemData) => {
        return <Pressable onPress={() => navigation.navigate("DexScreen", {dexInfo: itemData})}>
                    <Text style={styles.names}>{itemData.item.name}</Text>
                </Pressable>
    }

  return (
    <View style={styles.container}>
      <Text>
        <FlatList
                data={friendDex}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
      </Text>
    </View>
  )
}

export default AllDexEntries

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      names:{
        fontSize: 15,
        marginTop: 10
      }
})