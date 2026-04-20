export function setItem<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item === null ? null : (JSON.parse(item) as T);
  } catch (error) {
    console.log(error);
    return null;
  }
}
