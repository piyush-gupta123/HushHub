import React, { useEffect, useState } from "react";
import axios from "axios";
import SecretCard from "./SecretCard";

function Feed() {
  const [secrets, setSecrets] = useState();
  const getAllUsers = async () => {
    const res = await axios.get("https://hush-hub-api.vercel.app/secret");

    if (res.status !== 200) {
      return console.log("Some Error Occurred");
    }

    const data = res.data;
    // console.log(data)
    return data;
  };
  useEffect(() => {
    getAllUsers()
      .then((data) => setSecrets(data?.secrets))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex gap-10 justify-center items-center max-w-70">
      {secrets && secrets.map((item, index) => (
        <SecretCard data={item.value} key={index} />
      ))}
    </div>
  );
}

export default Feed;
