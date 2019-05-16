import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
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
      <ImageBackground
        source={require("./assets/splash.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <SoundList />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
    const sound = new Audio.Sound();
    sound.loadAsync(props.file);

    this.state = { sound };
  }

  _onPress = () => this.state.sound.playFromPositionAsync(0);

  render() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={styles.box}>
          <Text style={styles.text}>{this.props.title}</Text>
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
          renderItem={({ item }) => (
            <SoundButton file={item.file} title={item.title} />
          )}
          horizontal={false}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "grey",
    opacity: 0.7,
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  flatView: {
    flex: 1,
    marginBottom: 10
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    opacity: 1,
    textAlign: "center"
  }
});
