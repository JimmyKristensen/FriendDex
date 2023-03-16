import { Pressable, StyleSheet, Text, TextInput, View, SafeAreaView, Image} from 'react-native'
import { useState } from 'react';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import {storage, database} from '../confiq/Firebase';
import {ref, uploadBytes} from 'firebase/storage';
import {collection, addDoc} from 'firebase/firestore';
import { async } from '@firebase/util';

const fireMons = 'friendMons';
const fireMonsRef = collection(database,fireMons)

const CreateDexIndex = ({navigation}) => {
  const [name, setName] = useState()
  const [health, setHeath] = useState()
  const [attack, setAttack] = useState()
  const [specialAbility, setSpecialAbility] = useState()
  const [image, setImage] = useState()
  const [imageName, setImageName] = useState()


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality:1,
      }).then(result => {
        setImage(result.assets[0].uri);
        const source = { uri: result.assets[0].uri };
        uploadImage(source)
      }).catch(error => {
        alert('No image selected');
      })
    };

    const uploadeFriendInfo = async () => {
      addDoc(fireMonsRef, {
          name: name,
          hp: health,
          ad: attack,
          special_ability: specialAbility,
          image: imageName
      })
      console.log("It's been uploaded")
    }

    const uploadImage = async (imageToUpload) => {
      try {
          const imageUri = imageToUpload.uri;
          let imageUriName = imageUri.slice(-20);
          const response = await fetch(imageUri)
          const blob = await response.blob()
          if (imageUriName.includes("/")) {
            imageUriName = imageUriName.replaceAll("/", "");
          };
          setImageName(imageUriName)
          const reference = ref(storage, imageUriName)
          const result = await uploadBytes(reference, blob)
      } catch (error) {
          console.log(error);
      }
    }
  return (
    <View style={styles.container}>
        <SafeAreaView>
            <TextInput style={styles.input} placeholder="Friendmons name" onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Health points" keyboardType='number-pad' onChangeText={setHeath}/>
            <TextInput style={styles.input} placeholder='Attack damage' keyboardType='number-pad' onChangeText={setAttack}/>
            <TextInput style={styles.input} placeholder='Special ability' onChangeText={setSpecialAbility}/>
            <Pressable onPress={pickImage}>
                <Text>Pick Picture</Text>
            </Pressable>
            <Image  style={styles.image} source={{uri: image}}/>
            <Pressable onPress={uploadeFriendInfo}>
              <Text>Upload</Text>
            </Pressable>
        </SafeAreaView>
    </View>
  )
}

export default CreateDexIndex

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
      },
      image:{
        width:290,
        height:218,
        backgroundColor:'#ddd'
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
      },
      input: {
        marginBottom: 2,
        borderWidth: 1,
        padding: 2,
      }
})