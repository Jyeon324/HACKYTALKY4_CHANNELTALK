import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//const CHANNEL_URL = 'https://91y3l.channel.io';
const CHANNEL_URL = 'https://91y3l.channel.io/workflows/793672';

export default function ChannelTalkScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: CHANNEL_URL }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        onShowFileChooser={(event) => {
          console.log('File chooser requested');
          return true;
        }}
        onShouldStartLoadWithRequest={(request) => {
          return true;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});