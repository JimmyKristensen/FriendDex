import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import {storage} from '../confiq/Firebase';
import {ref, getDownloadURL} from 'firebase/storage';

const Dex = ({navigation, route}) => {
  console.log(route.params.dexInfo)
  const [name, setName] = useState(route.params.dexInfo.item.name)
  const [health, setHeath] = useState(route.params.dexInfo.item.hp)
  const [attack, setAttack] = useState(route.params.dexInfo.item.ad)
  const [specialAbility, setSpecialAbility] = useState(route.params.dexInfo.item.special_ability)
  const [image, setImage] = useState(route.params.dexInfo.item.image)
  const [imageuri, setImageUri] = useState()

  const backgroundImage = {uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/176622e8-bf4c-4d60-9a64-b75cff245c16/d3inhyi-28e16cb6-9d37-4a6e-bdc6-0d7fcf0af574.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE3NjYyMmU4LWJmNGMtNGQ2MC05YTY0LWI3NWNmZjI0NWMxNlwvZDNpbmh5aS0yOGUxNmNiNi05ZDM3LTRhNmUtYmRjNi0wZDdmY2YwYWY1NzQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gqQUvb9pdKz_BDtsTqXkpM1_aUHox6IXyveVcugbntg'}

  useEffect(() => {
    downloadImage();
  }, []); 

  const downloadImage = async () => {
    const storageRef = ref(storage, image);
    getDownloadURL(storageRef)
    .then((url) => {
    setImageUri(url);
    })
    .catch((error) => {
    switch (error.code) {
        case 'storage/object-not-found':
        // File doesn't exist
        break;
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
        // User canceled the upload
        break;
        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
    });
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.topBar}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.hp}>HP <Text style={styles.health}>{health}</Text></Text>
        </View>
        <Image style={styles.image} source={{uri: imageuri}}/>
        <View style={styles.bottembar}>
          <Text style={styles.at}>Attack damage: {attack}</Text>
          <Text style={styles.sp}>Speacial Ability: {specialAbility}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Dex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 12,
    borderColor: "rgb(216 179 31)",
  },
  image:{
    width:290,
    height:218,
    backgroundColor:'#ddd',
    alignSelf: 'center',
    marginBottom: 100,
  },
  topBar:{
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 25,
  },
  bottembar:{
    alignItems: 'center',
  },
  backgroundImage:{
    height: "100%"
  },
  name:{
    fontSize: 25,
  },
  hp:{
    fontSize: 10
  }, 
  health:{
    fontSize: 30
  },
  at:{
    fontSize: 20,
    marginBottom: 20,
  },
  sp:{
    fontSize: 20
  }
})