import { calculate } from './calculate';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'calculate') {
    const url = request.url;
    try {
      const result = await calculate(url);
      sendResponse({ result });
    } catch (error) {
      sendResponse({ error: 'Failed to calculate price' });
    }
  }
});