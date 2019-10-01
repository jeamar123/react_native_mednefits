import React, { Component } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Linking
} from 'react-native';
import Modal from 'react-native-modal';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Config from '../../config'
import * as Core from '../../core'
import * as Common from '../common'

import VersionCheck from 'react-native-version-check';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
    };
  }

  // componentDidMount() {
  //   console.log(this.props);
  //   this.setState({ isVisible: this.props.isVisible })
  // }

  // componentWillMount() {
  //   this.setState({ isVisible: this.props.isVisible });
  //   console.log(this.state.isVisible);
  // }

  renderBody() {
    if (this.props.kind == 'loginFailed') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}
          <View style={{ marginTop: 5, marginBottom: 20, marginRight: 5, marginLeft: 5 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={22}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={12}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              { this.props.url != null ? <Common.Texti>Please click <Common.Texti fontColor={'#338BC2'} style={{ color: '#338BC2', textDecorationLine: 'underline' }} onPress={() => this.goToUrl()}>here</Common.Texti> to change your user ID to your mobile number.</Common.Texti> : this.props.message }
            </Common.Texti>
          </View>

        </View>
      );
    } else if (this.props.kind == 'insufficientCredit') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}

          <View style={{ margin: 10 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={20}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>
          </View>

        </View>
      );
    } else if (this.props.kind == 'eClaimError') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}

          <View style={{ margin: 10 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={20}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>
          </View>

        </View>
      );
    } else if (this.props.kind == 'update-application') {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: responsiveHeight(20) }}>
          {/* <ImageBackground
            style={{ width: 250, height: 100 }}
            source={require('../../../assets/modalAsset/loginFailed.png')}
            resizeMode="center"
          /> */}

          <View style={{ margin: 10 }}>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_MEDIUM}
              fontSize={20}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.title}
            </Common.Texti>
            <Common.Texti
              fontFamily={Config.FONT_FAMILY_ROMAN}
              fontSize={14}
              numberOfLines={10}
              style={{
                color: '#38424B',
                textAlign: 'center'
              }}
            >
              {this.props.message}
            </Common.Texti>
            <Common.ButtonUpdate
              style={{
                padding: 5
              }}
              onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sg.medicloud')}>
              Update Now
            </Common.ButtonUpdate>
          </View>
        </View>
      );
    }
  }

  async CheckVersion() {
    try {
      version = await Core.CheckVersion()

      Linking.openURL(version);

    } catch (e) {
      console.warn(e + "sa");
      // Common.getNotify("","Failed to request url")
    }
  }

  goToUrl( ){
    console.log( this.props.url );
    Linking.openURL( this.props.url );
  }

  _closeSection() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../../assets/close.png')}
      />
    )
  }

  render() {
    return (
      <View style={{ backgroundColor: '#000' }}>
        <Modal isVisible={this.props.isVisible}>
          {(!this.props.closeSection) ? (<View />) : (
            <TouchableOpacity
              onPress={() => this.props.closeSectionUpdate(true)}
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginBottom: -50,
                zIndex: 99,
              }}
            >
              {this._closeSection()}
            </TouchableOpacity>
          )}
          <View
            style={{ backgroundColor: '#fff', borderRadius: 10, margin: 20 }}
          >
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 15,
              }}
            >
              {this.renderBody()}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
