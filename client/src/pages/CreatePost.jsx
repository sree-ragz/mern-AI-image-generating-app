import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import axios from "axios";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateImage, setGenerateImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {};

  const shareImg = async (e) => {
    e.preventDefault();
    if (form.photo) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://ai-server-dwye.onrender.com/api/v1/post",
          {
            name: form.name,
            prompt: form.prompt,
            photo: form.photo,
          }
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        alert("error");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please generate a pic");
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGenerateImage(true);
        const response = await axios.post(
          "https://ai-server-dwye.onrender.com/api/v1/ai",
          {
            prompt: form.prompt,
          }
        );
        const data = response.data;
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGenerateImage(false);
      }
    } else {
      alert("please enter something!....");
    }
  };
  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-extrabold text-[#222] text-[30px]">Create</h1>
        <p className="py-2 max-w[500px] text-[#666] text-[14px]">
          Create collection of imaginary images with creativity
        </p>
      </div>
      <form className="mt-16 w-full" onSubmit={onSubmit}>
        <FormField
          labelName="Your name"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="cazmero"
        />
        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          value={form.prompt}
          onChange={onChange}
          placeholder="panda mad scientist mixing sparkling chemicals, digital art"
          onSurpriseMe={onSurpriseMe}
        />
        <div className="relative text-sm border rounded-lg border-gray-300 text-gray-900 flex justify-center w-64 h-64 p-4 mt-50">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full obejct-contain"
            />
          ) : (
            <img
              src={preview}
              alt={"preview"}
              className="opacity-40 w-9/12 h-9/12 object-contain"
            />
          )}
          {generateImage && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
              <Loader />
            </div>
          )}
        </div>
        <div className="mt-5 ">
          <button
            disabled={generateImage ? true : false}
            type="button"
            onClick={generateImg}
            className={
              generateImage || loading
                ? "text-sm text-white bg-green-300 w-full sm-w-auto font-medium rounded-md px-5 py-2 text-center cursor-not-allowed cursor: not-allowed"
                : "text-sm text-white bg-green-500 w-full sm-w-auto font-medium rounded-md px-5 py-2 text-center"
            }
          >
            {generateImage ? "Generating..." : "Generate"}
          </button>
          <p className="text-sm py-2 text-[#666]">
            You can share it to the community
          </p>
          <button
            disabled={loading ? true : false}
            onClick={shareImg}
            type="button"
            className={
              generateImage || loading
                ? "text-sm text-white bg-[#ADD8E6] w-full sm-w-auto font-medium rounded-md px-5 py-2 text-center cursor-not-allowed cursor: not-allowed"
                : "text-sm text-white bg-[#6469ff] w-full sm-w-auto font-medium rounded-md px-5 py-2 text-center"
            }
          >
            {loading ? "sharing..." : "Share"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
