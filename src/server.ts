import app from './app';

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Sunucu çalıştı ..... ${PORT}`);
});
