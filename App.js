import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import { Audio } from "expo";
import data from "./config/sounds";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SoundList />
      </SafeAreaView>
    );
  }
}

const playSound = async item => {
  const sound = new Audio.Sound();
  await sound.loadAsync(item.file);
  await sound.playFromPositionAsync(0);
};

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
    const sound = new Audio.Sound();
    //    sound.loadAsync(require("./assets/sounds" + props.filename));

    this.state = { sound };
  }

  _onPress = () => this.state.sound.playFromPositionAsync(0);

  render() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.box}>
          <Text>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class SoundList extends React.Component {
  _item = ({ item }) => (
    <TouchableHighlight onPress={() => playSound(item)}>
      <View style={styles.box}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={styles.flatView}>
        <FlatList
          keyExtractor={(item, index) => item.title}
          data={data}
          renderItem={this._item}
          //renderItem={({ item }) => (
          //  <SoundButton filename={item.filename} title={item.title} />
          //)}
          horizontal={false}
          numColumns={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  flatView: {
    flex: 1,
    marginBottom: 10
  }
});
