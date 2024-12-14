import { jwtDecode } from "jwt-decode";

export const getUsernameFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("Token bulunamadı!");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    ];
  } catch (error) {
    console.error("Token decode edilirken bir hata oluştu:", error);
    return null;
  }
};
