import React, { useState, useEffect } from "react";
import { FormField, Loader, Card } from "../components/index";
import axios from "axios";

const RenderCards = ({ data, title }) => {
  console.log(Object.keys(data).length);
  if (Object.keys(data).length > 0) {
    return data.map((post) => <Card post={post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      const searchResults = allPosts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResult(searchResults);
    }, 500);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchPosts = await axios.get("http://localhost:3000/api/v1/post");
        const result = await fetchPosts.data;
        setAllPosts(result.data);
        console.log(allPosts);
        console.log("posts  " + allPosts.length);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="max-w-3xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222] text-[30px]">
          The community Showcase
        </h1>
        <p className="py-2 max-w[500px] text-[#666] text-[14px]">
          Browse through a collection of imagination
        </p>
      </div>
      <div className="py-2">
        <FormField
          labelName="Search"
          type="text"
          name="searchText"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="search something"
        />
      </div>
      <div className="py-2">
        {loading ? (
          <div className="flex justify-center  ">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666] text-xl mb-3">
                showing results for{" "}
                <span className="text-[#222]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResult}
                  title="no search posts founds"
                />
              ) : (
                <RenderCards data={allPosts} title="no posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
