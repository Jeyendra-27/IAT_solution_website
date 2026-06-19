// Scrolling marquee of capability tags. The list is rendered twice so the
// CSS translate loop is seamless (the original duplicated the track in JS).
const ITEMS = [
  "Web platforms",
  "Internal tools",
  "AI automation",
  "Mobile apps",
  "System integration",
  "Custom CRM & ERP",
  "Chatbots & agents",
  "Data dashboards",
];

export default function Ticker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-track" id="ticker">
        {loop.map((t, i) => (
          <span className="ticker-item" key={i}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
