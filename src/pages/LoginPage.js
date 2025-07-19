// LoginPage.js بهبود یافته
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/pos');
  } catch (err) {
    let errorMessage = 'ایمیل یا رمز عبور نادرست است';
    if (err.code === 'auth/too-many-requests') {
      errorMessage = 'تعداد تلاش‌ها بیش از حد مجاز! لطفاً بعداً تلاش کنید';
    }
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

// تغییر دکمه ورود:
<Button
  type="submit"
  fullWidth
  variant="contained"
  disabled={loading}
  sx={{ mt: 3, mb: 2 }}
>
  {loading ? 'در حال ورود...' : 'ورود'}
</Button>