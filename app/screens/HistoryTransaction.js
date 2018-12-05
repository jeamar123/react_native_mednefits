import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Tab,
  Tabs,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Navbar from '../components/common/Navbar';
import * as Core from '../core';

class HistoryTransaction extends Component {
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
  }

  componentWillMount() {
    this.getDataIn_Network();
    this.getDataE_Claim();
  }

  getDataIn_Network() {
    Core.GetHistoryTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ resultData: data });
    });
  }

  getDataE_Claim() {
    Core.GetEClaimTransaction((error, result) => {
      data =
        typeof result.data == 'string' ? JSON.parse(result.data) : result.data;
      this.setState({ DataE_Claim: data });
    });
  }

  renderTransactionIn_Network() {
    return this.state.resultData.map(Data => (
      <TouchableOpacity onPress={() => Actions.HistoryGeneral()}>
        <Card>
          <CardItem
            bordered
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 12 }}>
              Transaction #: {Data.transaction_id}
            </Text>
            <Text style={{ fontSize: 12 }}>{Data.date_of_transaction}</Text>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 12 }}>
                {Data.clinic_type_and_service}
              </Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 12 }} />
              <Text style={{ color: '#0392cf' }}>S$ {Data.amount}</Text>
            </Body>
          </CardItem>
          <CardItem
            footer
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 12, color: '#0392cf' }}>
              {Data.customer}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  }

  renderTransactionE_Claim() {
    return this.state.DataE_Claim.map(Data => (
      <TouchableOpacity>
        <Card>
          <CardItem
            bordered
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 12 }}>Claim #: {Data.transaction_id}</Text>
            <Text style={{ fontSize: 12 }}>Claim Date: {Data.claim_date}</Text>
          </CardItem>
          <CardItem>
            <Body
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 13 }}>{Data.merchant}</Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 12, color: '#666666' }}>
                {Data.service}
              </Text>
              <Text style={{ color: '#0392cf' }}>S$ {Data.amount}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 12, color: '#666666' }}>
                {Data.visit_date}
              </Text>
              <Text />
            </Body>
          </CardItem>
          <CardItem
            footer
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 11, color: '#0392cf' }}>
              {Data.member}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navbar leftNav="back-home" title="History" />
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: 'transparant' }}
          tabBarBackgroundColor="#0392cf"
        >
          <Tab
            heading="In-Network Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#fff', backgroundColor: '#0392cf' }}
            activeTextStyle={{ color: '#fff', fontSize: 16 }}
            textStyle={{ color: '#fff', fontSize: 15 }}
          >
            <Content padder>{this.renderTransactionIn_Network()}</Content>
          </Tab>
          <Tab
            heading="E-Claim Transactions"
            tabStyle={{ backgroundColor: '#0392cf' }}
            activeTabStyle={{ color: '#fff', backgroundColor: '#0392cf' }}
            activeTextStyle={{ color: '#fff', fontSize: 16 }}
            textStyle={{ color: '#fff', fontSize: 15 }}
          >
            <Content padder>{this.renderTransactionE_Claim()}</Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HistoryTransaction;
