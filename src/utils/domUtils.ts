export async function browserHasImmersiveArCompatibility(): Promise<boolean> {
  if (window.navigator.xr) {
    const isSupported: boolean = await navigator.xr.isSessionSupported(
      "immersive-ar",
    );
    console.info(
      `[DEBUG] ${
        isSupported
          ? "Browser supports immersive-ar"
          : "Browser does not support immersive-ar"
      }`,
    );
    return isSupported;
  }
  return false;
}

export function displayUnsupportedBrowserMessage(): void {
  const appRoot: HTMLElement | null = document.getElementById("app-root");
  const bigMessage: HTMLParagraphElement = document.createElement("p");

  bigMessage.innerText = "Sorry! 😞";
  if (appRoot) {
    appRoot.appendChild(bigMessage);
  }

  const middleMessage: HTMLParagraphElement = document.createElement("p");
  middleMessage.innerText =
    "WebXr Ar Not supported.";

  if (appRoot) {
    appRoot.appendChild(middleMessage);
  }
}

export default {
  browserHasImmersiveArCompatibility,
  displayUnsupportedBrowserMessage,
};
