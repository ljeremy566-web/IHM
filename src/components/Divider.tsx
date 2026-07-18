import './Divider.css';

export function Divider() {
  return (
    <div className="divider-container">
      <div className="divider-line"></div>
      <div className="divider-diamond">
        <div className="divider-diamond-inner"></div>
      </div>
      <div className="divider-line"></div>
    </div>
  );
}
