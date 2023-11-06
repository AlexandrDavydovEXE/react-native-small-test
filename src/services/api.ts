const BASE_URL = "https://api.themoviedb.org/3/";
const ACCOUNT_ID = "8487708";
const API_KEY = "bbe220c0cdf3879ab4296132d5764264";
const SESSION_ID = "dde06139373c7b9299d9871ed07a8f4ebc528208";
//move const to .env file in real project

const loadData = async (currentPage: number) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return fetch(
    `${BASE_URL}account/${ACCOUNT_ID}/lists?page=${currentPage}&session_id=${SESSION_ID}&api_key=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => res.results)
    .catch((error) => error);
};

const saveData = async (name: string, desc: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${API_KEY}`);

  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("description", desc);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    `${BASE_URL}list?api_key=${API_KEY}&session_id=${SESSION_ID}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => error);
};

export { loadData, saveData };
