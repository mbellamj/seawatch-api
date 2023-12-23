#!/bin/sh

set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE
db.createCollection("$MONGO_INITDB_DATABASE")
EOF

# mongo <<EOF
# use admin
# db.createUser({
#   user: "$MONGO_USER",
#   pwd:  "$MONGO_PASSWORD",
#   roles: [{
#     role: 'readWrite',
#     db: "$MONGO_DATABASE"
#   }]
# })
# EOF