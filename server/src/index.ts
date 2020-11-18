import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
