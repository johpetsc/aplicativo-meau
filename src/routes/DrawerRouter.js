import * as React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import LoginStack from './LoginStack';
import CadastroPessoalStack from './CadastroPessoalStack';
import CadastroAnimalStack from './CadastroAnimalStack';
import AdotarStack from './AdotarStack';
import UsuarioStack from './UsuarioStack';
import AnimaisStack from './AnimaisStack';
import DrawerContent from '../components/NavigationDrawerStructure/DrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerRouter() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Login"
        options={{drawerLabel: 'Login', unmountOnBlur: true}}
        component={LoginStack}
        initialParams={{logged: false}}
      />
      <Drawer.Screen
        name="CadastroPessoal"
        options={{drawerLabel: 'Cadastro Pessoal', unmountOnBlur: true}}
        component={CadastroPessoalStack}
        initialParams={{logged: false, atalho: false}}
      />
      <Drawer.Screen
        name="CadastroAnimal"
        options={{drawerLabel: 'Cadastro Animal', unmountOnBlur: true}}
        component={CadastroAnimalStack}
        initialParams={{logged: true, atalho: true}}
      />
      <Drawer.Screen
        name="Usuario"
        options={{drawerLabel: 'Meu perfil', unmountOnBlur: true}}
        component={UsuarioStack}
        initialParams={{logged: true, atalho: false}}
      />
      <Drawer.Screen
        name="Animais"
        options={{drawerLabel: 'Meus pets', unmountOnBlur: true}}
        component={AnimaisStack}
        initialParams={{logged: true, atalho: false}}
      />
      <Drawer.Screen
        name="AdotarStack"
        options={{drawerLabel: 'Adotar', unmountOnBlur: true}}
        component={AdotarStack}
        initialParams={{logged: true, atalho: true}}
      />
    </Drawer.Navigator>
  );
}
