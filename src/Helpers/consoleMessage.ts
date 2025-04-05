export function consoleErr(title: string, message: string, data?: unknown) {
  console.error(
    `%c⛔ ${title}\n%c${message}`,
    "background: #ff0033; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: block;",
    "display: block; padding: 6px 10px;"
  );
  if (data) console.error(data);
}

export function consoleInfo(title: string, message: string, data?: unknown) {
  console.log(
    `%cℹ️ ${title}\n%c${message}`,
    "background: #007acc; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: block;",
    "background: #001f33; color: #d0eaff; padding: 6px 10px; display: block; border-radius: 4px; font-family: monospace;"
  );
  if (data) console.info(data);
}

export function consoleWar(title: string, message: string, data?: unknown) {
  console.log(
    `%c⚠️ ${title}\n%c${message}`,
    "background: #ffcc00; color: black; font-weight: bold; padding: 4px 8px; border-radius: 4px; display: block;",
    "background: #332b00; color: #fff3cc; padding: 6px 10px; display: block; border-radius: 4px; font-family: monospace;"
  );
  if (data) console.warn(data);
}
