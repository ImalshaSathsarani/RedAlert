// // // import React, { useState } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   FlatList,
// // //   StyleSheet,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   Image,
// // //   Keyboard
// // // } from "react-native";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import Markdown from "react-native-markdown-display"; // ✅ Markdown support
// // // import { chatApi } from "../../services/api"; // Adjust path if needed

// // // const ChatScreen = () => {
// // //   const navigation = useNavigation();
// // //   const [messages, setMessages] = useState([
// // //     { from: "bot", text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything." }
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [isTyping, setIsTyping] = useState(false);

// // //   const sendMessage = async () => {
// // //     if (input.trim() === "") return;
// // //     Keyboard.dismiss();

// // //     const userMsg = { from: "user", text: input };
// // //     setMessages((prev) => [...prev, userMsg]);
// // //     setInput("");
// // //     setIsTyping(true);

// // //     try {
// // //       const reply = await chatApi.sendMessage(input);
// // //       const botMsg = { from: "bot", text: reply };
// // //       setMessages((prev) => [...prev, botMsg]);
// // //     } catch (error) {
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         { from: "bot", text: "Sorry, something went wrong." }
// // //       ]);
// // //     } finally {
// // //       setIsTyping(false);
// // //     }
// // //   };

// // //   return (
// // //     <KeyboardAvoidingView
// // //       style={styles.container}
// // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // //     >
// // //       {/* Header */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={() => navigation.goBack()}>
// // //           <Ionicons name="arrow-back" size={24} color="#fff" />
// // //         </TouchableOpacity>
// // //         <Image
// // //           source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
// // //           style={styles.avatar}
// // //         />
// // //         <Text style={styles.headerText}>Red Alert</Text>
// // //       </View>

// // //       {/* Chat Messages */}
// // //       <FlatList
// // //         data={messages}
// // //         keyExtractor={(_, index) => index.toString()}
// // //         renderItem={({ item }) => (
// // //           <View
// // //             style={[
// // //               styles.message,
// // //               item.from === "user" ? styles.userMessage : styles.botMessage
// // //             ]}
// // //           >
// // //             {item.from === "bot" ? (
// // //               <Markdown style={markdownStyles}>{item.text}</Markdown>
// // //             ) : (
// // //               <Text style={styles.messageText}>{item.text}</Text>
// // //             )}
// // //           </View>
// // //         )}
// // //         contentContainerStyle={{ paddingBottom: 10 }}
// // //       />

// // //       {/* Typing Indicator */}
// // //       {isTyping && (
// // //         <View style={styles.typingIndicator}>
// // //           <Text style={{ color: "#888", fontStyle: "italic" }}>
// // //             Red Alert is typing...
// // //           </Text>
// // //         </View>
// // //       )}

// // //       {/* Input */}
// // //       <View style={styles.inputContainer}>
// // //         <TextInput
// // //           value={input}
// // //           onChangeText={setInput}
// // //           placeholder="Type a message..."
// // //           placeholderTextColor="#aaa"
// // //           style={styles.input}
// // //           onSubmitEditing={sendMessage}
// // //           blurOnSubmit={false}
// // //         />
// // //         <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
// // //           <Ionicons name="send" size={20} color="#fff" />
// // //         </TouchableOpacity>
// // //       </View>
// // //     </KeyboardAvoidingView>
// // //   );
// // // };

// // // export default ChatScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#FAFAFA"
// // //   },
// // //   header: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "#E72929",
// // //     padding: 15,
// // //     elevation: 4,
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 3
// // //   },
// // //   avatar: {
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     marginHorizontal: 10
// // //   },
// // //   headerText: {
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     fontWeight: "bold"
// // //   },
// // //   message: {
// // //     padding: 12,
// // //     marginVertical: 6,
// // //     marginHorizontal: 12,
// // //     borderRadius: 12,
// // //     maxWidth: "85%"
// // //   },
// // //   userMessage: {
// // //     backgroundColor: "#E72929",
// // //     alignSelf: "flex-end"
// // //   },
// // //   botMessage: {
// // //     backgroundColor: "#EEEEEE",
// // //     alignSelf: "flex-start"
// // //   },
// // //   messageText: {
// // //     color: "#fff"
// // //   },
// // //   typingIndicator: {
// // //     marginLeft: 15,
// // //     marginBottom: 8
// // //   },
// // //   inputContainer: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     borderTopWidth: 1,
// // //     borderColor: "#ddd",
// // //     padding: 10,
// // //     backgroundColor: "#fff"
// // //   },
// // //   input: {
// // //     flex: 1,
// // //     borderWidth: 1,
// // //     borderColor: "#ddd",
// // //     borderRadius: 25,
// // //     paddingHorizontal: 15,
// // //     height: 42,
// // //     backgroundColor: "#fff",
// // //     color: "#000"
// // //   },
// // //   sendButton: {
// // //     backgroundColor: "#E72929",
// // //     borderRadius: 25,
// // //     padding: 10,
// // //     marginLeft: 10
// // //   }
// // // });

