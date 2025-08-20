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
  },
  rgb: {
    r: number,
    g: number,
    b: number,
    value: `rgb(${number}, ${number}, ${number})`
  }
}

const svg =
  `<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
<ellipse ry="24" rx="24" id="svg_17" cy="24" cx="24" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<path fill="#ff0000" stroke="#323437" stroke-width="0" opacity="NaN" d="m19.625,1.5625" id="svg_14"/>
<rect rx="1" stroke-width="0" transform="rotate(-7.38187, 31.6587, 15.606) matrix(0.721599, -0.637918, 0.626134, 0.73518, -1.39676, 30.2705)" id="svg_3" height="4" width="18" y="9.29631" x="27.00673" stroke="#323437" fill="#e2b714"/>
<rect rx="1" transform="rotate(-0.907678, 17.4532, 19.9159) matrix(0.877908, 0.560044, -0.561508, 0.875619, 13.5008, -1.79466)" id="svg_4" height="4" width="14" y="13.55264" x="7.44952" stroke-width="0" stroke="#323437" fill="#e2b714"/>
<ellipse ry="4" rx="4" id="svg_5" cy="24" cx="24" stroke-width="0" stroke="#323437" fill="#e2b714"/>
<path fill="#ff0000" stroke="#323437" stroke-width="0" opacity="NaN" d="m19.625,1.50008" id="svg_16"/>
<ellipse stroke-width="0" ry="22.5" rx="22.5" id="svg_15" cy="24" cx="24" stroke="#fff" fill="#323437"/>
<rect rx="1" stroke-width="0" transform="rotate(-7.38187, 31.6587, 15.5436) matrix(0.721599, -0.637918, 0.626134, 0.73518, -1.39676, 30.2705)" id="svg_13" height="4" width="18" y="9.24787" x="27.04876" stroke="#323437" fill="#e2b714"/>
<rect rx="1" transform="rotate(-0.907678, 17.4532, 19.8535) matrix(0.877908, 0.560044, -0.561508, 0.875619, 13.5008, -1.79466)" id="svg_12" height="4" width="14" y="13.50205" x="7.41716" stroke-width="0" stroke="#323437" fill="#e2b714"/>
<ellipse ry="4" rx="4" id="svg_11" cy="23.93758" cx="24" stroke-width="0" stroke="#323437" fill="#e2b714"/>
<rect rx="1" id="svg_20" height="4" width="1" y="0.1875" x="23.5" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect rx="1" id="svg_21" height="4" width="1" y="44" x="23.5" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(-90, 45.8125, 24)" rx="1" id="svg_22" height="4" width="1" y="22" x="45.3125" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(90, 2.125, 24)" rx="1" id="svg_23" height="4" width="1" y="22" x="1.625" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(30, 34.9489, 5.13801)" rx="1" id="svg_36" height="4" width="1" y="3.13801" x="34.44894" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(30, 13.0427, 43.0807)" rx="1" id="svg_37" height="4" width="1" y="41.08074" x="12.54269" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(-60, 42.9329, 34.9344)" rx="1" id="svg_38" height="4" width="1" y="32.93443" x="42.43287" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(120, 5.09838, 13.0907)" rx="1" id="svg_39" height="4" width="1" y="11.09068" x="4.59838" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(60, 42.9557, 13.1677)" rx="1" id="svg_41" height="4" width="1" y="11.16769" x="42.45574" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(60, 5.01301, 35.0739)" rx="1" id="svg_42" height="4" width="1" y="33.07394" x="4.51301" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(-30, 34.9718, 42.9641)" rx="1" id="svg_43" height="4" width="1" y="40.96412" x="34.47182" stroke-width="0" stroke="#fff" fill="#e2b714"/>
<rect transform="rotate(150, 13.1281, 5.12963)" rx="1" id="svg_44" height="4" width="1" y="3.12963" x="12.62807" stroke-width="0" stroke="#fff" fill="#e2b714"/>
</svg>`;
function buildSVG(svg: string): SVGSVGElement {
  const namespace = 'http://www.w3.org/2000/svg';
  const root = document.createElementNS(namespace, 'svg');
  const shapes = svg.split('\n');
  shapes.forEach((shape, i) => {
    if (i === shapes.length - 1) return;
    let j = shape.indexOf(' ');
    const tag = shape.substring(1, j++);
    if (tag === undefined) return;
    const element = i === 0 ? root : document.createElementNS(namespace, tag);
    let endTrimAmount = 1;
    if (root !== element) endTrimAmount++;
    while (j < shape.length - endTrimAmount) {
      const k = shape.indexOf('\"', shape.indexOf('\"', j) + 1) + 1;
      const component = shape.substring(j, k);
      j = k + 1;
      const [attribute, value] = component.split('=');
      if (attribute === undefined || value === undefined) return;
      element.setAttribute(attribute, value.substring(1, value.length - 1));
    }
    if (i !== 0) root.appendChild(element);
  });
  return root;
}
const mainColorPlaceholder = 'e2b714';
const backgroundColorPlaceholder = '323437';
browser.runtime.onMessage.addListener(handleMessages);

async function handleMessages(request: UpdateIconRequest) {
  if (request.action === 'updateIcon') {
    console.log('recieved UpdateIconRequest, fetching hex colors');
    // convert rgb values to hex with the color api
    const query1 = `/id?rgb=${request.mainColor}`;
    const query2 = `/id?rgb=${request.backgroundColor}`;
    const colorAPIRequest1 = new Request(`https://www.thecolorapi.com${query1}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'applications/json' }),
    });
    const colorAPIRequest2 = new Request(`https://www.thecolorapi.com${query2}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'applications/json' }),
    });
    try {
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
      // create an svg with the new colors and update the browser action icon 
      const modifedSVG = svg
        .split(mainColorPlaceholder).join(mainColor)
        .split(backgroundColorPlaceholder).join(backgroundColor);
      const icon = buildSVG(modifedSVG);
      const iconDataURI = `data:image/svg+xml;base64,${window.btoa(modifedSVG)}`;
      console.log(iconDataURI);
      const iconRect = icon.getBoundingClientRect();
      console.log('created new icon', icon);
      const image = document.createElement('img');
      const canvas = document.createElement('canvas');
      canvas.width = 48;
      canvas.height = 48;
      const context = canvas.getContext('2d');
      if (context === null) {
        throw new UpdateIconError('canvas context is null', 'n/a');
      }
      image.addEventListener('load', () => {
        context.drawImage(image, 0, 0, 48, 48);
        const imageData = context.getImageData(0, 0, 48, 48);
        // browser.action.setIcon({ imageData: { 48: imageData } })
        browser.action.setIcon({ path: iconDataURI })
          .catch((error) => {
            console.error('failed to set icon', error);
          });
      });
      image.addEventListener('error', (error) => {
        throw new UpdateIconError(`failed to load image, ${error}`, 'n/a')
      });
      image.src = iconDataURI;
      console.log('set src');
    } catch (error) {
      if (error instanceof UpdateIconError) {
        return error;
      } else {
        return new UpdateIconError((error as Error).message, 'n/a');
      }
    }
  } else {
    // handle other actions here
  }
}
