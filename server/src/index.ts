import db from '@models/.';
import app from './app';

const PORT = process.env.PORT || 4000;

db();

app.server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