// // // const markdownStyles = {
// // //   body: {
// // //     color: "#000",
// // //     fontSize: 14
// // //   },
// // //   heading1: {
// // //     fontSize: 20,
// // //     fontWeight: "700" as const,
// // //     color: "#E72929"
// // //   },
// // //   heading2: {
// // //     fontSize: 18,
// // //     fontWeight: "700" as const,
// // //     color: "#E72929"
// // //   },
// // //   heading3: {
// // //     fontSize: 16,
// // //     fontWeight: "700" as const,
// // //     color: "#E72929"
// // //   },
// // //   strong: {
// // //     fontWeight: "700" as const
// // //   },
// // //   list_item: {
// // //     marginVertical: 2
// // //   }
// // // };



// // // import React, { useState, useRef } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   FlatList,
// // //   StyleSheet,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   Image,
// // //   Keyboard,
// // // } from "react-native";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import Markdown from "react-native-markdown-display";
// // // import { chatApi } from "../../services/api";

// // // const ChatScreen = () => {
// // //   const navigation = useNavigation();
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       from: "bot",
// // //       text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything.",
// // //     },
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [isTyping, setIsTyping] = useState(false);
// // //   const flatListRef = useRef<FlatList>(null);

// // //   const sendMessage = async () => {
// // //     if (input.trim() === "") return;
// // //     Keyboard.dismiss();

// // //     const userMsg = { from: "user", text: input };
// // //     setMessages((prev) => [...prev, userMsg]);
// // //     setInput("");
// // //     setIsTyping(true);

// // //     try {
// // //       const reply = await chatApi.sendMessage(input);
// // //       const botMsg = { from: "bot", text: reply };
// // //       setMessages((prev) => [...prev, botMsg]);
// // //     } catch {
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         { from: "bot", text: "Sorry, something went wrong." },
// // //       ]);
// // //     } finally {
// // //       setIsTyping(false);
// // //       setTimeout(() => {
// // //         flatListRef.current?.scrollToEnd({ animated: true });
// // //       }, 100);
// // //     }
// // //   };

// // //   return (
// // //     <KeyboardAvoidingView
// // //       style={styles.container}
// // //       behavior={Platform.OS === "ios" ? "padding" : undefined}
// // //       keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
// // //     >
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={() => navigation.goBack()}>
// // //           <Ionicons name="arrow-back" size={24} color="#fff" />
// // //         </TouchableOpacity>
// // //         <Image
// // //           source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
// // //           style={styles.avatar}
// // //         />
// // //         <Text style={styles.headerText}>Red Alert</Text>
// // //       </View>

// // //       <View style={{ flex: 1 }}>
// // //         <FlatList
// // //           ref={flatListRef}
// // //           data={messages}
// // //           keyExtractor={(_, i) => i.toString()}
// // //           renderItem={({ item }) => (
// // //             <View
// // //               style={[
// // //                 styles.message,
// // //                 item.from === "user" ? styles.userMessage : styles.botMessage,
// // //               ]}
// // //             >
// // //               {item.from === "bot" ? (
// // //                 <Markdown style={markdownStyles}>{item.text}</Markdown>
// // //               ) : (
// // //                 <Text style={styles.userText}>{item.text}</Text>
// // //               )}
// // //             </View>
// // //           )}
// // //           contentContainerStyle={{ padding: 16 }}
// // //           onContentSizeChange={() =>
// // //             flatListRef.current?.scrollToEnd({ animated: true })
// // //           }
// // //         />

// // //         {isTyping && (
// // //           <Text style={styles.typing}>Red Alert is typing...</Text>
// // //         )}

