app.get('/products/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      res.json(result.rows[0]);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
  }
});
