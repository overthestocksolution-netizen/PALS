import './Ticker.css';

const TEXT = 'NEW ARRIVALS — PALS COLLECTION — FREE SHIPPING OVER RS.5,000 — SUSTAINABLE FASHION — BUY FOR LESS. SELL FOR TRUE. — ';

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true" role="marquee">
      <div className="track">
        <span className="text">{TEXT}</span>
        <span className="text">{TEXT}</span>
        <span className="text">{TEXT}</span>
      </div>
    </div>
  );
}