// // //         <View style={styles.inputWrapper}>
// // //           <TextInput
// // //             value={input}
// // //             onChangeText={setInput}
// // //             placeholder="Type a message..."
// // //             placeholderTextColor="#aaa"
// // //             style={styles.input}
// // //             onSubmitEditing={sendMessage}
// // //           />
// // //           <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
// // //             <Ionicons name="send" size={20} color="#fff" />
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     </KeyboardAvoidingView>
// // //   );
// // // };

// // // export default ChatScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#fff",
// // //   },
// // //   header: {
// // //     backgroundColor: "#E72929",
// // //     paddingVertical: 14,
// // //     paddingHorizontal: 16,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   avatar: {
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     marginHorizontal: 12,
// // //   },
// // //   headerText: {
// // //     fontSize: 18,
// // //     color: "#fff",
// // //     fontWeight: "600",
// // //   },
// // //   message: {
// // //     padding: 12,
// // //     borderRadius: 16,
// // //     marginVertical: 6,
// // //     maxWidth: "80%",
// // //   },
// // //   userMessage: {
// // //     backgroundColor: "#E72929",
// // //     alignSelf: "flex-end",
// // //   },
// // //   botMessage: {
// // //     backgroundColor: "#F1F1F1",
// // //     alignSelf: "flex-start",
// // //   },
// // //   userText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //   },
// // //   inputWrapper: {
// // //     flexDirection: "row",
// // //     backgroundColor: "#fff",
// // //     borderTopWidth: 1,
// // //     borderColor: "#ddd",
// // //     padding: 10,
// // //   },
// // //   input: {
// // //     flex: 1,
// // //     backgroundColor: "#F5F5F5",
// // //     borderRadius: 25,
// // //     paddingHorizontal: 16,
// // //     fontSize: 14,
// // //     color: "#000",
// // //   },
// // //   sendBtn: {
// // //     backgroundColor: "#E72929",
// // //     padding: 10,
// // //     borderRadius: 25,
// // //     marginLeft: 8,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   typing: {
// // //     color: "#888",
// // //     fontStyle: "italic",
// // //     marginLeft: 18,
// // //     marginBottom: 6,
// // //   },
// // // });

// // // const markdownStyles = {
// // //   body: { color: "#000", fontSize: 14 },
// // //   heading1: { fontSize: 20, fontWeight: "700" as const, color: "#E72929" },
// // //   heading2: { fontSize: 18, fontWeight: "700" as const, color: "#E72929" },
// // //   heading3: { fontSize: 16, fontWeight: "700" as const, color: "#E72929" },
// // //   strong: { fontWeight: "700" as const },
// // //   list_item: { marginVertical: 2 },
// // // };

// // import React, { useState, useRef } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   FlatList,
// //   StyleSheet,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Image,
// //   Keyboard,
// // } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import { Ionicons } from "@expo/vector-icons";
// // import Markdown from "react-native-markdown-display";
// // import { chatApi } from "../../services/api";

// // const ChatScreen = () => {
// //   const navigation = useNavigation();
// //   const [messages, setMessages] = useState([
// //     {
// //       from: "bot",
// //       text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything.",
// //     },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [isTyping, setIsTyping] = useState(false);
// //   const flatListRef = useRef<FlatList<any>>(null); // 👈 Fix TypeScript error

// //   const sendMessage = async () => {
// //     if (input.trim() === "") return;
// //     Keyboard.dismiss();

// //     const userMsg = { from: "user", text: input };
// //     setMessages((prev) => [...prev, userMsg]);
// //     setInput("");
// //     setIsTyping(true);

// //     try {
// //       const reply = await chatApi.sendMessage(input);
// //       const botMsg = { from: "bot", text: reply };
// //       setMessages((prev) => [...prev, botMsg]);
// //     } catch {
// //       setMessages((prev) => [
// //         ...prev,
// //         { from: "bot", text: "Sorry, something went wrong." },
// //       ]);
// //     } finally {
// //       setIsTyping(false);
// //       setTimeout(() => {
// //         flatListRef.current?.scrollToEnd({ animated: true });
// //       }, 100);
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       style={styles.container}
// //       behavior={Platform.OS === "ios" ? "padding" : undefined}
// //       keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
// //     >
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Ionicons name="arrow-back" size={24} color="#fff" />
// //         </TouchableOpacity>
// //         <Image
// //           source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
// //           style={styles.avatar}
// //         />
// //         <Text style={styles.headerText}>Red Alert</Text>
// //       </View>

