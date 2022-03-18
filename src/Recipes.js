/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { fetchRecipes } from "./utils/queries.js";
// import RecipeCard from "./RecipeCard";

export default function recipes() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery("recipes", fetchRecipes, {
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.page ?? undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <h1>Recipes</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div>
          {data.pages.map((page) => (
            <Fragment key={page.page}>
              {page.posts.map((recipe) => (
                <p>{JSON.stringify(recipe)}</p>
              ))}
            </Fragment>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );
//   return (
//     <section className="bg-white py-8">
//       <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
//         <nav id="store" className="w-full z-30 top-0 px-6 py-1">
//           <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
//             <a
//               className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
//               href="/"
//             >
//               Recipes
//             </a>

//             <div className="flex items-center" id="store-nav-content">
//               <input
//                 type="text"
//                 className="border rounded py-1 px-3"
//                 placeholder="search recipe..."
//               />

//               <a
//                 className="pl-3 inline-block no-underline hover:text-black"
//                 href="/"
//               >
//                 <svg
//                   className="fill-current hover:text-black"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </nav>

//         {/* list our recipes */}
//         {/* <RecipeCard /> */}
//         <div className="w-full mt-10 lg:px-96 lg:mx-36 px-8">
//           <div className="bg-red-900 hover:bg-red-700 py-2 px-4 rounded-xl text-white">
//             <center>Load More</center>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
}
