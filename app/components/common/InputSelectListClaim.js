import React, { Component } from 'react';
import { StatusBar, View, FlatList, TouchableOpacity, Dimensions, ScrollView, Image, StyleSheet, Platform } from 'react-native';
import Navbar from './NavbarGrey';
import * as Common from './index'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal'
const { height, width } = Dimensions.get('window');
import * as Config from '../../config'
import Icons from 'react-native-vector-icons/FontAwesome';
import * as Core from '../../core'
import { Button } from 'native-base';

class SelectList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }

    this.changeValue = this.changeValue.bind(this)
    this.renderChildComponent = this.renderChildComponent.bind(this)
  }

  changeValue(value) {

    this.setState({
      isVisible: false
    })

    this.props.onValueChange(value)

  }

  renderChildComponent() {
    return (
      this.props.dataclaim.map((value, index) =>
        <View>
          <TouchableOpacity
            onPress={() => this.changeValue(value.value)}
            style={{
              marginTop: 15,
              marginBottom: 15,
              paddingLeft: 15,
              alignItems: 'flex-start'
            }}
          >
            <Common.Texti>
              {value.label}
            </Common.Texti>
          </TouchableOpacity>
          <Common.Divider />
        </View>
      )
    )
  }

  setTitle() {
    if (this.props.value) {
      this.props.dataclaim.filter((value, index) => {
        if (value.value == this.props.value) {
          label = value.label
        }
      });
    } else if (this.props.titleValue) {
      label = this.props.titleValue
    } else {
      label = this.props.placeholder
    }

    return label
  }

  renderNavbar(){
    return(
      <View style={styles.container}>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({isVisible: false})}
            style={{
              paddingStart: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icons
              name="angle-left"
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#000', fontSize: 32, paddingEnd: 5 }}
            />
            <Common.Texti
              style={{ color: (this.props.fontColor) ? this.props.fontColor : '#000', fontSize: 14, fontFamily: 'Helvetica' }}
            >
              Back
            </Common.Texti>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: 10
          }}
        >
          <Common.Texti
            fontFamily={Config.FONT_FAMILY_BOLD}
            fontSize={18}
          >
            {this.props.title}
          </Common.Texti>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Button transparent style={{ paddingLeft: 15 }} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#efeff4" barStyle="dark-content" />
        <Modal
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          deviceWidth={width}
          deviceHeight={height}
          animationIn="zoomIn"
          animationOut="zoomOut"
          useNativeDriver={true}
          coverScreen={false}
          hasBackdrop={false}
          style={{
            margin: 0
          }}
        >
          <View style={{ flex: 1, backgroundColor: "white"}}>
            {this.renderNavbar()}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.renderChildComponent()}
            </ScrollView>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.setState({ isVisible: true })}
          style={{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Common.Text
            fontSize={14}
            fontFamily={Config.FONT_FAMILY_MEDIUM}
            style={{
              color: (this.props.value) ? "#2c3e50" : "#9e9e9e"
            }}
          >
            {this.setTitle()}
          </Common.Text>

          <View
            style={{
              alignItems: 'flex-end',
              marginLeft: 10
            }}
          >
            <Image
              source={require('../../../assets/apps/arrow.png')}
              style={{ height: 20, resizeMode: 'center', width: 20 }}
            />
          </View>
          {/* <Icon
            type="SimpleLineIcons"
            name="arrow-right"
            style={{
              color: "#9e9e9e",
              marginLeft: 10,
              fontSize: 18
            }}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 15,
    backgroundColor: "#efeff4",
    justifyContent: 'space-between'
  },
  navBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 24,
    fontFamily: 'MyriadPro',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  },
});

export default SelectList;