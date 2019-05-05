import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Container, Drawer } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/common/Navbar';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { MenuSide, HomeContentStatic } from '../components/HomeContent';
import { Actions } from 'react-native-router-flux';
import ResponsiveImage from 'react-native-responsive-image';
import RF from "react-native-responsive-fontsize";
import { Text } from '../common';
import * as Config from '../config';
import * as Core from '../core'
import * as Common from '../components/common'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 1.3437419;
const LONGITUDE = 103.6839585;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class SearchResult extends Component {

  render() {
    const arr = this.props.searchdata
    const arry = []

    return (
      <ScrollView
        showHorizontalScrollIndicator={false}
        showVerticalScrollIndicator={false}
        style={{ marginBottom: 160 }}
      >
        <View>
          {Object.entries(this.props.searchdata).map(([key, v]) => {
            if ((key !== 'clinics') || (key !== 'doctors')) {
              if (Array.isArray(v.data) && (v.data.length > 0)) {
                return <View >
                  {v.data.map((ke, va) => {
                    return <View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text ellipsizeMode={"tail"} numberOfLines={2} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={14} style={{ color: 'black', letterSpacing: 2, fontWeight: "bold", width: "50%", lineHeight: 20 }}>{ke.name}</Text>
                        <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_THIN} fontSize={10} style={{ color: '#cccccc', letterSpacing: 3 }}>{key.toUpperCase()}</Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#cccccc',
                          borderBottomWidth: 0.8,
                          marginTop: 15,
                          marginBottom: 15,
                          marginRight: -15
                        }}
                      />
                    </View>

                  })}

                </View>
              }
            }


          })}

          {Object.entries(this.props.searchdata).map(([key, v]) => {
            if ((key == 'clinics') || (key == 'doctors')) {
              if (Array.isArray(v) && (v.length > 0)) {
                return <View key={v} >
                  {v.map((ke, va) => {
                    return <TouchableOpacity key={va} onPress={() =>
                      Actions.DetailClinic({ clinic_id: ke.clinic_id, StatusOpen: ke.open_status })
                    }>
                      <View
                        style={{
                          flex: 1,
                          marginTop: 4,
                          height: 110,
                          backgroundColor: '#fff',
                          width: '100%'
                        }}
                      >
                        <View
                          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                          <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <ResponsiveImage
                              style={{ marginTop: '8%' }}
                              source={{ uri: ke.clinic_image }}
                              initWidth="85" initHeight="85"
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'column',
                              marginTop: 2,
                              width: '65%',
                              marginRight: '1%',
                              marginLeft: '1%'
                            }}
                          >
                            <Text

                              numberOfLines={2}
                              style={{
                                fontFamily: Config.FONT_FAMILY_BOLD,
                                fontSize: RF(1.6),
                                width: '100%',
                                fontWeight: '900'
                              }}
                            >
                              {ke.name}
                            </Text>
                            <Text

                              numberOfLines={2}
                              style={{
                                color: '#8c8b7f',
                                fontSize: RF(1.4),
                                fontFamily: Config.FONT_FAMILY_ROMAN,
                              }}
                            >
                              {ke.address}
                            </Text>
                            {ke.open_status === 1 ? (
                              <Text style={{ marginTop: 1 }}>
                                <Icons
                                  name="circle"
                                  style={{ color: '#51e500', fontSize: 10, marginRight: 15 }}
                                />
                                {' '}
                                <Text style={{
                                  fontFamily: Config.FONT_FAMILY_ROMAN,
                                  fontSize: 8,
                                  marginLeft: 10,
                                  color: '#616161',
                                }}>Now Open</Text>
                              </Text>
                            ) : (
                                <Text style={{ marginTop: 1 }}>
                                  <Icons
                                    name="circle"
                                    style={{ color: '#e83637', fontSize: 10, marginRight: 15 }}
                                  />
                                  {' '}
                                  <Text style={{
                                    fontFamily: Config.FONT_FAMILY_LIGHT,
                                    fontSize: 8,
                                    marginLeft: 10,
                                    color: '#616161',
                                  }}>Closed</Text>
                                </Text>
                              )}
                          </View>


                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text ellipsizeMode={"tail"} numberOfLines={2} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={14} style={{ color: 'black', letterSpacing: 2, fontWeight: "bold", width: "50%", lineHeight: 20 }}>{ke.name}</Text>
                          <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_THIN} fontSize={10} style={{ color: '#cccccc', letterSpacing: 3 }}>{key.toUpperCase()}</Text>
                        </View> */}
                        {/* <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_THIN} fontSize={10} style={{ color: '#cccccc', letterSpacing: 3 }}>{ke.address}</Text>
                        {(ke.open_status == 0) ? (
                          <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={8} style={{ color: 'red', letterSpacing: 1 }}>
                            closed
                        </Text>
                        ) : (
                            <Text ellipsizeMode={"tail"} numberOfLines={1} fontFamily={Config.FONT_FAMILY_BOLD} fontSize={8} style={{ color: 'green' }}>
                              open
                        </Text>
                          )} */}
                        {/* <View
                          style={{
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 0.8,
                            marginTop: 15,
                            marginBottom: 15,
                            marginRight: -15
                          }}
                        /> */}
                      </View>
                    </TouchableOpacity>
                  })}
                </View>
              }
            }
          })}
        </View>
      </ScrollView>
    )
  }
}

