export default function setTheme() {
  let theme = 'nord';
  if (typeof localStorage !== 'undefined') {
    theme = localStorage.getItem('doc-app-theme') ?? 'nord';
  }
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
