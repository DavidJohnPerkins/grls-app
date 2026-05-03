require("dotenv").config();

const config = {
  server: {
    port: process.env.PORT || 8080,
  },
  db: {
    url: process.env.MIDDLEWARE_URL || 'localhost',
  },
};

if (!config.db.url) {
  throw new Error("DATABASE_URL is required but missing");
}

module.exports = config;
