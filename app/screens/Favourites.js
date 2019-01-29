import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text, Drawer, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import { MenuSide } from '../components/HomeContent';
import * as Config from '../config';
import * as Core from '../core';

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaction: '0',
      date: '',
      customerName: '',
      price: '',
      status: '',
      resultData: [],
      DataE_Claim: [],
    };
    this.drawerActionCallback = this.drawerActionCallback.bind(this);
  }

  closeDrawer() {
    this._drawer._root.close();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  drawerActionCallback(callback) {
    if (callback == true) {
      this.openDrawer();
    }
  }

  componentWillMount() {
    this.getFavorites_Clinic();
  }

  getFavorites_Clinic() {
    Core.GetFavouritesClinic((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data });
    });
  }

  renderTransactionIn_Network() {
    return this.state.resultData.map((Data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          Actions.DetailClinic({ clinic_id: Data.clinic_id, StatusOpen: Data.open_status })
        }
      >
        <View
          style={{
            flex: 1,
            marginTop: 5,
            marginBottom: 10,
            height: 90,
            backgroundColor: '#fff',
            opacity: 10000,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              source={{ uri: Data.image_url }}
              style={{
                height: 80,
                width: 80,
                resizeMode: 'center',
                alignItem: 'center',
                marginTop: '2%',
                marginLeft: '2%',
                marginRight: '-5%',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                marginTop: '4%',
                width: '45%',
              }}
            >
              <Text
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  fontSize: 14,
                  marginTop: 5,
                  width: '100%',
                }}
              >
                {Data.name}
              </Text>
              <Text
                style={{
                  color: '#8c8b7f',
                  fontSize: 10,
                  fontFamily: Config.FONT_FAMILY_LIGHT,
                }}
              >
                {Data.address}
              </Text>
              {Data.open_status === 1 ? (
                <Text style={{ marginTop: 5 }}>
                <Icons
                  name="circle"
                  style={{ color: '#51e500', fontSize: 10, marginRight: 15 }}
                />
                {' '}
                <Text style={{
                    fontFamily: Config.FONT_FAMILY_LIGHT,
                    fontSize: 10,
                    marginTop: 5,
                    marginLeft: 10,
                    color: '#616161',
                  }}>Now Open</Text>
                </Text>
              ) : (
                <Text style={{ marginTop: 5 }}>
                <Icons
                  name="circle"
                  style={{ color: '#e83637', fontSize: 10, marginRight: 15 }}
                />
                {' '}
                <Text style={{
                    fontFamily: Config.FONT_FAMILY_LIGHT,
                    fontSize: 10,
                    marginTop: 5,
                    marginLeft: 10,
                    color: '#616161',
                  }}>Closed</Text>
                </Text>
                )}
            </View>
            <Image
              source={require('../../assets/apps/like_fav.png')}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'center',
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    ));
  }


  render() {
    return (
      <Drawer
        type="displace"
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuSide navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Navbar
            drawerAction={this.drawerActionCallback}
            leftNav={true}
            rightNav="search"
          />
          
          {(this.state.resultData.length == 0) ? (
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <ActivityIndicator size="large" color="#0392cf" />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                marginLeft: '2%',
                marginRight: '2%',
                marginTop: '2%',
              }}
            >
              <ScrollView>
                {this.renderTransactionIn_Network()}
                <TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 5,
                      marginBottom: 10,
                      height: 90,
                      backgroundColor: '#fff',
                      opacity: 10000,
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                      <Image
                        source={require('../../assets/apps/plus.png')}
                        style={{
                          height: 70,
                          width: 70,
                          resizeMode: 'center',
                          alignItem: 'center',
                          marginTop: '2%',
                          marginLeft: '2%',
                          marginRight: '-5%',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginTop: '4%',
                          width: '45%',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Config.FONT_FAMILY_ROMAN,
                            fontSize: 14,
                            width: '100%',
                          }}
                        >
                          Add Your Clinic
                        </Text>
                        <Text
                          style={{
                            color: '#8c8b7f',
                            fontSize: 9,
                            fontFamily: Config.FONT_FAMILY_LIGHT,
                          }}
                        >
                          Tap here to search and add your favourite clinic to the list
                        </Text>
                      </View>
                      <Image
                        style={{
                          height: 100,
                          width: 100,
                          resizeMode: 'center',
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
            
          )}

        </View>
      </Drawer>
    );
  }
}

export default Favourites;
