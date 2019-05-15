import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Text } from 'native-base';
import Navbar from '../components/common/NavbarGreen';
import * as Config from '../config';

class checkinUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#3F9D59' }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar
          title="Register"
          rightNav="Close"
          Services={this.props.services}
          clinic_Id={this.props.clinicid}
          check_Id={this.props.checkId}
          capCurrency={this.props.capCurrency}
          capAmount={this.props.capAmount}
        />
        <View style={{
          alignItems: 'center',
        }}
        >
          <Image
            source={require('../../assets/apps/CheckIn.png')}
            style={{ height: 50, resizeMode: 'contain', width: 50, marginBottom: 10, marginTop: 30 }}
          />
          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 25,
            color: '#fff',
            marginBottom: 5,
          }}
          >
            {this.props.member}
          </Text>
          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
            paddingTop: 2,
            paddingBottom: 10
          }}>
            {this.props.nric}
          </Text>

          <Text style={{
            fontFamily: 'HelveticaNeue-Roman',
            textAlign: 'center',
            fontSize: 16,
            color: '#fff',
            paddingTop: 10,
            paddingBottom: 40
          }}>
            Checked in {this.props.checkTime}
          </Text>

          <View style={{ backgroundColor: '#fff', width: '90%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '2%',
                marginBottom: '10%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Image
                source={{ uri: this.props.clinic_image }}
                style={{ height: 55, resizeMode: 'center', width: 55 }}
              />
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 18, marginTop: '2%' }}>
                {this.props.clinic_name}
              </Text>

            </View>
          </View>
          <View style={{ backgroundColor: '#fff', width: '90%', marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10%',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, color: '#2C3E50', fontSize: 16 }}>
                Cap per visit
              </Text>
              <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#2C3E50', fontSize: 18 }}>
                {this.props.capCurrency}{this.props.capAmount}
              </Text>

            </View>
          </View>
        </View>

        <View style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
          <Image
            source={require('../../assets/apps/LogoMednefits.png')}
            style={{ height: 25, resizeMode: 'contain', width: 25 }}
          />
        </View>
      </Container>
    );
  }
}

export default checkinUser;