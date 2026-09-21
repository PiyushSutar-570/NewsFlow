export default function SkeletonCard() {
  return (
    <div className="skeleton-card article-card">
      <div className="skeleton sk-img" />
      <div className="sk-body">
        <div className="skeleton sk-line short" style={{ height: 10, marginBottom: 12 }} />
        <div className="skeleton sk-line long" style={{ height: 16, marginBottom: 8 }} />
        <div className="skeleton sk-line medium" style={{ height: 16, marginBottom: 8 }} />
        <div className="skeleton sk-line short" style={{ height: 12, marginBottom: 16 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <div className="skeleton" style={{ width: 70, height: 12 }} />
          <div className="skeleton" style={{ width: 80, height: 12 }} />
        </div>
      </div>
    </div>
  );
}
