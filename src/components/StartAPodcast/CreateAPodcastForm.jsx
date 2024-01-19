import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import FileInput from "../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAPodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        // Uplod file -> get download links

        //Display image
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        //Banner image
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        // create a new doc in a new collection called podcast
        const podcastData = {
          title: title,
          description: desc,
          displayImage: displayImageUrl,
          bannerImage: bannerImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        console.log(docRef);
        setTitle("");
        setDesc("");
        setDisplayImage(null);
        setBannerImage(null);

        toast.success("Podcast updated successfully");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      }
      // save this new podcast states in out podcast
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandleFun = (file) => {
    setDisplayImage(file);
    console.log(displayImage);
    toast.success("Display Image Selected");
  };

  const bannerImageHandleFun = (file) => {
    setBannerImage(file);
    console.log(bannerImage);
    toast.success("Banner Image Selected");
  };

  return (
    <>
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
        accept={"image/*"}
        id={"proPic"}
        fileHandleFun={displayImageHandleFun}
      />
      <FileInput
        accept={"image/*"}
        id={"banPic"}
        fileHandleFun={bannerImageHandleFun}
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreateAPodcastForm;
