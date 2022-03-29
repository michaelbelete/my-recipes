/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchRecipes } from "./utils/queries.js";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Headers from "./components/Header.js";
import Footers from "./components/Footer.js";
export default function search() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { q } = useParams();

  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  //   const { status, data, error } = useQuery(['recipes', q], searchRecipes)
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["recipes", q], searchRecipes, {
    getNextPageParam: (lastPage) => lastPage.page ?? undefined,
  });

  const resultCount = data?.pages[0].posts.length;
  const submitData = async (e) => {
    e.preventDefault();
    navigate("/" + searchQuery, { replace: true });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <Headers header={false} />
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="/"
                id="recipes"
              >
                {resultCount} Result(s) Found
              </a>

              <form
                onSubmit={submitData}
                className="flex items-center"
                id="store-nav-content"
              >
                <input
                  type="text"
                  className="border rounded py-1 px-3"
                  placeholder="search recipe..."
                  value={searchQuery}
                  required
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                  disabled={searchQuery == null}
                  type="submit"
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="/"
                >
                  <AiOutlineSearch size={25} />
                </button>
              </form>
            </div>
          </nav>
          {status === "loading" ? (
            <div className="w-full mt-10 lg:px-96 lg:mx-36 px-8">
              <center>
                <div className="text-xl font-bold px-5">Loading recipes...</div>
              </center>
            </div>
          ) : status === "error" ? (
            <div className="w-full mt-10 lg:px-96 lg:mx-36 px-8">
              <center>
                <div className="text-lg px-5">
                  Error refresh your page: {error.message}
                </div>
              </center>
            </div>
          ) : (
            <>
              {data.pages.map((page) => (
                <>
                  {page.posts.map((recipe) => (
                    <RecipeCard post={recipe} />
                  ))}
                </>
              ))}
              <div className="w-full mt-10 lg:px-96 lg:mx-36 px-8">
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  className="bg-blue-900 hover:bg-blue-700 py-2 px-4 rounded-xl text-white"
                >
                  <center>
                    {isFetchingNextPage
                      ? "Loading more..."
                      : hasNextPage
                      ? "Load Newer"
                      : "Nothing more to load"}
                  </center>
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <Footers />
    </>
  );
}
