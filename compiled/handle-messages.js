var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UpdateIconError = /** @class */ (function (_super) {
    __extends(UpdateIconError, _super);
    function UpdateIconError(message, query) {
        var _this = _super.call(this, message) || this;
        _this.query = query;
        return _this;
    }
    return UpdateIconError;
}(Error));
var svg = "<svg width=\"48\" height=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n<ellipse ry=\"24\" rx=\"24\" id=\"svg_17\" cy=\"24\" cx=\"24\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<path fill=\"#ff0000\" stroke=\"#323437\" stroke-width=\"0\" opacity=\"NaN\" d=\"m19.625,1.5625\" id=\"svg_14\"/>\n<rect rx=\"1\" stroke-width=\"0\" transform=\"rotate(-7.38187, 31.6587, 15.606) matrix(0.721599, -0.637918, 0.626134, 0.73518, -1.39676, 30.2705)\" id=\"svg_3\" height=\"4\" width=\"18\" y=\"9.29631\" x=\"27.00673\" stroke=\"#323437\" fill=\"#e2b714\"/>\n<rect rx=\"1\" transform=\"rotate(-0.907678, 17.4532, 19.9159) matrix(0.877908, 0.560044, -0.561508, 0.875619, 13.5008, -1.79466)\" id=\"svg_4\" height=\"4\" width=\"14\" y=\"13.55264\" x=\"7.44952\" stroke-width=\"0\" stroke=\"#323437\" fill=\"#e2b714\"/>\n<ellipse ry=\"4\" rx=\"4\" id=\"svg_5\" cy=\"24\" cx=\"24\" stroke-width=\"0\" stroke=\"#323437\" fill=\"#e2b714\"/>\n<path fill=\"#ff0000\" stroke=\"#323437\" stroke-width=\"0\" opacity=\"NaN\" d=\"m19.625,1.50008\" id=\"svg_16\"/>\n<ellipse stroke-width=\"0\" ry=\"22.5\" rx=\"22.5\" id=\"svg_15\" cy=\"24\" cx=\"24\" stroke=\"#fff\" fill=\"#323437\"/>\n<rect rx=\"1\" stroke-width=\"0\" transform=\"rotate(-7.38187, 31.6587, 15.5436) matrix(0.721599, -0.637918, 0.626134, 0.73518, -1.39676, 30.2705)\" id=\"svg_13\" height=\"4\" width=\"18\" y=\"9.24787\" x=\"27.04876\" stroke=\"#323437\" fill=\"#e2b714\"/>\n<rect rx=\"1\" transform=\"rotate(-0.907678, 17.4532, 19.8535) matrix(0.877908, 0.560044, -0.561508, 0.875619, 13.5008, -1.79466)\" id=\"svg_12\" height=\"4\" width=\"14\" y=\"13.50205\" x=\"7.41716\" stroke-width=\"0\" stroke=\"#323437\" fill=\"#e2b714\"/>\n<ellipse ry=\"4\" rx=\"4\" id=\"svg_11\" cy=\"23.93758\" cx=\"24\" stroke-width=\"0\" stroke=\"#323437\" fill=\"#e2b714\"/>\n<rect rx=\"1\" id=\"svg_20\" height=\"4\" width=\"1\" y=\"0.1875\" x=\"23.5\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect rx=\"1\" id=\"svg_21\" height=\"4\" width=\"1\" y=\"44\" x=\"23.5\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(-90, 45.8125, 24)\" rx=\"1\" id=\"svg_22\" height=\"4\" width=\"1\" y=\"22\" x=\"45.3125\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(90, 2.125, 24)\" rx=\"1\" id=\"svg_23\" height=\"4\" width=\"1\" y=\"22\" x=\"1.625\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(30, 34.9489, 5.13801)\" rx=\"1\" id=\"svg_36\" height=\"4\" width=\"1\" y=\"3.13801\" x=\"34.44894\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(30, 13.0427, 43.0807)\" rx=\"1\" id=\"svg_37\" height=\"4\" width=\"1\" y=\"41.08074\" x=\"12.54269\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(-60, 42.9329, 34.9344)\" rx=\"1\" id=\"svg_38\" height=\"4\" width=\"1\" y=\"32.93443\" x=\"42.43287\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(120, 5.09838, 13.0907)\" rx=\"1\" id=\"svg_39\" height=\"4\" width=\"1\" y=\"11.09068\" x=\"4.59838\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(60, 42.9557, 13.1677)\" rx=\"1\" id=\"svg_41\" height=\"4\" width=\"1\" y=\"11.16769\" x=\"42.45574\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(60, 5.01301, 35.0739)\" rx=\"1\" id=\"svg_42\" height=\"4\" width=\"1\" y=\"33.07394\" x=\"4.51301\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(-30, 34.9718, 42.9641)\" rx=\"1\" id=\"svg_43\" height=\"4\" width=\"1\" y=\"40.96412\" x=\"34.47182\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n<rect transform=\"rotate(150, 13.1281, 5.12963)\" rx=\"1\" id=\"svg_44\" height=\"4\" width=\"1\" y=\"3.12963\" x=\"12.62807\" stroke-width=\"0\" stroke=\"#fff\" fill=\"#e2b714\"/>\n</svg>";
function buildSVG(svg) {
    var namespace = 'http://www.w3.org/2000/svg';
    var root = document.createElementNS(namespace, 'svg');
    var shapes = svg.split('\n');
    shapes.forEach(function (shape, i) {
        if (i === shapes.length - 1)
            return;
        var j = shape.indexOf(' ');
        var tag = shape.substring(1, j++);
        if (tag === undefined)
            return;
        var element = i === 0 ? root : document.createElementNS(namespace, tag);
        var endTrimAmount = 1;
        if (root !== element)
            endTrimAmount++;
        while (j < shape.length - endTrimAmount) {
            var k = shape.indexOf('\"', shape.indexOf('\"', j) + 1) + 1;
            var component = shape.substring(j, k);
            j = k + 1;
            var _a = component.split('='), attribute = _a[0], value = _a[1];
            if (attribute === undefined || value === undefined)
                return;
            element.setAttribute(attribute, value.substring(1, value.length - 1));
        }
        if (i !== 0)
            root.appendChild(element);
    });
    return root;
}
var mainColorPlaceholder = 'e2b714';
var backgroundColorPlaceholder = '323437';
browser.runtime.onMessage.addListener(handleMessages);
function handleMessages(request) {
    return __awaiter(this, void 0, void 0, function () {
        var query1, query2, colorAPIRequest1, colorAPIRequest2, response1, response2, mainColorValues, backgroundColorValues, mainColor, backgroundColor, modifedSVG, icon, iconDataURI_1, iconRect, image_1, canvas, context_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(request.action === 'updateIcon')) return [3 /*break*/, 8];
                    console.log('recieved UpdateIconRequest, fetching hex colors');
                    query1 = "/id?rgb=".concat(request.mainColor);
                    query2 = "/id?rgb=".concat(request.backgroundColor);
                    colorAPIRequest1 = new Request("https://www.thecolorapi.com".concat(query1), {
                        method: 'GET',
                        headers: new Headers({ 'Content-Type': 'applications/json' }),
                    });
                    colorAPIRequest2 = new Request("https://www.thecolorapi.com".concat(query2), {
                        method: 'GET',
                        headers: new Headers({ 'Content-Type': 'applications/json' }),
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, window.fetch(colorAPIRequest1)];
                case 2:
                    response1 = _a.sent();
                    return [4 /*yield*/, window.fetch(colorAPIRequest2)];
                case 3:
                    response2 = _a.sent();
                    return [4 /*yield*/, response1.json()];
                case 4:
                    mainColorValues = _a.sent();
                    return [4 /*yield*/, response2.json()];
                case 5:
                    backgroundColorValues = _a.sent();
                    if (mainColorValues === null) {
                        throw new UpdateIconError('failed to parse colorAPI response', query1);
                    }
                    else if (backgroundColorValues === null) {
                        throw new UpdateIconError('failed to parse colorAPI response', query2);
                    }
                    mainColor = mainColorValues.hex.clean;
                    backgroundColor = backgroundColorValues.hex.clean;
                    console.log('fetched', mainColor, backgroundColor);
                    modifedSVG = svg
                        .split(mainColorPlaceholder).join(mainColor)
                        .split(backgroundColorPlaceholder).join(backgroundColor);
                    icon = buildSVG(modifedSVG);
                    iconDataURI_1 = "data:image/svg+xml;base64,".concat(window.btoa(modifedSVG));
                    console.log(iconDataURI_1);
                    iconRect = icon.getBoundingClientRect();
                    console.log('created new icon', icon);
                    image_1 = document.createElement('img');
                    canvas = document.createElement('canvas');
                    canvas.width = 48;
                    canvas.height = 48;
                    context_1 = canvas.getContext('2d');
                    if (context_1 === null) {
                        throw new UpdateIconError('canvas context is null', 'n/a');
                    }
                    image_1.addEventListener('load', function () {
                        context_1.drawImage(image_1, 0, 0, 48, 48);
                        var imageData = context_1.getImageData(0, 0, 48, 48);
                        // browser.action.setIcon({ imageData: { 48: imageData } })
                        browser.action.setIcon({ path: iconDataURI_1 })
                            .catch(function (error) {
                            console.error('failed to set icon', error);
                        });
                    });
                    image_1.addEventListener('error', function (error) {
                        throw new UpdateIconError("failed to load image, ".concat(error), 'n/a');
                    });
                    image_1.src = iconDataURI_1;
                    console.log('set src');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    if (error_1 instanceof UpdateIconError) {
                        return [2 /*return*/, error_1];
                    }
                    else {
                        return [2 /*return*/, new UpdateIconError(error_1.message, 'n/a')];
                    }
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
