import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import "stream-chat-react/dist/css/v2/index.css";
import "./App.css";

const cookies = new Cookies();

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [apiKey, setApiKey] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchApiKey = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://talkify-chat-app.onrender.com/get-api-key"
  //       );
  //       const text = await response.text();
  //       console.log(text);

  //       if (response.ok) {
  //         const data = JSON.parse(text);
  //         setApiKey(data.apiKey);
  //         setIsLoading(false);
  //       } else {
  //         console.error("Error fetching API key:", response.status, text);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching API key:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchApiKey();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const apiKey = "6hnaeh3756ny";

  const authToken = cookies.get("token");
  const client = StreamChat.getInstance(apiKey);

  if (authToken) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        fullName: cookies.get("fullName"),
        image: cookies.get("avatarURL"),
        hashedPassword: cookies.get("hashedPassword"),
        phoneNumber: cookies.get("phoneNumber"),
      },
      authToken
    );
  }

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
