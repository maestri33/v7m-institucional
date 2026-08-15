#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root."
  exit 1
fi

DOMAIN="${1:-v7m.org}"
DEPLOY_USER="${2:-deploy}"
DEPLOY_PATH="${3:-/var/www/v7m.org}"

apt update
apt install -y nginx ufw fail2ban ca-certificates curl

if ! id -u "$DEPLOY_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi

mkdir -p "${DEPLOY_PATH}/releases"
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${DEPLOY_PATH}"
chmod -R 755 "${DEPLOY_PATH}"

cat >"/etc/nginx/sites-available/${DOMAIN}" <<EOF
server {
  listen 80;
  listen [::]:80;
  server_name ${DOMAIN} www.${DOMAIN};

  root ${DEPLOY_PATH}/current;
  index index.html;

  location / {
    try_files \$uri \$uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    try_files \$uri =404;
  }
}
EOF

ln -sfn "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable

systemctl enable fail2ban
systemctl restart fail2ban

echo "Bootstrap complete."
echo "Next:"
echo "1) Add SSH public key to /home/${DEPLOY_USER}/.ssh/authorized_keys"
echo "2) Configure DNS (${DOMAIN} and www.${DOMAIN}) to this LXC IP"
echo "3) Run certbot: apt install -y certbot python3-certbot-nginx && certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
