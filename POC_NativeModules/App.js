/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {Text, View, NativeModules, Button} from 'react-native';

const {openIntent, openMediapipeActivity} = NativeModules.MyNewModule;

export function App() {
  function handleOpenIntent() {
    openIntent();
  }
  function handleOpenMediapipeActivity() {
    openMediapipeActivity();
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Teste para abrir uma activity nativa</Text>
      <Text>Tela feita em React Native</Text>
      <Button
        title="Apertar para testar"
        onPress={handleOpenMediapipeActivity}
      />
    </View>
  );
}
