export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    document.body.classList.add("fs-lock");
  } else {
    document.exitFullscreen().catch(() => {});
    document.body.classList.remove("fs-lock");
  }
};

export const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
    document.body.classList.remove("fs-lock");
  }
};
