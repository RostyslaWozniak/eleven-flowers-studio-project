export function handleScroll(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) return;

  const formTop = ref.current.getBoundingClientRect().top;

  if (formTop < 0) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
