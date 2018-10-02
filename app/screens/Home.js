import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Text,
  Body,
  Drawer,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import { HomeContent, MenuSide } from '../components/HomeContent';

const { width, height } = Dimensions.get('window');

class Home extends Component {
  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<MenuSide navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Header style={{ backgroundColor: '#0392cf' }}>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icons name="bars" style={{ color: '#fff', fontSize: 32 }} />
              </Button>
            </Left>
            <Body>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontFamily: 'helvetica',
                  textAlign: 'center',
                }}
              >
                Mednefits
              </Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icons name="gear" style={{ color: '#fff', fontSize: 32 }} />
              </Button>
            </Right>
          </Header>
          <HomeContent />
          <Content padder>
            <View
              style={{ justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <Text style={{ fontFamily: 'helvetica', textAlign: 'center' }}>
                Benefits Category
              </Text>
            </View>
            <View style={styles.contain}>
              <TouchableOpacity>
                <View style={styles.gridBox}>
                  <Image
                    style={{ marginBottom: 15 }}
                    source={require('../../assets/apps/health.png')}
                  />
                  <Text
                    style={{ fontFamily: 'helvetica', textAlign: 'center' }}
                  >
                    Health Screening
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Actions.HistoryGeneral({
                    type: 'reset',
                  })
                }
              >
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/general.png')}
                  />
                  <Text
                    style={{ fontFamily: 'helvetica', textAlign: 'center' }}
                  >
                    General Practitioner
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Actions.HistoryDentalCare({
                    type: 'reset',
                  })
                }
              >
                <View style={styles.gridBox}>
                  <Image
                    style={{ marginBottom: 20 }}
                    source={require('../../assets/apps/tooth.png')}
                  />
                  <Text
                    style={{ fontFamily: 'helvetica', textAlign: 'center' }}
                  >
                    Dental Care
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Actions.HistoryChieneseMedicine({
                    type: 'reset',
                  })
                }
              >
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/chienese.png')}
                  />
                  <Text
                    style={{ fontFamily: 'helvetica', textAlign: 'center' }}
                  >
                    Traditional Chienese Medicine
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/Specialist.png')}
                  />
                  <Text
                    style={{ fontFamily: 'helvetica', textAlign: 'center' }}
                  >
                    Health Specialist
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.gridBox}>
                  <Image
                    style={{ margin: 10 }}
                    source={require('../../assets/apps/Wellness.png')}
                  />
                  <Text
                    style={{ fontFamily: 'helvetica', textAlign: 'center' }}
                  >
                    Wellness
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </Drawer>
    );
  }
}
const styles = {
  contain: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  gridBox: {
    width: width / 3.23,
    height: height / 6,
    backgroundColor: '#fff',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Home;
