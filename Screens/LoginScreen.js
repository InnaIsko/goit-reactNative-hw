import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const loadFonts = async () => {
  return await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
};

const image = require("../assets/img/bg.png");
export const LoginScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const keyboardHandler = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onLogin = () => {
    console.log(`email: ${email}, password: ${password} `);

    setPassword("");
    setEmail("");

    keyboardHandler();
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHandler}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 144,
              }}
            >
              <Text style={styles.title}>Ввійти</Text>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={emailHandler}
                  onFocus={() => setIsShowKeyboard(true)}
                  placeholder="Адреса електроної пошти"
                  autoFocus={true}
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={passwordHandler}
                  onFocus={() => setIsShowKeyboard(true)}
                  placeholder="Пароль"
                  secureTextEntry={true}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={onLogin}
              >
                <Text style={styles.btnTitle}>Ввійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fff0",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingTop: 32,
    // paddingBottom: 144,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    ...Platform.select({ ios: {}, android: {} }),
  },
  title: {
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
  },
  input: {
    height: 50,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingTop: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 43,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
