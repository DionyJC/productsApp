import {Button, Input, Layout, Text} from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { API_URL, STAGE } from '@env';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}

export const LoginScreen = ({navigation}:Props) => {

  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if ( form.email.length === 0 || form.password.length === 0 ) {
      return;
    }
      const wasSuccessful = await login(form.email, form.password);
      if (!wasSuccessful ) {
        Alert.alert('Credenciales inválidas');
        return;
      }
  };

  //Imprima una variable de entorno
  console.log({apiUrl: API_URL, stage: STAGE});

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop:  height * 0.30}}>
           <Text category='h1'>Ingresar</Text>
           <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        {/* Información para crear cuenta */}
        <Layout style={{height: 20}} />

        <Layout>
          <Input 
            placeholder='Correo electrónico'
            keyboardType='email-address'
            accessoryLeft={<MyIcon name='email-outline' />}
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email) => setForm({...form, email})}
            style={{ marginBottom: 10 }}
          />
          <Input 
            placeholder='Contraseña'
            autoCapitalize='none'
            value={form.password}
            onChangeText={(password) => setForm({...form, password})}
            accessoryLeft={<MyIcon name='lock-outline' />}
            secureTextEntry
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{height: 20}} />

        {/* Botón de ingresar */}
        <Layout>
          <Button
          accessoryRight={<MyIcon name='arrow-forward-outline' white/>}
            style={{ height: 50 }}
            onPress={onLogin}
          >
            Ingresar
          </Button>
        </Layout>

        {/* Información para crear cuenta */}
        <Layout style={{height: 50}} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Text>¿No tienes cuenta?</Text>
          <Text 
            status="primary" 
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}
          >
           {' '} Crear una cuenta
          </Text>
        </Layout>
       
      </ScrollView>
    </Layout>
  );
};
