import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AnimalBox from '../../components/AnimalBox';
import storage from '@react-native-firebase/storage';
import UserData from '../../contexts/UserData';

const Animais = ({navigation}) => {
  const [listaAnimais, setListaAnimais] = useState([]);
  const [listaIds, setListaIds] = useState([]);
  const [userData] = useContext(UserData);

  const onPetPress = (index) => {
    navigation.navigate('Pet', {id:listaIds[index], dados:listaAnimais[index]});
  };

  const fetchAnimais = async (animais, ids) => {
    const Documents = await firestore()
      .collection('usuarios')
      .doc(userData.id)
      .collection('animais')
      .get()
      .then((querrySnapshot) => {
        querrySnapshot.forEach((documentSnapshot) => {
          animais.push(documentSnapshot.data());
          ids.push(documentSnapshot.id);
          console.log(documentSnapshot.id, documentSnapshot.data());
        });
      });
  };

  const fetchImagem = async (animais) => {
    for (const item of animais) {
      if (item.imageRef) {
        item.url = await storage().ref(item.imageRef).getDownloadURL();
      }
    }
  };

  useEffect(() => {
    const animais = [];
    const ids = [];
    fetchAnimais(animais, ids).then(() => {
      fetchImagem(animais).then(() => {
        console.log(animais);
        setListaAnimais(animais);
        setListaIds(ids);
      });
    });
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      {listaAnimais.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => onPetPress(index)}>
          <AnimalBox
            nome={item.nome}
            sexo={item.sexo}
            idade={item.idade}
            porte={item.porte}
            cor={styles.titulo}
            endereco={item.endereco}
            imagem={{uri: item.url} || require('../../images/Meau_Icone.png')}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const colors = {
  amarelo: '#cfe9e5',
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#88c9bf',
    width: 232,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  titulo: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.amarelo,
    marginBottom: -50,
  },
  texto: {
    padding: 0,
    fontSize: 15,
    fontFamily: 'Roboto',
    color: 'lightgray',
    alignSelf: 'center',
  },
});

export default Animais;
