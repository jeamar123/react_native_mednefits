import React, { Component } from 'react';
import { GiftedForm } from 'react-native-gifted-form';
import { StatusBar, View, Image, TextInput } from 'react-native';
import { Container, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { HistoryClaim } from '../components/HistoryClaim';
import { Buttons } from '../components/common';
import * as Core from '../core';
import Navbar from '../components/common/Navbar';
const options = {
  title: 'Upload Your Receipt',
  takePhotoButtonTitle: 'Take a Photo',
  chooseFromLibraryButtonTitle: 'Choose from Gallery',
  quality: 1,
};

class DetailEClaim_Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: {
        uri: '',
      },
      data: false,
    };
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ imageSource: source });
      }
    });
  }

  componentWillMount() {
    Core.GetSpesificEclaim(this.props.transaction_id, result => {
      data = typeof result == 'string' ? JSON.parse(result.data) : result.data;

      this.setState({
        data: data,
      });
    });

    Core.UserDetail((err, result) => {
      this.setState({
        user: result.data.profile.full_name,
      });
    });
  }

  _renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: '#cccccc',
          borderBottomWidth: 0.8,
          marginTop: '-2%',
          marginBottom: '5%',
        }}
      />
    );
  }

  render() {
    console.warn(
      'datanya ' + this.state.data.clinic_name
        ? this.state.data.clinic_name
        : ''
    );
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back" title="History" />
        <HistoryClaim
          Status={this.state.data.status_text}
          Date={this.state.data.claim_date}
          Amount={this.state.data.amount}
        />
        <GiftedForm
          style={{ backgroundColor: '#fff', paddingLeft: 5, paddingRight: 15 }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          {/* <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                marginHorizontal: 30,
                marginRight: 30,
                marginLeft: 50,
              }}
              source={{ uri: this.state.data.clinic_type_image }}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                marginRight: 30,
                paddingVertical: 10,
              }}
            >
              {this.state.data.clinic_type
                ? this.state.data.clinic_type
                : 'N/A'}
            </Text>
          </View> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
              marginTop: 30,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%' }}>
              Item/Service
            </Text>
            <TextInput
              placeholder="Item/Service"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '7%' }}
              value={this.state.data.service}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%' }}>
              Merchant
            </Text>
            <TextInput
              placeholder="Merchant"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '13%' }}
              value={this.state.data.merchant}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ color: '#c4c4c4', marginLeft: '2%' }}>
              Claim #
            </Text>
            <TextInput
              placeholder="Claim ID"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '17%' }}
              value={this.state.data.transaction_id}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: '2%', marginRight: '3%' }}
            >
              Date & Time
            </Text>
            <TextInput
              placeholder="Date & Time"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '5%' }}
              value={this.state.data.date}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{ color: '#c4c4c4', marginLeft: '2%', marginRight: '6%' }}
            >
              Claim Date
            </Text>
            <TextInput
              placeholder="Claim Date"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '4%' }}
              value={this.state.data.claim_date}
            />
          </View>
          {this._renderDivider()}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                marginRight: '10%',
              }}
            >
              Member
            </Text>
            <TextInput
              placeholder="Member"
              underlineColorAndroid="transparent"
              colo="#000"
              style={{ marginTop: '-3%', marginLeft: '5%' }}
              value={this.state.user ? this.state.user : 'N/A'}
            />
          </View>
          {this._renderDivider()}

          {/*<View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                color: '#c4c4c4',
                marginLeft: '2%',
                marginRight: '10%',
              }}
            >
              Receipt
            </Text>
            <Buttons onPress={() => this.selectPhoto()}>
              <Icon
                name="camera"
                style={{ width: '40%', color: '#fff', fontSize: 24 }}
              />
            </Buttons>
          </View>*/}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text style={{ width: '38%' }} />
            <View
              style={{
                height: 180,
                width: '50%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="cover"
                style={{ width: '80%', height: 180 }}
                source={{
                  uri: !this.state.imageSource.uri
                    ? '../../assets/photo.png'
                    : this.state.imageSource.uri,
                }}
              />
            </View>
          </View>
        </GiftedForm>
      </Container>
    );
  }
}

export default DetailEClaim_Transaction;