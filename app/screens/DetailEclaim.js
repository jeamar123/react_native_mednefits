import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { StatusBar, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import { ClaimDetail } from '../components/ClaimDetail';
import { Buttons } from '../components/common';
import Icons from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/common/Navbar';

class DetailEclaim extends Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="E-Claim" subtitle="File e-claim" />
        <ClaimDetail />
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
          <GiftedForm.TextInputWidget
            name="service"
            title="*Item/Service"
            placeholder="Gym Membership"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="merchant"
            title="*Merchant"
            placeholder="Mednefits Pte Ltd"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="claimAmount"
            title="*Claim Amount"
            placeholder="SGD"
            clearButtonMode="while-editing"
          />
          <GiftedForm.TextInputWidget
            name="receipt"
            title="*Receipt"
            clearButtonMode="while-editing"
          />
        </GiftedForm>
        <Buttons>Submit</Buttons>
      </Container>
    );
  }
}

export default DetailEclaim;
