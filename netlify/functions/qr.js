import QRCode from "qrcode";

const QR_VERSION = 4; // QR version, range 1-40
const DEFAULT_TYPE = "svg";

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
  console.log(event);

  try {
    const text =
      event?.queryStringParameters?.text ??
      event?.body?.split("text=")[1] ??
      "";
    const type =
      event?.queryStringParameters?.type ??
      event?.body?.split("type=")[1] ??
      DEFAULT_TYPE;
    const version =
      event?.queryStringParameters?.version ??
      event?.body?.version ??
      QR_VERSION;

    console.log(text, type, version);

    const generated = await QRCode.toString(text, { type, version });
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": mimeTypes[type],
        ...origins,
      },
      body: JSON.stringify(generated),
    };
    return response;
  } catch (error) {
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
