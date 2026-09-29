//#region \0rolldown/runtime.js
var __defProp$1 = Object.defineProperty;
var __exportAll$1 = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp$1(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp$1(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/.pnpm/@carry0987+utils@4.1.0/node_modules/@carry0987/utils/dist/browser.js
var browser_exports = /* @__PURE__ */ __exportAll$1({
	addClass: () => addClass,
	addEventListener: () => addEventListener,
	appendFormData: () => appendFormData,
	assertNever: () => assertNever,
	bodyToURLParams: () => bodyToURLParams,
	buildRules: () => buildRules,
	commonUtils: () => browserCommon_exports,
	compatInsertRule: () => compatInsertRule,
	createElem: () => createElem,
	createEvent: () => createEvent,
	debounce: () => debounce,
	decodeFormData: () => decodeFormData,
	deepClone: () => deepClone,
	deepEqual: () => deepEqual,
	deepMerge: () => deepMerge,
	dispatchEvent: () => dispatchEvent,
	doFetch: () => doFetch,
	domUtils: () => domUtils_exports,
	encodeFormData: () => encodeFormData,
	errorUtils: () => errorUtils_exports,
	eventUtils: () => eventUtils_exports,
	executeUtils: () => executeUtils_exports,
	fetchData: () => fetchData,
	fetchUtils: () => fetchUtils_exports,
	findChild: () => findChild,
	findChilds: () => findChilds,
	findParent: () => findParent,
	findParents: () => findParents,
	formDataToURLParams: () => formDataToURLParams,
	formUtils: () => formUtils_exports,
	generateRandom: () => generateRandom,
	generateUUID: () => generateUUID,
	getCookie: () => getCookie,
	getElem: () => getElem,
	getHashParam: () => getHashParam,
	getLocalValue: () => getLocalValue,
	getSessionValue: () => getSessionValue,
	getUrlParam: () => getUrlParam,
	hasChild: () => hasChild,
	hasClass: () => hasClass,
	hasParent: () => hasParent,
	injectStylesheet: () => injectStylesheet,
	insertAfter: () => insertAfter,
	insertBefore: () => insertBefore,
	isArray: () => isArray,
	isBoolean: () => isBoolean,
	isDefined: () => isDefined,
	isEmpty: () => isEmpty,
	isFunction: () => isFunction,
	isNumber: () => isNumber,
	isObject: () => isObject,
	isString: () => isString,
	isValidURL: () => isValidURL,
	removeClass: () => removeClass,
	removeCookie: () => removeCookie,
	removeEventListener: () => removeEventListener,
	removeLocalValue: () => removeLocalValue,
	removeSessionValue: () => removeSessionValue,
	removeStylesheet: () => removeStylesheet,
	replaceRule: () => replaceRule,
	reportError: () => reportError,
	sendData: () => sendData,
	sendForm: () => sendForm,
	sendFormData: () => sendFormData,
	setCookie: () => setCookie,
	setHashParam: () => setHashParam,
	setLocalValue: () => setLocalValue,
	setReplaceRule: () => setReplaceRule,
	setSessionValue: () => setSessionValue,
	setStylesheetId: () => setStylesheetId,
	setUrlParam: () => setUrlParam,
	shallowClone: () => shallowClone,
	shallowEqual: () => shallowEqual,
	shallowMerge: () => shallowMerge,
	storageUtils: () => storageUtils_exports,
	stylesheetId: () => stylesheetId,
	templateToHtml: () => templateToHtml,
	throttle: () => throttle,
	throwError: () => throwError,
	toggleClass: () => toggleClass,
	version: () => version
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function getWindowSafe() {
	return typeof window === "undefined" ? null : window;
}
function getDocumentSafe() {
	return typeof document === "undefined" ? null : document;
}
function getLocationHrefSafe() {
	return getWindowSafe()?.location?.href ?? null;
}
function getLocalStorageSafe() {
	const currentWindow = getWindowSafe();
	if (!currentWindow) return null;
	try {
		return currentWindow.localStorage;
	} catch {
		return null;
	}
}
function getSessionStorageSafe() {
	const currentWindow = getWindowSafe();
	if (!currentWindow) return null;
	try {
		return currentWindow.sessionStorage;
	} catch {
		return null;
	}
}
function getCustomEventSafe() {
	return typeof CustomEvent === "undefined" ? null : CustomEvent;
}
function getNodeSafe() {
	return typeof Node === "undefined" ? null : Node;
}
function getHtmlTemplateElementSafe() {
	return typeof HTMLTemplateElement === "undefined" ? null : HTMLTemplateElement;
}
function createUrl(source) {
	try {
		return new URL(source);
	} catch {
		const currentHref = getLocationHrefSafe();
		if (currentHref) return new URL(source, currentHref);
		throw new TypeError(`Unable to resolve URL without a browser base: ${source}`);
	}
}
function isDefined(v) {
	return v !== null && v !== void 0;
}
function isObject(item) {
	return typeof item === "object" && item !== null && !isArray(item);
}
function isFunction(item) {
	return typeof item === "function";
}
function isString(item) {
	return typeof item === "string";
}
function isNumber(item) {
	return typeof item === "number";
}
function isBoolean(item) {
	return typeof item === "boolean";
}
function isArray(item) {
	return Array.isArray(item);
}
function isEmpty(value) {
	if (typeof value === "number") return false;
	if (typeof value === "string" && value.length === 0) return true;
	if (isArray(value) && value.length === 0) return true;
	if (isObject(value) && Object.keys(value).length === 0) return true;
	return !value;
}
function assertNever(x, msg = "Unexpected value") {
	throw new Error(`${msg}: ${x}`);
}
function deepMerge(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();
	if (source) {
		for (const key in source) if (Object.hasOwn(source, key)) {
			const value = source[key];
			const targetKey = key;
			if (isObject(value) || isArray(value)) {
				if (!target[targetKey] || typeof target[targetKey] !== "object") target[targetKey] = isArray(value) ? [] : {};
				deepMerge(target[targetKey], value);
			} else target[targetKey] = value;
		}
	}
	return deepMerge(target, ...sources);
}
function shallowMerge(target, ...sources) {
	sources.forEach((source) => {
		if (source) Object.keys(source).forEach((key) => {
			const targetKey = key;
			target[targetKey] = source[targetKey];
		});
	});
	return target;
}
function deepClone(obj) {
	let clone;
	if (isArray(obj)) clone = obj.map((item) => deepClone(item));
	else if (isObject(obj)) {
		const objectClone = { ...obj };
		for (const key in objectClone) if (Object.hasOwn(objectClone, key)) objectClone[key] = deepClone(objectClone[key]);
		clone = objectClone;
	} else clone = obj;
	return clone;
}
function shallowClone(obj) {
	if (isObject(obj) || isArray(obj)) {
		const sourceObject = obj;
		const clone = isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
		for (const key in sourceObject) if (Object.hasOwn(sourceObject, key)) {
			const value = sourceObject[key];
			clone[key] = isObject(value) ? shallowClone(value) : isArray(value) ? [...value] : value;
		}
		return clone;
	}
	return obj;
}
function deepEqual(obj1, obj2) {
	if (typeof obj1 !== typeof obj2) return false;
	if (obj1 === null || obj2 === null) return obj1 === obj2;
	if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) return obj1 === obj2;
	if (obj1 instanceof Date && obj2 instanceof Date) return obj1.getTime() === obj2.getTime();
	if (Array.isArray(obj1) && Array.isArray(obj2)) {
		if (obj1.length !== obj2.length) return false;
		return obj1.every((item, index) => deepEqual(item, obj2[index]));
	}
	if (Array.isArray(obj1) || Array.isArray(obj2)) return false;
	if (obj1 instanceof Set && obj2 instanceof Set) {
		if (obj1.size !== obj2.size) return false;
		for (const item of obj1) if (!obj2.has(item)) return false;
		return true;
	}
	if (obj1 instanceof Map && obj2 instanceof Map) {
		if (obj1.size !== obj2.size) return false;
		for (const [key, value] of obj1) if (!deepEqual(value, obj2.get(key))) return false;
		return true;
	}
	if (Object.getPrototypeOf(obj1) !== Object.getPrototypeOf(obj2)) return false;
	const keys1 = Reflect.ownKeys(obj1);
	const keys2 = Reflect.ownKeys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) if (!deepEqual(obj1[key], obj2[key])) return false;
	return true;
}
function shallowEqual(obj1, obj2) {
	if (typeof obj1 !== typeof obj2) return false;
	if (obj1 === null || obj2 === null) return obj1 === obj2;
	if (obj1 === obj2) return true;
	if (typeof obj1 !== "object" || typeof obj2 !== "object") return obj1 === obj2;
	const keys1 = Reflect.ownKeys(obj1);
	const keys2 = Reflect.ownKeys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const key of keys1) if (obj1[key] !== obj2[key]) return false;
	return true;
}
function generateRandom(length = 8) {
	let result = "";
	const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = 36;
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		result += characters[randomIndex];
	}
	return result;
}
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
function isValidURL(url) {
	try {
		new URL(url);
		return true;
	} catch (_) {
		return false;
	}
}
function getUrlParam(sParam, url) {
	const sourceUrl = url ?? getLocationHrefSafe();
	if (!sourceUrl) return null;
	const searchIndex = sourceUrl.indexOf("?");
	if (searchIndex === -1) return null;
	const hashIndex = sourceUrl.indexOf("#");
	const searchPart = hashIndex !== -1 && hashIndex > searchIndex ? sourceUrl.substring(searchIndex, hashIndex) : sourceUrl.substring(searchIndex);
	const paramValue = new URLSearchParams(searchPart).get(sParam);
	return paramValue === null ? null : decodeURIComponent(paramValue);
}
function getHashParam(sParam = null, url) {
	const sourceUrl = url ?? getLocationHrefSafe();
	if (!sourceUrl) return null;
	const hashIndex = sourceUrl.indexOf("#");
	if (hashIndex === -1) return null;
	const hashPart = sourceUrl.substring(hashIndex + 1);
	if (sParam === null) {
		const firstSegment = hashPart.split("&")[0];
		if (!firstSegment.includes("=")) return decodeURIComponent(firstSegment);
		return null;
	}
	const paramValue = new URLSearchParams(hashPart).get(sParam);
	return paramValue === null ? null : decodeURIComponent(paramValue);
}
function setUrlParam(url, params, overwrite = true) {
	let originalUrl;
	let ignoreArray = [];
	if (typeof url === "object") {
		originalUrl = url.url;
		if (Array.isArray(url.ignore)) ignoreArray = url.ignore.map((part) => {
			return part.startsWith("?") || part.startsWith("&") ? part.substring(1) : part;
		});
		else if (typeof url.ignore === "string") {
			let part = url.ignore;
			if (part.startsWith("?") || part.startsWith("&")) part = part.substring(1);
			ignoreArray.push(part);
		}
	} else originalUrl = url;
	const urlObj = createUrl(originalUrl);
	if (params === null) {
		urlObj.search = "";
		return urlObj.toString();
	}
	const searchString = urlObj.search.substring(1);
	const paramsList = searchString.length > 0 ? searchString.split("&") : [];
	const ignoredParams = [];
	const otherParams = [];
	for (const param of paramsList) if (ignoreArray.includes(param)) ignoredParams.push(param);
	else otherParams.push(param);
	const urlSearchParams = new URLSearchParams(otherParams.join("&"));
	for (const [paramName, paramValue] of Object.entries(params)) {
		const valueStr = paramValue === null ? "" : String(paramValue);
		if (!overwrite && urlSearchParams.has(paramName)) continue;
		urlSearchParams.set(paramName, valueStr);
	}
	const finalSearchString = ignoredParams.concat(urlSearchParams.toString().split("&").filter((p) => p)).join("&");
	urlObj.search = finalSearchString ? `?${finalSearchString}` : "";
	return urlObj.toString();
}
function setHashParam(url, params = null, overwrite = true) {
	let originalUrl;
	let ignoreArray = [];
	if (typeof url === "object") {
		originalUrl = url.url;
		if (Array.isArray(url.ignore)) ignoreArray = url.ignore.map((part) => {
			return part.startsWith("#") || part.startsWith("&") ? part.substring(1) : part;
		});
		else if (typeof url.ignore === "string") {
			let part = url.ignore;
			if (part.startsWith("#") || part.startsWith("&")) part = part.substring(1);
			ignoreArray.push(part);
		}
	} else originalUrl = url;
	const urlObj = createUrl(originalUrl);
	if (params === null) {
		urlObj.hash = "";
		return urlObj.toString();
	}
	if (typeof params === "string") {
		const hashString = urlObj.hash.substring(1);
		const paramsList = hashString.length > 0 ? hashString.split("&") : [];
		const ignoredParams = [];
		for (const param of paramsList) if (ignoreArray.includes(param)) ignoredParams.push(param);
		urlObj.hash = `#${(ignoredParams.length > 0 ? [...ignoredParams, params] : [params]).join("&")}`;
		return urlObj.toString();
	}
	const hashString = urlObj.hash.substring(1);
	const paramsList = hashString.length > 0 ? hashString.split("&") : [];
	const ignoredParams = [];
	const otherParams = [];
	for (const param of paramsList) if (ignoreArray.includes(param)) ignoredParams.push(param);
	else otherParams.push(param);
	const urlSearchParams = new URLSearchParams(otherParams.join("&"));
	for (const [paramName, paramValue] of Object.entries(params)) {
		const valueStr = paramValue === null ? "" : String(paramValue);
		if (!overwrite && urlSearchParams.has(paramName)) continue;
		urlSearchParams.set(paramName, valueStr);
	}
	const finalHashString = ignoredParams.concat(urlSearchParams.toString().split("&").filter((p) => p)).join("&");
	urlObj.hash = finalHashString ? `#${finalHashString}` : "";
	return urlObj.toString();
}
let stylesheetId = "utils-style";
const replaceRule = {
	from: ".utils",
	to: ".utils-"
};
function setStylesheetId(id) {
	stylesheetId = id;
}
function setReplaceRule(from, to) {
	replaceRule.from = from;
	replaceRule.to = to;
}
function injectStylesheet(stylesObject, id = null) {
	const currentDocument = getDocumentSafe();
	if (!currentDocument?.head) return;
	id = isEmpty(id) ? "" : id;
	const style = currentDocument.createElement("style");
	style.id = stylesheetId + id;
	style.textContent = "";
	currentDocument.head.append(style);
	const stylesheet = style.sheet;
	if (!stylesheet) return;
	for (const selector in stylesObject) if (Object.hasOwn(stylesObject, selector)) compatInsertRule(stylesheet, selector, buildRules(stylesObject[selector]), id);
}
function buildRules(ruleObject) {
	let ruleSet = "";
	for (let [property, value] of Object.entries(ruleObject)) {
		property = property.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
		ruleSet += `${property}:${value};`;
	}
	return ruleSet;
}
function compatInsertRule(stylesheet, selector, cssText, id = null) {
	id = isEmpty(id) ? "" : id;
	const modifiedSelector = selector.replace(replaceRule.from, replaceRule.to + id);
	stylesheet.insertRule(`${modifiedSelector}{${cssText}}`, 0);
}
function removeStylesheet(id = null) {
	const currentDocument = getDocumentSafe();
	if (!currentDocument) return;
	const styleId = isEmpty(id) ? "" : id;
	const styleElement = currentDocument.getElementById(stylesheetId + styleId);
	if (styleElement?.parentNode) styleElement.parentNode.removeChild(styleElement);
}
var browserCommon_exports = /* @__PURE__ */ __exportAll({
	assertNever: () => assertNever,
	buildRules: () => buildRules,
	compatInsertRule: () => compatInsertRule,
	deepClone: () => deepClone,
	deepEqual: () => deepEqual,
	deepMerge: () => deepMerge,
	generateRandom: () => generateRandom,
	generateUUID: () => generateUUID,
	getHashParam: () => getHashParam,
	getUrlParam: () => getUrlParam,
	injectStylesheet: () => injectStylesheet,
	isArray: () => isArray,
	isBoolean: () => isBoolean,
	isDefined: () => isDefined,
	isEmpty: () => isEmpty,
	isFunction: () => isFunction,
	isNumber: () => isNumber,
	isObject: () => isObject,
	isString: () => isString,
	isValidURL: () => isValidURL,
	removeStylesheet: () => removeStylesheet,
	replaceRule: () => replaceRule,
	setHashParam: () => setHashParam,
	setReplaceRule: () => setReplaceRule,
	setStylesheetId: () => setStylesheetId,
	setUrlParam: () => setUrlParam,
	shallowClone: () => shallowClone,
	shallowEqual: () => shallowEqual,
	shallowMerge: () => shallowMerge,
	stylesheetId: () => stylesheetId
});
const version = "4.1.0";
var errorUtils_exports = /* @__PURE__ */ __exportAll({
	reportError: () => reportError,
	throwError: () => throwError
});
function reportError(...error) {
	console.error(...error);
}
function throwError(message) {
	throw new Error(message);
}
var domUtils_exports = /* @__PURE__ */ __exportAll({
	addClass: () => addClass,
	createElem: () => createElem,
	findChild: () => findChild,
	findChilds: () => findChilds,
	findParent: () => findParent,
	findParents: () => findParents,
	getElem: () => getElem,
	hasChild: () => hasChild,
	hasClass: () => hasClass,
	hasParent: () => hasParent,
	insertAfter: () => insertAfter,
	insertBefore: () => insertBefore,
	removeClass: () => removeClass,
	templateToHtml: () => templateToHtml,
	toggleClass: () => toggleClass
});
function requireDocument() {
	const currentDocument = getDocumentSafe();
	if (!currentDocument) throwError("DOM utilities require a browser document");
	return currentDocument;
}
function getElem(ele, mode, parent) {
	if (typeof ele !== "string") return ele;
	const currentDocument = requireDocument();
	const NodeCtor = getNodeSafe();
	let searchContext = currentDocument;
	if (mode === null && parent) searchContext = parent;
	else if (mode && NodeCtor && mode instanceof NodeCtor && "querySelector" in mode) searchContext = mode;
	else if (parent && NodeCtor && parent instanceof NodeCtor && "querySelector" in parent) searchContext = parent;
	return mode === "all" ? searchContext.querySelectorAll(ele) : searchContext.querySelector(ele);
}
function createElem(tagName, attrs = {}, text = "") {
	const elem = requireDocument().createElement(tagName);
	for (const attr in attrs) if (Object.hasOwn(attrs, attr)) {
		if (attr === "textContent" || attr === "innerText") elem.textContent = attrs[attr];
		else elem.setAttribute(attr, attrs[attr]);
	}
	if (text) elem.textContent = text;
	return elem;
}
function insertAfter(referenceNode, newNode) {
	if (typeof newNode === "string") {
		const elem = createElem("div");
		elem.innerHTML = newNode;
		newNode = elem.firstChild;
		if (!newNode) throwError("The new node (string) provided did not produce a valid DOM element.");
	}
	const parentNode = referenceNode.parentNode;
	if (!parentNode) throwError("The reference node must have a parent node.");
	parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function insertBefore(referenceNode, newNode) {
	if (typeof newNode === "string") {
		const elem = createElem("div");
		elem.innerHTML = newNode;
		newNode = elem.firstChild;
		if (!newNode) throwError("The new node (string) provided did not produce a valid DOM element.");
	}
	const parentNode = referenceNode.parentNode;
	if (!parentNode) throwError("The reference node must have a parent node.");
	parentNode.insertBefore(newNode, referenceNode);
}
function addClass(ele, className) {
	ele.classList.add(className);
	return ele;
}
function removeClass(ele, className) {
	ele.classList.remove(className);
	return ele;
}
function toggleClass(ele, className, force) {
	ele.classList.toggle(className, force);
	return ele;
}
function hasClass(ele, className) {
	return ele.classList.contains(className);
}
function hasParent(ele, selector, maxDepth = Infinity, returnElement = false) {
	let parent = ele.parentElement;
	let depth = 0;
	while (parent && depth < maxDepth) {
		if (parent.matches(selector)) return returnElement ? parent : true;
		parent = parent.parentElement;
		depth++;
	}
	return returnElement ? null : false;
}
function findParent(ele, selector) {
	return ele.closest(selector);
}
function findParents(ele, selector, maxDepth = Infinity) {
	const parents = [];
	let parent = ele.parentElement;
	let depth = 0;
	while (parent && depth < maxDepth) {
		if (parent.matches(selector)) parents.push(parent);
		parent = parent.parentElement;
		depth++;
	}
	return parents;
}
function hasChild(ele, selector) {
	return ele.querySelector(selector) !== null;
}
function findChild(ele, selector) {
	return ele.querySelector(selector);
}
function findChilds(ele, selector, maxDepth = Infinity) {
	const results = [];
	function recursiveFind(element, depth) {
		if (depth > maxDepth) return;
		Array.from(element.children).forEach((child) => {
			if (child.matches(selector)) results.push(child);
			recursiveFind(child, depth + 1);
		});
	}
	recursiveFind(ele, 0);
	return results;
}
function templateToHtml(templateElem) {
	const currentDocument = requireDocument();
	const HtmlTemplateElementCtor = getHtmlTemplateElementSafe();
	let sourceElem;
	if (HtmlTemplateElementCtor && templateElem instanceof HtmlTemplateElementCtor) sourceElem = templateElem.content.cloneNode(true);
	else sourceElem = templateElem;
	const tempDiv = currentDocument.createElement("div");
	tempDiv.appendChild(sourceElem);
	return tempDiv.innerHTML;
}
var eventUtils_exports = /* @__PURE__ */ __exportAll({
	addEventListener: () => addEventListener,
	createEvent: () => createEvent,
	dispatchEvent: () => dispatchEvent,
	removeEventListener: () => removeEventListener
});
function addEventListener(element, eventName, handler, options) {
	element.addEventListener(eventName, handler, options);
}
function removeEventListener(element, eventName, handler, options) {
	element.removeEventListener(eventName, handler, options);
}
function createEvent(eventName, detail, options) {
	const CustomEventCtor = getCustomEventSafe();
	if (!CustomEventCtor) throwError("CustomEvent is not available in the current runtime");
	return new CustomEventCtor(eventName, {
		detail,
		...options
	});
}
function dispatchEvent(eventOrName, element, detail, options) {
	try {
		const target = element ?? getDocumentSafe();
		if (!target) throwError("Dispatch target is not available in the current runtime");
		if (typeof eventOrName === "string") {
			const event = createEvent(eventOrName, detail, options);
			return target.dispatchEvent(event);
		} else if (typeof Event !== "undefined" && eventOrName instanceof Event) return target.dispatchEvent(eventOrName);
		else throwError("Invalid event type");
	} catch (e) {
		reportError("Dispatch Event Error:", e);
		return false;
	}
}
var executeUtils_exports = /* @__PURE__ */ __exportAll({
	debounce: () => debounce,
	throttle: () => throttle
});
/**
* Creates a throttled function that only invokes the provided function at most once
* per every wait milliseconds.
*
* @param fn - The function to throttle.
* @param wait - The number of milliseconds to throttle invocations to.
* @param options - Throttle options.
*
* @returns The new throttled function.
*/
function throttle(fn, wait = 100, options = {
	leading: false,
	trailing: true
}) {
	const { leading = false, trailing = true } = options;
	let timeoutId;
	let lastTime = leading ? 0 : performance.now();
	let lastArgs;
	const invokeFn = () => {
		if (lastArgs) {
			lastTime = performance.now();
			fn(...lastArgs);
			lastArgs = void 0;
		}
	};
	return (...args) => {
		const currentTime = performance.now();
		lastArgs = args;
		const elapsed = currentTime - lastTime;
		if (elapsed >= wait) {
			if (timeoutId !== void 0) {
				clearTimeout(timeoutId);
				timeoutId = void 0;
			}
			invokeFn();
		} else if (trailing && timeoutId === void 0) timeoutId = setTimeout(() => {
			invokeFn();
			timeoutId = void 0;
		}, wait - elapsed);
	};
}
/**
* Creates a debounced function that delays invocation until after wait milliseconds
* have elapsed since the last time the debounced function was invoked.
*
* @param fn - The function to debounce.
* @param wait - The number of milliseconds to delay.
* @param options - Debounce options.
*
* @returns A debounced function that returns a Promise resolving to the result of the original function.
*/
function debounce(fn, wait, options = {
	leading: false,
	trailing: true
}) {
	const { leading = false, trailing = true, maxWait } = options;
	let timeoutId;
	let lastInvokeTime = 0;
	let lastCallTime = 0;
	let lastArgs;
	/** Collection of resolvers to prevent Promise hanging for cancelled calls */
	let pendingResolvers = [];
	const invokeFn = () => {
		if (!lastArgs) throw new Error("Debounce invoked without arguments");
		const result = fn(...lastArgs);
		lastInvokeTime = performance.now();
		const resolvers = [...pendingResolvers];
		pendingResolvers = [];
		for (const resolve of resolvers) resolve(result);
		return result;
	};
	return (...args) => {
		return new Promise((resolve) => {
			const currentTime = performance.now();
			const isFirstCallInBurst = timeoutId === void 0;
			lastArgs = args;
			pendingResolvers.push(resolve);
			if (isFirstCallInBurst) lastCallTime = currentTime;
			if (timeoutId !== void 0) clearTimeout(timeoutId);
			if (leading && isFirstCallInBurst && (currentTime - lastInvokeTime > wait || lastInvokeTime === 0)) return invokeFn();
			if (maxWait !== void 0 && currentTime - lastCallTime >= maxWait) return invokeFn();
			timeoutId = setTimeout(() => {
				timeoutId = void 0;
				if (trailing) invokeFn();
			}, wait);
		});
	};
}
var formUtils_exports = /* @__PURE__ */ __exportAll({
	appendFormData: () => appendFormData,
	bodyToURLParams: () => bodyToURLParams,
	decodeFormData: () => decodeFormData,
	encodeFormData: () => encodeFormData,
	formDataToURLParams: () => formDataToURLParams
});
function appendFormData(options, formData = new FormData()) {
	const { data, parentKey = "" } = options;
	if (data instanceof FormData) data.forEach((value, key) => {
		formData.append(key, value);
	});
	else if (data !== null && typeof data === "object") {
		if (data instanceof Blob || data instanceof File) {
			const formKey = parentKey || "file";
			formData.append(formKey, data);
		} else Object.keys(data).forEach((key) => {
			const value = data[key];
			const formKey = parentKey ? `${parentKey}[${key}]` : key;
			if (value !== null && typeof value === "object") appendFormData({
				data: value,
				parentKey: formKey
			}, formData);
			else if (value !== null) formData.append(formKey, String(value));
		});
	} else if (data !== null) formData.append(parentKey, data);
	return formData;
}
function encodeFormData(data, parentKey = "") {
	if (data instanceof FormData) return data;
	return appendFormData({
		data,
		parentKey
	});
}
function decodeFormData(formData) {
	const data = {};
	formData.forEach((value, key) => {
		if (key in data) {
			if (Array.isArray(data[key])) data[key].push(value);
			else data[key] = [data[key], value];
		} else data[key] = value;
	});
	return data;
}
function formDataToURLParams(formData) {
	const params = {};
	formData.forEach((value, key) => {
		if (typeof value === "string" || typeof value === "boolean" || typeof value === "number" || value === null) params[key] = value;
		else params[key] = value.toString();
	});
	return params;
}
function bodyToURLParams(body) {
	const params = {};
	if (body instanceof FormData) return formDataToURLParams(body);
	else if (typeof body === "object") Object.entries(body).forEach(([key, value]) => {
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) params[key] = value;
		else params[key] = JSON.stringify(value);
	});
	return params;
}
var fetchUtils_exports = /* @__PURE__ */ __exportAll({
	doFetch: () => doFetch,
	fetchData: () => fetchData,
	sendData: () => sendData,
	sendForm: () => sendForm,
	sendFormData: () => sendFormData
});
function hasResponseBody(response) {
	if ([
		204,
		205,
		304
	].includes(response.status)) return false;
	return response.headers.get("content-length") !== "0";
}
function isJsonResponse(response) {
	const contentType = response.headers.get("content-type") ?? "";
	return contentType.includes("application/json") || contentType.includes("+json");
}
async function parseResponseData(response) {
	if (!hasResponseBody(response)) return null;
	const responseText = await response.text();
	if (responseText.length === 0) return null;
	if (isJsonResponse(response)) return JSON.parse(responseText);
	return responseText;
}
async function doFetch(options) {
	const { url, method = "GET", headers = {}, cache = "no-cache", mode = "cors", credentials = "same-origin", body = null, beforeSend = null, success = null, error = null } = options;
	let requestURL = url;
	const init = {
		method,
		mode,
		headers: headers instanceof Headers ? headers : new Headers(headers),
		cache,
		credentials
	};
	if (body && body !== null && method.toUpperCase() === "GET") {
		const params = bodyToURLParams(body);
		requestURL = setUrlParam(typeof url === "string" ? url : url.toString(), params, true);
	} else if (body && body !== null && [
		"PUT",
		"POST",
		"DELETE"
	].includes(method.toUpperCase())) {
		let data = body;
		if (!(body instanceof FormData)) {
			data = JSON.stringify(body);
			if (!(init.headers instanceof Headers)) init.headers = new Headers(init.headers);
			init.headers.append("Content-Type", "application/json");
		}
		init.body = data;
	}
	let request;
	if (typeof requestURL === "string" || requestURL instanceof URL) request = new Request(requestURL, init);
	else if (requestURL instanceof Request) request = requestURL;
	else throw new Error("Invalid URL type");
	try {
		const createRequest = await new Promise((resolve) => {
			beforeSend?.();
			resolve(request);
		});
		const response = await fetch(createRequest);
		if (response.ok) {
			if (typeof success === "function") success(await parseResponseData(response.clone()));
		} else throw new Error(`HTTP error! status: ${response.status}`);
		return response;
	} catch (caughtError) {
		const errorObj = caughtError instanceof Error ? caughtError : new Error(String(caughtError));
		error?.(errorObj);
		throw errorObj;
	}
}
async function sendData(options) {
	const { url, data, method = "POST", headers, cache, mode, credentials, success, error, beforeSend, encode = true } = options;
	return await parseResponseData(await doFetch({
		url,
		method,
		headers,
		cache,
		mode,
		credentials,
		body: encode && method.toUpperCase() !== "GET" ? encodeFormData(data) : data,
		beforeSend,
		success,
		error
	}));
}
async function sendFormData(options) {
	const { url, data, method = "POST", headers, cache, mode, credentials, success, error, beforeSend } = options;
	return doFetch({
		url,
		method,
		headers,
		cache,
		mode,
		credentials,
		body: data ? encodeFormData(data) : null,
		beforeSend,
		success,
		error
	}).then(() => true).catch(() => false);
}
const fetchData = sendData;
const sendForm = sendFormData;
var storageUtils_exports = /* @__PURE__ */ __exportAll({
	getCookie: () => getCookie,
	getLocalValue: () => getLocalValue,
	getSessionValue: () => getSessionValue,
	removeCookie: () => removeCookie,
	removeLocalValue: () => removeLocalValue,
	removeSessionValue: () => removeSessionValue,
	setCookie: () => setCookie,
	setLocalValue: () => setLocalValue,
	setSessionValue: () => setSessionValue
});
function setLocalValue(key, value, stringify = true) {
	const storedValue = stringify ? JSON.stringify(value) : String(value);
	getLocalStorageSafe()?.setItem(key, storedValue);
}
function getLocalValue(key, parseJson = true) {
	const value = getLocalStorageSafe()?.getItem(key) ?? null;
	if (value === null) return null;
	if (parseJson) try {
		return JSON.parse(value);
	} catch (e) {
		reportError("Error while parsing stored json value: ", e);
	}
	return value;
}
function removeLocalValue(key) {
	getLocalStorageSafe()?.removeItem(key);
}
function setSessionValue(key, value, stringify = true) {
	const storedValue = stringify ? JSON.stringify(value) : String(value);
	getSessionStorageSafe()?.setItem(key, storedValue);
}
function getSessionValue(key, parseJson = true) {
	const value = getSessionStorageSafe()?.getItem(key) ?? null;
	if (value === null) return null;
	if (parseJson) try {
		return JSON.parse(value);
	} catch (e) {
		reportError("Error while parsing stored json value: ", e);
	}
	return value;
}
function removeSessionValue(key) {
	getSessionStorageSafe()?.removeItem(key);
}
function setCookie(name, value, options) {
	const currentDocument = getDocumentSafe();
	if (!currentDocument) return;
	let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;
	options = deepMerge({}, {
		expires: new Date(Date.now() + 864e5),
		path: "/",
		secure: false,
		sameSite: "Lax"
	}, options || {});
	if (options.expires) {
		let expiresValue = "";
		if (options.expires instanceof Date) expiresValue = options.expires.toUTCString();
		else expiresValue = new Date(String(options.expires)).toUTCString();
		cookieString += `expires=${expiresValue};`;
	}
	cookieString += `path=${options.path};`;
	if (options.domain) cookieString += `domain=${options.domain};`;
	if (options.secure) cookieString += "secure;";
	cookieString += `SameSite=${options.sameSite};`;
	currentDocument.cookie = cookieString;
}
function getCookie(name) {
	const currentDocument = getDocumentSafe();
	if (!currentDocument) return null;
	const nameEQ = `${encodeURIComponent(name)}=`;
	const ca = currentDocument.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}
function removeCookie(name) {
	setCookie(name, "", { expires: /* @__PURE__ */ new Date(0) });
}
//#endregion
//#region src/index.ts
var Utils = class {
	constructor(extension) {
		Object.assign(this, extension);
	}
};
const UtilsWithStatics = Object.assign(Utils, browser_exports);
Object.defineProperties(UtilsWithStatics, {
	version: {
		value: "2.1.0",
		writable: false,
		configurable: true
	},
	utilsVersion: {
		value: version,
		writable: false,
		configurable: true
	},
	stylesheetId: {
		get() {
			return stylesheetId;
		},
		configurable: true
	},
	replaceRule: {
		get() {
			return replaceRule;
		},
		configurable: true
	}
});
//#endregion
export { UtilsWithStatics as default };
