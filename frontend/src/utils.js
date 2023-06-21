export function getCsrfTokenCookie() {
    // Get the cookie with the name 'csrftoken'
    const cookies = document.cookie.split(';');
    let csrfToken = null;
    cookies.forEach((cookie) => {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith('csrftoken=')) {
        csrfToken = trimmedCookie.substring('csrftoken='.length, trimmedCookie.length);
      }
    });
    return csrfToken;
};

export function getUser() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
};