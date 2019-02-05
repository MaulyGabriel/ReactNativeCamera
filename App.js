import React, {Component} from 'react';
import { StyleSheet, View, ToastAndroid} from 'react-native';
import { RNCamera} from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";
import { Text, Button } from 'native-base';

 class App extends Component {

  state = {
      text:"Nenhuma placa identificada",
  };

  takePicture = async () => {
    if (this.camera) {
      try{ 
          
          const options = { quality: 0.5, base64: true };
          ToastAndroid.show('Processando a imagem ...', ToastAndroid.SHORT, ToastAndroid.CENTER)
          const data = await this.camera.takePictureAsync(options);
          const visionText = await RNTextDetector.detectFromUri(data.uri);
          alert(JSON.stringify(visionText));
         
      }catch(e){
        alert(e);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textRecognition}>{this.state.text}</Text>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View style={styles.buttonContainer}>
          <Button onPress={this.takePicture} light rounded style={styles.capture}>
            <Text>Capture</Text>
          </Button>
        </View>
        
      </View>
    );
  }
}
          
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor:"#002362"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  buttonText: {
    fontSize: 14
  },
  textRecognition: {
    color: '#FFFFFF',
    textAlign: "center"
    
  }
});