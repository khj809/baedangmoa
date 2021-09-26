export default function safariOverflowHidden(node: { style: { overflow: string; }; }) {
  if (navigator.userAgent.includes("Safari")) {
    node.style.overflow = "hidden";
  }
}