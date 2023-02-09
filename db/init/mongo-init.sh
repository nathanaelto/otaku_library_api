set -e

mongo <<EOF
db = db.getSiblingDB('$MONGO_INITDB_DATABASE')

db.createUser({
  user: '$MONGO_USER',
  pwd: '$MONGO_PASSWORD',
  roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }],
});
db.createCollection('users')

EOF