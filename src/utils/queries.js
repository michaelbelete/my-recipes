import axios from "axios";

const apiEndpoint = "https://www.larecipe.com/api/";

//fetch recipes from the api with infinite scroll
export async function fetchRecipes({ pageParam = null }) {
  let res;
  if (pageParam == null) {
    res = await axios.get(apiEndpoint + "recipes");
  } else {
    res = await axios.get(apiEndpoint + "recipes?page=" + pageParam);
  }
  return res.data;
}

//search recipes 
export async function searchRecipes({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_, q] = queryKey

  const res = await axios.get(apiEndpoint + "recipes?search=" + q);

  return res.data;
}
// export async function fetchRecipes({ pageParam = null }) {
//   let res;
//   if (pageParam == null) {
//     res = await axios.get(apiEndpoint + "recipes");
//   } else {
//     res = await axios.get(apiEndpoint + "recipes?page=" + pageParam);
//   }
//   return res.data;
// }