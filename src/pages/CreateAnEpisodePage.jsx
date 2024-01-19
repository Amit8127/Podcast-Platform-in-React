import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input/Input";
import FileInput from "../components/common/Input/FileInput";
import Button from "../components/common/Button/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // function for audio file setting
  const audioFileHandleFun = (file) => {
    setAudioFile(file);
  };

  // function for create episode page form
  const handleSubmit = async () => {
    setLoading(true);
    if ((title, desc, audioFile, id)) { // checking all fields are filled
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);

        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title,
          description: desc,
          audioFile: audioURL,
        };

        await addDoc(
          collection(db, "podcasts", id, "episodes"),
          episodeData
        );

        toast.success('Episode added successfully');
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle('');
        setDesc('');
        setAudioFile();
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Please enter all input fields");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="form">
        <h1 id="heading">Create An Episode</h1>
        <Input
          state={title}
          setState={setTitle}
          placeholder={"Title"}
          type="text"
          required={true}
        />
        <Input
          state={desc}
          setState={setDesc}
          placeholder={"Description"}
          type="text"
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          id={"audioFile"}
          fileHandleFun={audioFileHandleFun}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateAnEpisodePage;
