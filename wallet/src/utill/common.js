export const storage = {
  set: async (key, data) => {
    chrome.storage.local.set({ [key]: JSON.stringify(data) }, () => {
      return data;
    });
  },
  get: async (key) => {
    chrome.storage.local.get([key], function (result) {
      // return new Promise(resolve => resolve(result));
      return result;
    });
  },
  remove: async (key) => {
    chrome.storage.local.remove([key], function (result) {
      return result;
    });
  }
}
