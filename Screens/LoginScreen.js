import React, { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";

const loadFonts = async () => {
  return await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
};

const image = require("../assets/img/bg.png");

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export const LoginScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  }, []);

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

  const onHiddenPassword = () => {
    setSecureText(!secureText);
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
            keyboardVerticalOffset={-134}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 144,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
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
                  secureTextEntry={secureText}
                />
                <TouchableOpacity
                  style={styles.btnPassword}
                  onPress={onHiddenPassword}
                >
                  {secureText ? (
                    <Text style={styles.btnPasswordText}>Показати</Text>
                  ) : (
                    <Text style={styles.btnPasswordText}>Скрити</Text>
                  )}
                </TouchableOpacity>
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
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // ...Platform.select({ ios: {}, android: {} }),
  },
  title: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
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
  btnPasswordText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  btnPassword: {
    position: "absolute",
    right: 16,
    paddingTop: 16,
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
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
