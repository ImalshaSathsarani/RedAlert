import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display"; // ✅ Markdown support
import { chatApi } from "../services/api"; // Adjust path if needed

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    Keyboard.dismiss();

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await chatApi.sendMessage(input);
      const botMsg = { from: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Red Alert</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.from === "user" ? styles.userMessage : styles.botMessage
            ]}
          >
            {item.from === "bot" ? (
              <Markdown style={markdownStyles}>{item.text}</Markdown>
            ) : (
              <Text style={styles.messageText}>{item.text}</Text>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={{ color: "#888", fontStyle: "italic" }}>
            Red Alert is typing...
          </Text>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          style={styles.input}
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E72929",
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  message: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    maxWidth: "85%"
  },
  userMessage: {
    backgroundColor: "#E72929",
    alignSelf: "flex-end"
  },
  botMessage: {
    backgroundColor: "#EEEEEE",
    alignSelf: "flex-start"
  },
  messageText: {
    color: "#fff"
  },
  typingIndicator: {
    marginLeft: 15,
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "#fff"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 42,
    backgroundColor: "#fff",
    color: "#000"
  },
  sendButton: {
    backgroundColor: "#E72929",
    borderRadius: 25,
    padding: 10,
    marginLeft: 10
  }
});

const markdownStyles = {
  body: {
    color: "#000",
    fontSize: 14
  },
  heading1: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#E72929"
  },
  heading2: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#E72929"
  },
  heading3: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#E72929"
  },
  strong: {
    fontWeight: "700" as const
  },
  list_item: {
    marginVertical: 2
  }
};
