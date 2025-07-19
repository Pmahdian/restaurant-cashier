export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>صفحه اصلی رستوران</h1>
      <nav>
        <a href="/menu" style={{ margin: '0 10px' }}>منو</a>
        <a href="/orders" style={{ margin: '0 10px' }}>سفارشات</a>
      </nav>
    </div>
  );
}