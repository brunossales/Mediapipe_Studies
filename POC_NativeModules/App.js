import {Text, View, NativeModules, Button} from 'react-native';

const {handleClick, safeCameraOpen, openIntent} = NativeModules.MyNewModule;

export function App() {
  function handleOnPress() {
    handleClick('Bruno', (err, message) => {
      if (err) {
        return console.log(err);
      }
      console.log(message);
    });
  }

  function handleOpenIntent() {
    openIntent();
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Teste para o POC: Prova de conceito</Text>
      <Text>Tela feita em React Native</Text>
      <Button title="Apertar para testar" onPress={handleOpenIntent} />
    </View>
  );
}
