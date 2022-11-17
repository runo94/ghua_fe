export default function authHeader () {
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));

  if(user && user.token) {

    return {"x-auth-token": user.token}
  } else {
    return {};
  }
}