// //       {/* Main Chat Body */}
// //       <View style={styles.chatContainer}>
// //         <FlatList
// //           ref={flatListRef}
// //           data={messages}
// //           keyExtractor={(_, i) => i.toString()}
// //           renderItem={({ item }) => (
// //             <View
// //               style={[
// //                 styles.message,
// //                 item.from === "user" ? styles.userMessage : styles.botMessage,
// //               ]}
// //             >
// //               {item.from === "bot" ? (
// //                 <Markdown style={markdownStyles}>{item.text}</Markdown>
// //               ) : (
// //                 <Text style={styles.userText}>{item.text}</Text>
// //               )}
// //             </View>
// //           )}
// //           contentContainerStyle={{ padding: 16 }}
// //           onContentSizeChange={() =>
// //             flatListRef.current?.scrollToEnd({ animated: true })
// //           }
// //         />

// //         {isTyping && (
// //           <Text style={styles.typing}>Red Alert is typing...</Text>
// //         )}

// //         {/* Input Bar */}
// //         <View style={styles.inputWrapper}>
// //           <TextInput
// //             value={input}
// //             onChangeText={setInput}
// //             placeholder="Type a message..."
// //             placeholderTextColor="#aaa"
// //             style={styles.input}
// //             onSubmitEditing={sendMessage}
// //             returnKeyType="send"
// //           />
// //           <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
// //             <Ionicons name="send" size={20} color="#fff" />
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // export default ChatScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //   },
// //   header: {
// //     backgroundColor: "#E72929",
// //     paddingVertical: 14,
// //     paddingHorizontal: 16,
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   avatar: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     marginHorizontal: 12,
// //   },
// //   headerText: {
// //     fontSize: 18,
// //     color: "#fff",
// //     fontWeight: "600",
// //   },
// //   chatContainer: {
// //     flex: 1,
// //     justifyContent: "space-between",
// //   },
// //   message: {
// //     padding: 12,
// //     borderRadius: 16,
// //     marginVertical: 6,
// //     maxWidth: "80%",
// //   },
// //   userMessage: {
// //     backgroundColor: "#E72929",
// //     alignSelf: "flex-end",
// //   },
// //   botMessage: {
// //     backgroundColor: "#F1F1F1",
// //     alignSelf: "flex-start",
// //   },
// //   userText: {
// //     color: "#fff",
// //     fontSize: 14,
// //   },
// //   inputWrapper: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     borderTopWidth: 1,
// //     borderColor: "#ddd",
// //     backgroundColor: "#fff",
// //   },
// //   input: {
// //     flex: 1,
// //     backgroundColor: "#F5F5F5",
// //     borderRadius: 25,
// //     paddingHorizontal: 16,
// //     fontSize: 14,
// //     color: "#000",
// //   },
// //   sendBtn: {
// //     backgroundColor: "#E72929",
// //     padding: 10,
// //     borderRadius: 25,
// //     marginLeft: 8,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   typing: {
// //     color: "#888",
// //     fontStyle: "italic",
// //     marginLeft: 18,
// //     marginBottom: 4,
// //   },
// // });

// // const markdownStyles = {
// //   body: { color: "#000", fontSize: 14 },
// //   heading1: { fontSize: 20, fontWeight: "700" as const, color: "#E72929" },
// //   heading2: { fontSize: 18, fontWeight: "700" as const, color: "#E72929" },
// //   heading3: { fontSize: 16, fontWeight: "700" as const, color: "#E72929" },
// //   strong: { fontWeight: "700" as const },
// //   list_item: { marginVertical: 2 },
// // };

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   Keyboard,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import Markdown from "react-native-markdown-display";
// import { chatApi } from "../../services/api";

// const ChatScreen = () => {
//   const navigation = useNavigation();
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const flatListRef = useRef<FlatList<any>>(null); // 👈 Fix TypeScript error

//   const sendMessage = async () => {
//     if (input.trim() === "") return;
//     Keyboard.dismiss();

//     const userMsg = { from: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const reply = await chatApi.sendMessage(input);
//       const botMsg = { from: "bot", text: reply };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setIsTyping(false);
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Image
//           source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
//           style={styles.avatar}
//         />
//         <Text style={styles.headerText}>Red Alert</Text>
//       </View>

