require('dotenv/config')

const devConfig = [
  {
    "name": "default",
    "type": "database_type",
    "host": "database_host",
    "port": "database_port",
    "username": "database_username",
    "password": "database_password",
    "database": "database_name",
    "entities": [
      "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "database_type",
    "host": "database_host",
    "port": "database_port",
    "database": "database_name",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]

const prodConfig = [
  {
    "name": "default",
    "type": "database_type",
    "host": "database_host",
    "port": "database_port",
    "username": "database_username",
    "password": "database_password",
    "database": "database_name",
    "entities": [
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "database_type",
    "host": "database_host",
    "port": "database_port",
    "database": "database_name",
    "useUnifiedTopology": true,
    "entities": [
      "./dist/modules/**/infra/typeorm/schemas/*.js"
    ]
  }
]

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
