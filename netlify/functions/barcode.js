import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from 'xmldom';

const origins = {
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
};

const mimeTypes = {
  svg: "image/svg+xml",
  terminal: "text/plain",
  utf8: "text/plain",
};

export async function handler(event) {
  try {
    const text =
      event?.queryStringParameters?.text ??
      event?.body?.split("text=")[1] ??
      "";

    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, text, {
      xmlDocument: document,
    });
    
    const svgText = xmlSerializer.serializeToString(svgNode);
    
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": mimeTypes['svg'],
        ...origins,
      },
      body: JSON.stringify(svgText),
    };
    return response;
  } catch (error) {
    console.log(error)

    const response = {
      statusCode: 500,
      headers: {
        ...origins,
      },
      body: error.message,
    };

    return response;
  }
}
