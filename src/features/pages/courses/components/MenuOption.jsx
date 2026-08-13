export default function MenuOption({ icon, label, onClick }) {
  const icons = {
    school: <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>,
    login: <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>,
  }
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#202124] hover:bg-[#f1f3f4] transition-colors"
    >
      <svg width="20" height="20" fill="#5f6368" viewBox="0 0 24 24">{icons[icon]}</svg>
      {label}
    </button>
  )
}
