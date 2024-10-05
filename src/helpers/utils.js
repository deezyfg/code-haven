export function utf8_to_b64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)));
}

export function utf8_to_b64_safe(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

export function b64_to_utf8_safe(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}
