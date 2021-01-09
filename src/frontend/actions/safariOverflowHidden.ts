export default function safariOverflowHidden(node) {
  if (navigator.appVersion.includes("Safari")) {
    node.style.overflow = "hidden";
  }
}
