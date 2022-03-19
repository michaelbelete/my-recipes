/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { searchRecipes } from "./utils/queries.js";
import RecipeCard from "./components/RecipeCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Headers from "./components/Header.js";
import Footers from "./components/Footer.js";
export default function search() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { q } = useParams();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const submitData = async (e) => {
    e.preventDefault();
    navigate('/'+searchQuery, {replace: true});
  };

  return (
    <>
    <Headers header={false}/>
    <section className="bg-white py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href="/"
              id="recipes"
            >
              20 Result(s) Found
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
       

      </div>
    </section>
    <Footers />
    </>
  );
}
