import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground, Platform, Dimensions, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/NavbarGrey';
import { Text } from '../common';
import * as Common from '../components/common';
import * as Core from '../core';
import * as Config from '../config';
import * as mime from 'react-native-mime-types';

const options = {
  title: 'Select Photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from gallery' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const PendingView = () => (
  <View
    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, opacity: 0.3 }}
  >
    <ActivityIndicator size="large" color="#fff" />
  </View>
);

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      preview: false,
      isLoading: false,
      flashMode: false,
      attachedPanel: false,
      shootType: 'single',
      images: []
    };

    this.renderCamera = this.renderCamera.bind(this)
    this.changeViewCamera = this.changeViewCamera.bind(this)
  }

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = { quality: 0.5, base64: false };
        const data = await this.camera.takePictureAsync(options);
        const maxHeight = Dimensions.get('window').height;
        const maxWidth = Dimensions.get('window').width;

        const ratio = Math.min(maxWidth / data.width, maxHeight / data.height);

        images = {
          preview: data.uri,
          previewHeight: data.height * ratio,
          previewWidth: data.width * ratio,
          filename: 'receipt' + this.props.member + '.jpg',
          filetype: 'images/jpg'
        }

        if (this.state.images.length !== 3) {
          this.setState({
            images: (this.state.shootType == 'single') ? [images] : [...this.state.images, images],
            preview: true
          })
        } else {
          Core.getNotify("", "Only 3 images can be upload")
        }

      }
    } catch (e) {
      console.warn(e.message);
      Core.getNotify("", "Failed to take picture")

    }
  }

  retakeAction = () => {
    if (this.state.images.length == 3) {
      Core.getNotify("", "Only 3 images can be upload")
    } else {
      this.setState({
        preview: false
      })
    }
  }

  async requestPermission() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      return result === PermissionsAndroid.RESULTS.GRANTED || result === true
    }
    return true;
  }

  renderCamera = () => {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        flashMode={(!this.state.flashMode) ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {

          if (status !== 'READY') this.requestPermission()

        }}
      </RNCamera>
    )
  }

  changeFlash = () => {
    if (!this.state.flashMode) {
      Core.getNotify("", "Flash is on")
    }

    this.setState({
      flashMode: !this.state.flashMode
    })

  }

  openGallery = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        images = {
          preview: response.uri,
          filename: response.fileName,
          filetype: response.type,
        }

        if (this.state.images.length !== 3) {
          this.setState({
            images: (this.state.shootType == 'single') ? [images] : [...this.state.images, images],
            preview: true
          })
        } else {
          Core.getNotify("", "Only 3 images can be upload")
        }
      }
    });
  }

  finishReceipt = () => {
    Core.getNotify("", "Receipt attached")

    this.setState({
      attachedPanel: true
    })
  }

  changeViewCamera(type) {
    this.setState({ shootType: type })

    if (type == 'single') {
      this.setState({ images: [] })
    }

    this.retakeAction()
  }

  renderAction = () => {
    return (
      <View style={styles.actionPanel}>
        {/* <TouchableOpacity
          onPress={() => Actions.DetailEclaim({ claimdata: Object.assign({}, { images: this.state.images }, this.props.claimdata) })}
          style={{ width: "100%", backgroundColor: "#0392cf", justifyContent: 'center', alignItems: 'center', display: (this.state.attachedPanel) ? 'flex' : 'none', height: '20%' }}>
          <Icon
            type="SimpleLineIcons"
            name="check"
            style={{
              color: "#fff"
            }}
          />
        </TouchableOpacity> */}
        <View style={{ width: "100%", backgroundColor: '#efeff4', justifyContent: 'space-between', flexDirection: 'row', display: (this.state.attachedPanel) ? 'none' : 'flex', paddingBottom: 5 }}>
          <TouchableOpacity
            onPress={this.changeFlash}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginLeft: 15
            }}>
            <ImageBackground
              source={(this.state.flashMode) ? require("../../assets/apps/flash-active.png") : require("../../assets/apps/flash.png")}
              style={{
                width: 30,
                height: 30
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changeViewCamera('single')}
              style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Common.Texti
                fontColor={"#0392cf"}
                fontSize={11}
              >
                Single{" "}
              </Common.Texti>
              {(this.state.shootType == 'single') ? (
                <View style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: '#0392cf', marginTop: 2 }} />
              ) : (<View style={{ width: 4, height: 4, borderRadius: 4 / 2, marginTop: 2 }} />)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.changeViewCamera('batch')}
              style={{flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}}>
              <Common.Texti
                fontColor={"#0392cf"}
                fontSize={11}
              >
                Batch
              </Common.Texti>
              {(this.state.shootType == 'batch') ? (
                <View style={{width: 4, height:4, borderRadius: 4/2, backgroundColor: '#0392cf', marginTop: 2}}/>
              ) : (<View style={{width: 4, height:4, borderRadius: 4/2, marginTop: 2}} />)}
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            onPress={this.openGallery}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginRight: 15
            }}>
            <ImageBackground
              source={require('../../assets/apps/gallery-round.png')}
              style={{
                width: 30,
                height: 30
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", justifyContent: 'space-between', flexDirection: 'row', display: (this.state.attachedPanel) ? 'none' : 'flex', alignItems: 'center', height: '75%' }}>
          <TouchableOpacity
            onPress={this.retakeAction}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '4%'
            }}>
            <Common.Texti
              fontColor={"#0392cf"}
            >
              Retake
            </Common.Texti>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Icon type="Feather" name="camera" style={{ color: 'white', fontSize: 26, justifyContent: 'center' }} />
            </TouchableOpacity>
          </View>
          {
            (this.state.images.length > 0) ?
              (
                <TouchableOpacity
                  onPress={() => Actions.DetailEclaim({ type: 'reset', claimdata: Object.assign({}, { images: this.state.images }, this.props.claimdata) })}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '4%'
                  }}>
                  <Common.Texti
                    fontColor={"#0392cf"}
                  >
                    Finish
                </Common.Texti>
                </TouchableOpacity>
              ) : (
                <Text
                  style={{
                    fontFamily: 'HelveticaNeue-Roman',
                    fontSize: 14,
                    color: '#FFFFFF',
                    marginRight: 15,
                    opacity: 0
                  }}
                >
                  DONE
              </Text>
              )
          }
        </View>
      </View>
    )
  }

  _closeSection() {
    return (
      <ImageBackground
        style={{ width: 30, height: 30 }}
        source={require('../../assets/close.png')}
      />
    )
  }

  removeImage(index) {
    arr = this.state.images
    remove = arr.splice(index, 1)

    console.warn(arr);

    Core.getNotify("", "image removed")

    if (this.state.images.length > 0) {
      this.setState({
        preview: true
      })
    } else {
      this.setState({
        preview: false
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ zIndex: 99 }}>
          <Navbar
            leftNav="back"
            title="Receipt Verification"
            subtitle="E-Claim"
          />
        </View>
        <View style={{ flex: 0.8, backgroundColor: '#efeff4' }}>
          {((this.state.images.length > 0) && (this.state.preview !== false)) ? (
            this.state.images.map((value, index) => (
              (this.state.shootType == 'single') ? (
                <View
                  key={index}
                  style={{ flex: 1 }}
                >
                  <ImageBackground
                    source={{ uri: value.preview }}
                    style={styles.preview}
                  />
                </View>
              ) : (
                  <View
                    key={index}
                    style={{ flex: 0.85, paddingLeft: 15, paddingRight: 15 }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Common.Texti>{index + 1}</Common.Texti>
                      <TouchableOpacity
                        onPress={() => this.removeImage(index)}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          marginBottom: -20,
                          marginRight: -15,
                          zIndex: 99,
                        }}
                      >
                        {this._closeSection()}
                      </TouchableOpacity>
                    </View>
                    <ImageBackground
                      source={{ uri: value.preview }}
                      style={styles.preview}
                    />
                    <Common.Divider />
                  </View>
                )
            ))
          ) : this.renderCamera()}
        </View>
        {this.renderAction()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    flexDirection: 'column'
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10
  },
  actionPanel: {
    flex: 0.23,
    backgroundColor: '#efeff4'
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#0392cf",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Camera;
