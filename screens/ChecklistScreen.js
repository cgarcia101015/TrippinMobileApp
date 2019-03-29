import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon, CheckBox } from "react-native-elements";
import { Constants } from "expo";
import Axios from "axios";
import LogoTitle from "../components/LogoTitle";

import "@expo/vector-icons";

export default class ChecklistScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    title: "Checklist"
  };

  // _isMounted = false;

  state = {
    checklist: [],
    checked: false,
    isReady: false
  };

  componentWillMount() {
    // console.log("hi");
    // this._isMounted = true;
    this.getChecklist();
  }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }
  renderItem = ({ item }) => (
    <CheckBox
      title={item.item}
      checked={item.checked}
      onPress={() => this.setState({ checked: !checked })}
    />
  );

  getChecklist = async () => {
    const res = await Axios.get(
      "http://trippin-api-2019.herokuapp.com/api/checklist"
    );
    const { data } = res;

    console.log("data: ", data);

    this.setState({ checklist: data, isReady: true });
    // console.log("----data----");
    // console.log(res.data);
  };

  handleCheck = id => {
    const checkboxitem = this.state.checklist.find(
      checkboxitem => checkboxitem._id === id
    );
  };

  render() {
    const { isReady, checklist, checked } = this.state;
    if (isReady) {
      // console.log("checklist: ", checklist);

      return (
        <ScrollView style={styles.container}>
          {checklist.map(checklistItem => (
            <CheckBox
              key={checklistItem._id}
              title={checklistItem.item}
              checked={checklistItem.checked}
              onPress={() =>
                (this.checklistItem.checked = !checklistItem.checked)
              }
            />
          ))}
        </ScrollView>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