class ResultList extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Common.Texti
            fontColor={"black"}
          >
            {this.props.title}
          </Common.Texti>
          <Common.Texti
            fontColor={"black"}
          >
            {this.props.type}
          </Common.Texti>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Common.Texti
          >
            {this.props.address}
          </Common.Texti>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Common.Texti
            fontColor={(this.props.isOpen == 0) ? "red" : "green"}
          >
            {(this.props.isOpen == 0) ? "Closed" : "Open"}
          </Common.Texti>
        </View>
      </View>
    )
  }
}


class ClinicList extends Component {

  async getClinicMap(clinic_type_id) {
    Core.GetLocationPermission((error, result) => {
      console.warn(error)
      console.warn(result)
      // if(result) {
      Actions.NearbyClinic({ ClinicTypeID: this.props.id, NameCategory: this.props.name })
      // }
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.getClinicMap(this.props.id)
        }
      >
        <View style={styles.gridBox}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '13%' }}>
              <ResponsiveImage
                source={{ uri: this.props.image }}
                initWidth="40" initHeight="40"
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5, marginLeft: 10, marginRight: 10 }}>
              <Text
                fontFamily={Config.FONT_FAMILY_ROMAN}
                style={{ textAlign: 'center', fontSize: RF(1.7), }}
              >
                {this.props.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity >
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: false,
      searchdata: false,
      isLoadingSearch: false,
      clinicType: 2,
      AllClinic: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }

    this.drawerActionCallback = this.drawerActionCallback.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this)
    this.isLoadingSearch = this.isLoadingSearch.bind(this)
    this.clearSearch = this.clearSearch.bind(this)

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

  getClinicType = async () => {
    await Core.GetClinicType(async (err, result) => {
      if (result) {
        await this.setState({
          data: result.data.clinic_types,
        })
      }
    })
  }


  // Getting Data Clinic

  // async componentWillMount() {
  //   await Core.GetClinicMapList(2, async (error, result) => {
  //     console.warn(error);
  //     console.warn(result);
  //     if (result) {
  //       if (result.status) {
  //         data = await typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
  //         // console.warn(data.current_page);
  //         // console.warn(data.last_page);
  //         await this.setState({ AllClinic: data.clinics });
  //       } else {
  //         setTimeout(function () {
  //           Actions.pop();
  //           Core.getNotifyLong('', 'Sorry, no registered clinics nearby');
  //         }, 2000);
  //       }
  //     } else {
  //       if (error.code === 3) {
  //         setTimeout(function () {
  //           Actions.pop();
  //           Core.getNotifyLong("", 'Unable to get location. Please try again.');
  //         }, 1000);
  //       } else {
  //         setTimeout(function () {
  //           Actions.pop();
  //           Core.getNotifyLong('', 'Sorry, no registered clinics nearby');
  //         }, 2000);
  //       }
  //     }
  //     // console.warn(data);
  //   });
  // }

  // componentWillMount() {
  //   this.getClinics()
  // }

  // getClinics = async () => {
  //   console.warn('anjing' + this.state.clinicType);
  //   await Core.GetClinicMap(this.state.clinicType, (err, result) => {
  //     console.warn(result);
  //   })
  // }

  getCurrentPosition = async () => {
    latitude = await Core.GetDataLocalReturnNew(Config.LATITUDE)
    longitude = await Core.GetDataLocalReturnNew(Config.LONGITUDE)
    dataClinicNearby = await Code.GetAllClinic(dataClinicNearby)

    console.warn(latitude);
    // console.warn(dataClinicNearby);
    // console.warn(longitude);
    this.setState({
      region: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    })
  }

  async componentDidMount() {
    await Core.GetLocationPermission(async (error, result) => {
      await this.getClinicType()
    });
  }

  _keyExtractor = (item, index) => item.ClinicTypeID;

  _renderItem = ({ item }) => (
    <ClinicList
      key={item.ClinicTypeID}
      id={item.ClinicTypeID}
      name={item.Name}
      image={item.clinic_type_image_url}
    />
  );

  onUpdateSearch(result) {
    this.setState({ searchdata: result })
  }

  isLoadingSearch(state) {
    console.warn("state " + state);
    switch (state) {
      case 'true':
        this.setState({
          isLoadingSearch: true
        })
        break;
      case 'false':
        this.setState({
          isLoadingSearch: false
        })
        break;
      default:
    }
  }

  clearSearch(state) {
    this.setState({ searchdata: false })
  }


  render() {
    // console.warn("clinisc " + JSON.stringify(this.state.AllClinic));
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Drawer
        type="displace"
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuSide navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          {/* <View style={{ flex: 1 }}>
            {(!this.state.data || this.state.isLoadingSearch) ? (
              <View
                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
              >
                <ActivityIndicator size="large" color="#0392cf" />
              </View>
            ) : (this.state.searchdata) ? (
              <View>
                <Navbar
                  leftNav="back-home"
                />
                <SearchHome
                  onUpdateSearch={this.onUpdateSearch}
                  isLoadingSearch={this.isLoadingSearch}
                  clearProcess={this.clearSearch}
                />
                <View
                  style={{ justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}
                >
                  <Text
                    fontFamily={Config.FONT_FAMILY_ROMAN}
                    style={{ textAlign: 'center', marginLeft: '5%' }}
                  >
                    Search Result
                  </Text>
                </View>
                <SearchResult
                  searchdata={this.state.searchdata}
                />
              </View>
            ) : (
                  <View style={{ flex: 1 }}>
                    <Navbar
                      drawerAction={this.drawerActionCallback}
                      leftNav={true}
                      rightNav={true}
                    />
                    <HomeContent
                      onUpdateSearch={this.onUpdateSearch}
                      isLoadingSearch={this.isLoadingSearch}
                      clearProcess={this.clearSearch}
                    />
                    <View
                      style={{ justifyContent: 'center', alignItems: 'flex-start' }}
                    >
                      <Text
                        fontFamily={Config.FONT_FAMILY_ROMAN}
                        style={{ textAlign: 'center', marginLeft: '2.5%' }}
                      >
                        Benefits Category
                      </Text>
                    </View>
                    <View style={styles.contain}>
                      <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this.data}
                        renderItem={this._renderItem}
                        horizontal={false}
                        numColumns={3}
                      />
                    </View>
                  </View>
                )}
          </View> */}

          <View style={{ flex: 1 }}>
            <Navbar
              drawerAction={this.drawerActionCallback}
              leftNav={true}
              rightNav={true}
            />
            <HomeContentStatic
              Services={this.props.services}
              clinic_Id={this.props.clinicid}
              check_Id={this.props.checkId}
            />
            <View
              style={{ justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <Text
                fontFamily={Config.FONT_FAMILY_ROMAN}
                style={{ textAlign: 'center', marginLeft: '2.5%' }}
              >
                Benefits Category
              </Text>
            </View>
            <View style={styles.contain}>
              <FlatList
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this.data}
                renderItem={this._renderItem}
                horizontal={false}
                numColumns={3}
              />
            </View>
          </View>
        </Container>
      </Drawer>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '2%'
  },
  gridBox: {
    width: width / 3.23,
    height: responsiveHeight(18),
    backgroundColor: '#fff',
    margin: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export default Home;
