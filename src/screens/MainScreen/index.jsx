import React, { useEffect, useState } from "react";
import styles from "./MainScreen.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Microphone } from "../../assets/icons/microphone.svg";
import { ReactComponent as Send } from "../../assets/icons/send.svg";
import { ReactComponent as Thunder } from "../../assets/icons/thunder.svg";
import { ReactComponent as Avatar } from "../../assets/icons/avatar.svg";
import { ReactComponent as SmallAvatar } from "../../assets/icons/avatar-small.svg";
import { ReactComponent as Text } from "../../assets/icons/text.svg";
import { ReactComponent as Caution } from "../../assets/icons/caution.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const smallHours = hours % 12 || 12;
  const formattedHours = smallHours < 10 ? `0${smallHours}` : smallHours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return currentTime;
}

const chatBotResponses = [
  "Hello ! Nazrul How are you?",
  "Have a great working week!!",
  "Hope you like it",
  "This project is created bu Ayush (dhanrajaayush123@gmail.com)",
  "Ayush (dhanrajaayush123@gmail.com) is from Lucknow and loves web development ",
  "I request to consider Ayush Dhanraj dhanrajaayush123@gmail.com for this role",
];

const MainScreen = () => {
  const [messages, setMessages] = useState([]);
  const [enteredValue, setEnteredValue] = useState("");
  const [isHindi, setIsHindi] = useState(true);

  const navigate = useNavigate();

  const translate = async (input) => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", isHindi ? "hi" : "en");
    params.append("target", isHindi ? "en" : "hi");
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    let returnValue;

    try {
      const response = await axios.post(
        "https://libretranslate.de/translate",
        params,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      returnValue = response.data.translatedText;
    } catch (error) {
      returnValue = "can't translate";
    }

    return returnValue;
  };

  const getChatBotResponses = () => {
    const count = Math.floor(Math.random() * 2);
    const shuffledTexts = chatBotResponses.sort(() => Math.random() - 0.5);
    return shuffledTexts.slice(0, count || 1);
  };

  const handleSendMessage = () => {
    if (enteredValue) {
      const botResponses = getChatBotResponses().map((response) => {
        return { text: response, type: "bot", time: getCurrentTime() };
      });
      setMessages([
        ...messages,
        { text: enteredValue, type: "user", time: getCurrentTime() },
        ...botResponses,
      ]);
      setEnteredValue("");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTranslate = async () => {
    try {
      const translatedMessages = await Promise.all(
        messages.map(async (msg) => {
          const translatedText = await translate(msg.text);
          return { ...msg, text: translatedText };
        })
      );
      const allTranslationsSuccessful = translatedMessages.every(
        (message) => message.text !== "can't translate"
      );
      if (allTranslationsSuccessful) setMessages(translatedMessages);
      else alert("Free API used only 10 translations per min");
    } catch (error) {
      console.error("Error occurred during translation:", error);
    }
  };

  const DefaultView = () => {
    return (
      <div className={styles.defaultView}>
        <div className={styles.smgcontainer}>
          <SmallAvatar className={styles.nameAva} />
          <p className={[styles.msg, styles.botMsg].join(" ")}>
            🙏 Namaste! I'm Arya, your AI Vedic help. I'm here to provide
            insights from Vedas for daily life concerns. Whether you seek
            guidance on mantras, general life advice, or specific Vedic
            interpretations, I'm here to assist you.
          </p>
        </div>
        <div className={styles.chatBotinfoContainer}>
          <p className={styles.thunder}>
            <Thunder className={styles.infoIcon} /> You can ask queries like:
          </p>
          <div className={styles.infoText}>
            What is the mantra in Rigveda 10.2.3?
          </div>
          <div className={styles.infoText}>
            What are the prescribed Vedic remedies for snake bites?
          </div>
          <div className={styles.infoText}>
            Can you tell me the significance of the Gayatri Mantra?
          </div>
          <p className={styles.caution}>
            <Caution className={styles.infoIcon} /> Limitation: May struggle
            with complex queries.
          </p>
        </div>
        <div className={styles.smgcontainer}>
          <SmallAvatar className={styles.nameAva} />
          <p className={[styles.msg, styles.botMsg].join(" ")}>
            Let your curiosity guide you; wishing <br /> you blessings and
            enlightenment 🕉️
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    handleTranslate();
  }, [isHindi]);

  return (
    <div className={styles.mainScreenContainer}>
      <div className={styles.header}>
        <BackIcon onClick={handleBackClick} className={styles.backBtn} />
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <Avatar />
            <div className={styles.active} />
          </div>
          <div className={styles.nameSection}>
            <p className={styles.name}>Arya</p>
            <p className={styles.tag}>Vedic AI Bot</p>
          </div>
        </div>
        <Text
          className={styles.langBtn}
          onClick={() => setIsHindi((preV) => !preV)}
        />
      </div>
      <div className={styles.chatContainer}>
        <div>
          {messages.length === 0 ? (
            <DefaultView />
          ) : (
            <>
              <p className={styles.today}>Today</p>
              {messages.map((message, index) => (
                <div key={index} className={styles.parent}>
                  <div
                    className={[
                      styles.smgcontainer,
                      message.type === "user" ? styles.rightSide : "",
                    ].join(" ")}
                  >
                    {message.type === "bot" && (
                      <SmallAvatar className={styles.nameAva} />
                    )}
                    <p
                      className={[
                        styles.msg,
                        message.type === "user"
                          ? styles.userMsg
                          : styles.botMsg,
                        styles.botMsg,
                      ].join(" ")}
                    >
                      {message.text}
                      <p className={styles.chatTime}>{message.time}</p>
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.InputContainer}>
        <input
          type="text"
          placeholder="Write your message"
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
          className={styles.input}
        />
        <div className={styles.InputActions}>
          <Send onClick={handleSendMessage} />
          <Microphone />
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
