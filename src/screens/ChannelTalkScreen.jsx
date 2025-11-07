import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';

// IMPORTANT: Please replace this with your actual Channel Talk plugin URL.
// It usually looks like: https://your-channel-name.channel.io?pluginKey=xxxx-xxxx-xxxx-xxxx
const CHANNEL_TALK_URL = 'https://developers.channel.io/ko/articles/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0%EC%9B%B9%EB%B7%B0-5aa8b19e';

export default function ChannelTalkScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: CHANNEL_TALK_URL }}
        style={styles.webview}
        // The following props are added to address potential issues on Android,
        // as mentioned in the Channel Talk documentation.

        // For file uploads on Android.
        // This requires additional setup for file permissions and a file picker.
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        
        // This function is called when the user tries to upload a file.
        // You would need to integrate a library like 'react-native-document-picker'
        // to open the native file selector.
        onShowFileChooser={(event) => {
          console.log('File chooser requested');
          // Returning true is important, but the actual file selection
          // needs to be handled via a separate library.
          return true;
        }}

        // To handle links that are supposed to open in a new tab (_blank).
        // This attempts to load them within the same WebView.
        onShouldStartLoadWithRequest={(request) => {
          // If the link is a `target="_blank"` link, it might have this origin.
          // This is a simple catch-all. More sophisticated logic might be needed.
          if (request.url !== CHANNEL_TALK_URL && request.navigationType === 'click') {
            // Could open in browser, or just load in the webview.
            // For now, we let it load in the webview.
            return true;
          }
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
