export const setCookie = async (cname, cvalue, exday = null) => {
  const d = new Date();
  if (exday == null) {
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    exday = await d.toUTCString();
  } else {
    d.setTime(d.getTime() + exday * 60 * 1000);
    exday = await d.toUTCString();
  }
  document.cookie =
    (await cname) + "=" + cvalue + ";" + "expires=" + exday + ";path=/";
};

export async function getCookie(name) {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}

export const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
