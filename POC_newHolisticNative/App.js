import {Button, Text, View, NativeModules} from 'react-native';

const {openIntent} = NativeModules.ModuleMediapipe;

export function App() {
  function handleOpen() {
    openIntent();
  }
  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <Text>Teste poc</Text>
      <Button title="Button teste" onPress={handleOpen} />
    </View>
  );
}
