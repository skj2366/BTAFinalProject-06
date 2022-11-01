export const storage = {
  set: async (key, data) => {
    chrome.storage.local.set({ [key]: JSON.stringify(data) }, () => {
      return data;
    });
  },
  get: async (key) => {
    chrome.storage.local.get([key], function (result) {
      return result;
    });
  }
}
