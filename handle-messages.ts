import icon from './icon.js';

class UpdateIconError extends Error {
  query: string;
  constructor(message: string, query: string) {
    super(message);
    this.query = query;
  }
}
interface UpdateIconRequest {
  action: 'updateIcon'
  mainColor: string,
  backgroundColor: string
}
interface ColorAPIResponse {
  hex: {
    clean: string
  }
}

async function updateIcon(request: any) {
  try {
    if (request.action !== 'updateIcon') return;
    const req = request as UpdateIconRequest;
    const mainColorPlaceholder = 'e2b714';
    const backgroundColorPlaceholder = '323437';
    console.log('recieved UpdateIconRequest, fetching hex colors');
    // convert rgb values to hex with the color api
    const query1 = `/id?rgb=${req.mainColor}`;
    const query2 = `/id?rgb=${req.backgroundColor}`;
    const colorAPIRequest1 = new Request(`https://www.thecolorapi.com${query1}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'applications/json' }),
    });
    const colorAPIRequest2 = new Request(`https://www.thecolorapi.com${query2}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'applications/json' }),
    });
    const response1 = await window.fetch(colorAPIRequest1);
    const response2 = await window.fetch(colorAPIRequest2);
    const mainColorValues: ColorAPIResponse = await response1.json();
    const backgroundColorValues: ColorAPIResponse = await response2.json();
    if (mainColorValues === null) {
      throw new UpdateIconError('failed to parse colorAPI response', query1);
    } else if (backgroundColorValues === null) {
      throw new UpdateIconError('failed to parse colorAPI response', query2);
    }
    const mainColor = mainColorValues.hex.clean;
    const backgroundColor = backgroundColorValues.hex.clean;
    console.log('fetched', mainColor, backgroundColor);
    // modify the svg string with the new colors and update the browser action icon 
    const modifedIcon = icon
      .split(mainColorPlaceholder).join(mainColor)
      .split(backgroundColorPlaceholder).join(backgroundColor);
    const iconDataURI = `data:image/svg+xml;base64,${window.btoa(modifedIcon)}`;
    console.log('created iconDataURI', iconDataURI);
    browser.action.setIcon({ path: iconDataURI });
  } catch (error) {
    if (error instanceof UpdateIconError) {
      return error;
    } else {
      return new UpdateIconError((error as Error).message, 'n/a');
    }
  }
}
browser.runtime.onMessage.addListener(updateIcon); 
