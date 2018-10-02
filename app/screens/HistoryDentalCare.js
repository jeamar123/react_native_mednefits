import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { StatusBar, View, Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text,
  Row,
} from 'native-base';
import { HistoryUser } from '../components/HistoryUser';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';

class History extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header style={{ backgroundColor: '#0392cf' }}>
          <Left>
            <Button transparent>
              <Icons
                name="angle-left"
                style={{ color: '#fff', fontSize: 32 }}
              />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                Home
              </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff', fontSize: 22 }}>History</Title>
          </Body>
          <Right />
        </Header>
        <HistoryUser />
        <GiftedForm
          style={{
            backgroundColor: '#fff',
            paddingLeft: 5,
            paddingRight: 15,
          }}
          formName="signupForm"
          openModal={route => {
            navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Image
              style={{
                marginHorizontal: 30,
                marginRight: 30,
                marginLeft: 50,
              }}
              source={require('../../assets/apps/tooth.png')}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                marginRight: 30,
                paddingVertical: 10,
              }}
            >
              Dental Care
            </Text>
          </View>
          <GiftedForm.TextInputWidget
            name="transaction"
            title="Transaction #"
            placeholder="IN44837820"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="service"
            title="Service/s"
            placeholder="Scaling & Polishing"
            clearButtonMode="while-editing"
          />
          <GiftedForm.ModalWidget
            title="Date & Time"
            displayValue="Date & Time"
            scrollEnabled={false}
          >
            <GiftedForm.SeparatorWidget />

            <GiftedForm.DatePickerIOSWidget
              name="birthday"
              mode="date"
              getDefaultDate={() => {
                return new Date(new Date().getFullYear() - 18 + '');
              }}
            />
          </GiftedForm.ModalWidget>
          <GiftedForm.TextInputWidget
            name="member"
            title="Member"
            placeholder="Jelind Teo"
            clearButtonMode="while-editing"
          />
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
                paddingHorizontal: 10,
                marginRight: 30,
                paddingVertical: 10,
              }}
            >
              Receipt
            </Text>
            <Buttons>
              <Icon
                name="camera"
                style={{ width: '40%', color: '#fff', fontSize: 24 }}
              />
            </Buttons>
          </View>
        </GiftedForm>
      </Container>
    );
  }
}

export default History;
