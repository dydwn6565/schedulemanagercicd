export const CheckLogin =()=>{
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("refreshToken") !== null
    ) {
      return true;
    } else {
      return false;
    }
}