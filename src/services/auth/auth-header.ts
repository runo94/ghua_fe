export default function authHeader () {
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));

  if(user && user.accessToken) {

    return {"x-auth-token": user.accessToken}
  } else {
    return {};
  }
}