//       {/* Main Chat Body */}
//       <View style={styles.chatContainer}>
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           keyExtractor={(_, i) => i.toString()}
//           renderItem={({ item }) => (
//             <View
//               style={[
//                 styles.message,
//                 item.from === "user" ? styles.userMessage : styles.botMessage,
//               ]}
//             >
//               {item.from === "bot" ? (
//                 <Markdown style={markdownStyles}>{item.text}</Markdown>
//               ) : (
//                 <Text style={styles.userText}>{item.text}</Text>
//               )}
//             </View>
//           )}
//           contentContainerStyle={{ padding: 16 }}
//           onContentSizeChange={() =>
//             flatListRef.current?.scrollToEnd({ animated: true })
//           }
//         />

//         {isTyping && (
//           <Text style={styles.typing}>Red Alert is typing...</Text>
//         )}

//         {/* Input Bar */}
//         <View style={styles.inputWrapper}>
//           <TextInput
//             value={input}
//             onChangeText={setInput}
//             placeholder="Type a message..."
//             placeholderTextColor="#aaa"
//             style={styles.input}
//             onSubmitEditing={sendMessage}
//             returnKeyType="send"
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
//             <Ionicons name="send" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     backgroundColor: "#E72929",
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginHorizontal: 12,
//   },
//   headerText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   chatContainer: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   message: {
//     padding: 12,
//     borderRadius: 16,
//     marginVertical: 6,
//     maxWidth: "80%",
//   },
//   userMessage: {
//     backgroundColor: "#E72929",
//     alignSelf: "flex-end",
//   },
//   botMessage: {
//     backgroundColor: "#F1F1F1",
//     alignSelf: "flex-start",
//   },
//   userText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     fontSize: 14,
//     color: "#000",
//   },
//   sendBtn: {
//     backgroundColor: "#E72929",
//     padding: 10,
//     borderRadius: 25,
//     marginLeft: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   typing: {
//     color: "#888",
//     fontStyle: "italic",
//     marginLeft: 18,
//     marginBottom: 4,
//   },
// });

// const markdownStyles = {
//   body: { color: "#000", fontSize: 14 },
//   heading1: { fontSize: 20, fontWeight: "700" as const, color: "#E72929" },
//   heading2: { fontSize: 18, fontWeight: "700" as const, color: "#E72929" },
//   heading3: { fontSize: 16, fontWeight: "700" as const, color: "#E72929" },
//   strong: { fontWeight: "700" as const },
//   list_item: { marginVertical: 2 },
// };
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   Keyboard,
//   KeyboardEvent
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import Markdown from "react-native-markdown-display";
// import { chatApi } from "../../services/api";

// const ChatScreen = () => {
//   const navigation = useNavigation();
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const flatListRef = useRef<FlatList<any>>(null);

//   const [keyboardVisible, setKeyboardVisible] = useState(false);

// useEffect(() => {
//   const showSub = Keyboard.addListener("keyboardDidShow", () =>
//     setKeyboardVisible(true)
//   );
//   const hideSub = Keyboard.addListener("keyboardDidHide", () =>
//     setKeyboardVisible(false)
//   );

//   return () => {
//     showSub.remove();
//     hideSub.remove();
//   };
// }, []);

//   const sendMessage = async () => {
//     if (input.trim() === "") return;
//     Keyboard.dismiss();

//     const userMsg = { from: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const reply = await chatApi.sendMessage(input);
//       const botMsg = { from: "bot", text: reply };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setIsTyping(false);
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   };

//   return (
    
//       <View className="flex-1 bg-white">
//       {/* Header */}
//       <View className="bg-red-600 pt-14 pb-4 px-4 flex-row items-center">
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Image
//           source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
//           className="w-9 h-9 rounded-full mx-3"
//         />
//         <Text className="text-white text-lg font-semibold">Red Alert</Text>
//       </View>

//       {/* Chat Body */}
//       <View className="flex-1 justify-between">
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           keyExtractor={(_, i) => i.toString()}
//           renderItem={({ item }) => (
//             <View
//               className={`px-4 py-3 rounded-2xl my-1 max-w-[80%] ${
//                 item.from === "user"
//                   ? "bg-red-600 self-end"
//                   : "bg-gray-100 self-start"
//               }`}
//             >
//               {item.from === "bot" ? (
//                 <Markdown style={markdownStyles}>{item.text}</Markdown>
//               ) : (
//                 <Text className="text-white text-sm">{item.text}</Text>
//               )}
//             </View>
//           )}
//           contentContainerStyle={{ padding: 16 }}
//           onContentSizeChange={() =>
//             flatListRef.current?.scrollToEnd({ animated: true })
//           }
//         />

