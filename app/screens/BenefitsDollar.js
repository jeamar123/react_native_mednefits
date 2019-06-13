import React, { Component } from 'react';
import { StatusBar, Image, View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { ButtonPay, Spinner, Popup } from '../components/common/';
import { InputPay } from '../components/TextInput';
import Navbar from '../components/common/NavbarGrey';
import * as Core from '../core';
import * as Config from '../config';
import * as Common from '../components/common';

class BenefitsDollar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinic_name: false,
      clinic_image: false,
      amount: 0,
      currency: false,
      isLoading: false,
      Balance: '0',
      placeholder: null,
      failed: false,
      title: null,
      message: null
    };

    this.isVisibleUpdate = this.isVisibleUpdate.bind(this);
  }

  isVisibleUpdate() {
    this.setState({ failed: false })
  }

  componentDidMount() {
    // Core.GetClinicDetails(98, (err, result) => {
    Core.GetClinicDetails(this.props.clinicid, (err, result) => {
      console.log(result)
      this.setState({
        clinic_name: result.data.name,
        clinic_image: result.data.image_url,
        currency: result.data.currency_symbol,
        Balance: result.data.current_balance,
      });
    });

    // Core.GetBalance((err, result)=>{
    //   this.setState({currency: result.data.currency_symbol})
    // })

    // this.props.services.map(value =>
    //   Core.GetProcedureDetails(value, (err, result) => {
    //     this.setState({
    //       amount: Number(result.data.price) + Number(this.state.amount),
    //     });
    //   })
    // );
  }

  SendPayment() {
    this.setState({ isLoading: true });

    params = {
      amount: this.state.amount,
      services: this.props.services,
      clinic_id: this.props.clinicid,
    };

    Core.SendPayment(params, (err, result) => {
      console.log(result);
      if (result.status) {
        Core.getNotify('', result.message);

        Actions.Summary({ result: result });
      } else if (!result.status) {
        // Core.getNotify('', result.message);
        this.setState({ title: result.message, message: result.sub_mesage, failed: true })
      } else {
        // Core.getNotify('', 'Failed to send payment, please try again');
        this.setState({ title: 'Payment Error', message: 'Failed to send payment, please try again', failed: true })
      }

      if (result) {
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    console.warn("props: " + JSON.stringify(this.props))
    return (
      <Container style={{ backgroundColor: '#efeff4' }}>
        <Core.Loader isVisible={this.state.isLoading} />
        <Popup
          kind="insufficientCredit"
          isVisible={this.state.failed}
          closeSection={true}
          closeSectionUpdate={this.isVisibleUpdate}
          title={this.state.title}
          message={this.state.message}
        />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="cancel" title="Payment Amount" />
        <Content padder>

          <View style={{ backgroundColor: '#f8f8fa', flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '2%',
                marginBottom: '10%'
              }}
            >
              {!this.state.clinic_name ? (
                <Spinner size="small" />
              ) : (
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: '-8%',
                    height: 60
                  }}
                  >
                    <Image
                      source={{ uri: this.state.clinic_image }}
                      style={{ height: 55, resizeMode: 'center', width: 155 }}
                    />
                    <Text
                      style={{
                        // marginLeft: '-5%',
                        fontFamily: Config.FONT_FAMILY_ROMAN,
                        color: '#9e9e9e',
                        fontSize: 18,
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      numberOfLines={2}
                    >
                      {this.state.clinic_name}
                    </Text>
                  </View>
                )}

            </View>
          </View>

          <View style={{ backgroundColor: '#fff' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%'
              }}
            >
              <Text style={{ marginTop: 20, fontFamily: Config.FONT_FAMILY_ROMAN, color: '#bdbdbd', }}>
                Total Bill Amount
              </Text>
            </View>
            <View
              style={{
                marginLeft: '5%',
                marginRight: '5%',
              }}>
              <Common.Divider />
            </View>

            <View
              style={{
                marginLeft: responsiveWidth(4),
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: '5%',
              }}
            >
              <View style={{}}>
                <Text style={{ paddingBottom: '7%', fontFamily: Config.FONT_FAMILY_ROMAN, fontSize: 20, color: '#9f9f9f', justifyContent: 'center', alignItems: 'center' }}>
                  {this.state.currency ? this.state.currency : ' '}
                </Text>
              </View>
              <InputPay
                keyboardType="numeric"
                placeholder="0.00"
                value={this.state.amount}
                onChangeText={number => this.setState({ amount: number })}
                style={{
                  fontFamily: Config.FONT_FAMILY_ROMAN,
                  height: 70,
                  fontSize: 46,
                  marginLeft: responsiveWidth(6),
                  width: '100%',
                  color:
                    (!this.state.amount) ? "#B0B0B0" : "#2c3e50",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: '5%' }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#bdbdbd', }}>
              Balance: {this.state.Balance}
            </Text>
            <Text style={{ fontFamily: Config.FONT_FAMILY_ROMAN, fontWeight: 'bold', color: '#bdbdbd', }}>
              Cap: {this.props.capCurrency} {this.props.capAmount}
            </Text>
          </View>

          <View style={{ marginBottom: '5%' }} />
          <ButtonPay onPress={() => Actions.PayScan({
            services: this.props.services,
            clinicid: this.props.clinicid,
            amount: this.state.amount,
            capCurrency: this.props.capCurrency,
            capAmount: this.props.capAmount,
            check_Id: this.props.check_Id
          })}>
            Next
          </ButtonPay>
        </Content>
      </Container>
    );
  }
}
export default BenefitsDollar;
