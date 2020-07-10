import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = React.useState(null);

  // function setup for request to use camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Camera access is denied! </Text>;
  }

  //Function setup for image picker
  let openImagePickerAsnyc = async() =>{
    let permissionResult =await ImagePicker.requestCameraRollPermissionsAsync();

              if(permissionResult.granted===false){
                alert("Permission to access album is required!");
                return;
              }
              let pickerResult = await ImagePicker.launchImageLibraryAsync();
              if (pickerResult.cancelled === true) {
                return;
              }
          
              setSelectedImage({ localUri: pickerResult.uri });
            };
            let openShareDialogAsync = async () => {
              if (!(await Sharing.isAvailableAsync())) {
                alert(`Uh oh, sharing isn't available on your platform`);
                return;
              }
          
              await Sharing.shareAsync(selectedImage.localUri);
            }; 
          
            if (selectedImage !== null) {
              return (
                <View style={styles.container}>
                  <Image
                    source={{ uri: selectedImage.localUri }}style={styles.thumbnail}/>
                    <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this photo</Text>
                  </TouchableOpacity>
        
                </View>
              );
            }
  //Function setup snapping photo
  snapPhotoAsync = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.button}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity>
          onPress={openImagePickerAsnyc} style={styles.buttonAlbum}
        <Text style={styles.buttonText}>Open album</Text>
          </TouchableOpacity>
        <TouchableOpacity>
        onPress={snapPhotoAsync} style={styles.buttonSnap}
        <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    fontSize: 18, 
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  buttonSnap:{
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    fontSize: 18, 
    marginBottom: 20,


  },
  buttonAlbum:{
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    fontSize: 18, 
    marginBottom: 30,

  },
   thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  } 
});