//         {/* Typing Indicator */}
//         {isTyping && (
//           <Text className="text-gray-500 italic ml-4 mb-1">
//             Red Alert is typing...
//           </Text>
//         )}

//         {/* Input Bar */}
//         {/* <View className="flex-row items-center p-3 border-t border-gray-300 bg-white "
//            style={{
//             marginBottom:120
//            }}>
//           <TextInput
//             value={input}
//             onChangeText={setInput}
//             placeholder="Type a message..."
//             placeholderTextColor="#aaa"
//             onSubmitEditing={sendMessage}
//             returnKeyType="send"
//             className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-black"
//           />
//           <TouchableOpacity
//             onPress={sendMessage}
//             className="bg-red-600 p-3 rounded-full ml-2"
//           >
//             <Ionicons name="send" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View> */}

//         <KeyboardAvoidingView
//   behavior={Platform.OS === "ios" ? "padding" : "height"}
//   keyboardVerticalOffset={Platform.OS === "ios" ? 200:300}
  
// >
//   <View className="flex-row items-center p-3 border-t border-gray-300 bg-white"   style={{
//       paddingBottom: keyboardVisible ? 0 : 120, // ← only add space when keyboard is hidden
//     }}>
//     <TextInput
//       value={input}
//       onChangeText={setInput}
//       placeholder="Type a message..."
//       placeholderTextColor="#aaa"
//       onSubmitEditing={sendMessage}
//       returnKeyType="send"
//        style={{ height: 50 }}
//       className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-black"
//     />
//     <TouchableOpacity
//       onPress={sendMessage}
//       className="bg-red-600 p-3 rounded-full ml-2"
//     >
//       <Ionicons name="send" size={20} color="#fff" />
//     </TouchableOpacity>
//   </View>
// </KeyboardAvoidingView>

//       </View>
//       </View>
    
//   );
// };

// export default ChatScreen;

// // Markdown styles
// const markdownStyles = {
//   body: { color: "#000", fontSize: 14 },
//   heading1: { fontSize: 20, fontWeight: "700" as const, color: "#E72929" },
//   heading2: { fontSize: 18, fontWeight: "700" as const, color: "#E72929" },
//   heading3: { fontSize: 16, fontWeight: "700" as const, color: "#E72929" },
//   strong: { fontWeight: "700" as const },
//   list_item: { marginVertical: 2 },
// };

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  Image,
  KeyboardAvoidingView,
  SafeAreaView
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { chatApi } from "../../services/api";
//import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm **Red Alert**, your blood donation assistant. Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 5}
    >
      <SafeAreaView className="flex-1 bg-white" >
        {/* Header */}
        <View className="bg-red-600 pt-10 pb-4 px-4 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://i.ibb.co/t3qqc3M/avatar.png" }}
            className="w-9 h-9 rounded-full mx-3"
          />
          <Text className="text-white text-lg font-semibold">Red Alert</Text>
        </View>

        {/* Chat + Input */}
        <View className="flex-1 justify-between">
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View
                className={`px-4 py-3 rounded-2xl my-1 max-w-[80%] ${
                  item.from === "user"
                    ? "bg-red-600 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                {item.from === "bot" ? (
                  <Markdown style={markdownStyles}>{item.text}</Markdown>
                ) : (
                  <Text className="text-white text-sm">{item.text}</Text>
                )}
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          {isTyping && (
            <Text className="text-gray-500 italic ml-4 mb-1">
              Red Alert is typing...
            </Text>
          )}

          {/* Input Bar */}
          <View
            className="flex-row items-center p-3 border-t border-gray-300 bg-white"
            style={{
              paddingBottom: keyboardVisible ? 0 : 130, // space for bottom nav when keyboard is hidden
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#aaa"
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              style={{ height: 50 }}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-black"
            />
            <TouchableOpacity
              onPress={sendMessage}
              className="bg-red-600 p-3 rounded-full ml-2"
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

// Markdown styles
const markdownStyles = {
  body: { color: "#000", fontSize: 14 },
  heading1: { fontSize: 20, fontWeight: "700" as const, color: "#E72929" },
  heading2: { fontSize: 18, fontWeight: "700" as const, color: "#E72929" },
  heading3: { fontSize: 16, fontWeight: "700" as const, color: "#E72929" },
  strong: { fontWeight: "700" as const },
  list_item: { marginVertical: 2 },
};

