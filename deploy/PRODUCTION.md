# Producao no Proxmox LXC com GitHub Actions

## Arquitetura

- GitHub (`main`) dispara pipeline.
- Pipeline faz `lint`, `build` e publica em LXC via SSH.
- Releases ficam em `/var/www/v7m.org/releases/<commit_sha>`.
- Link simbolico ativo: `/var/www/v7m.org/current`.
- Nginx serve sempre o release ativo.

## 1) Criar LXC no Proxmox

Recomendado:
- Debian 12
- Unprivileged container
- 2 vCPU
- 2 GB RAM
- 20+ GB disco
- IP fixo

## 2) Bootstrap da LXC

Dentro da LXC, como root:

```bash
apt update && apt install -y git
mkdir -p /opt/setup && cd /opt/setup
git clone https://github.com/maestri33/v7m.org.git
cd v7m.org
bash deploy/bootstrap-lxc.sh v7m.org deploy /var/www/v7m.org
```

## 3) Chave SSH para deploy

No seu computador (ou em maquina segura), gere uma chave dedicada ao CI:

```bash
ssh-keygen -t ed25519 -C "github-actions-v7m" -f ./v7m_deploy_key
```

Adicione a chave publica na LXC:

```bash
mkdir -p /home/deploy/.ssh
cat v7m_deploy_key.pub >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

## 4) Secrets do GitHub

No repositorio (`Settings > Secrets and variables > Actions > New repository secret`):

- `DEPLOY_HOST`: IP ou dominio da LXC
- `DEPLOY_PORT`: `22` (ou porta SSH custom)
- `DEPLOY_USER`: `deploy`
- `DEPLOY_PATH`: `/var/www/v7m.org`
- `DEPLOY_SSH_KEY`: conteudo da chave privada `v7m_deploy_key`

## 5) DNS e HTTPS

- Aponte `v7m.org` e `www.v7m.org` para o IP da LXC.
- Na LXC:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d v7m.org -d www.v7m.org
```

## 6) Deploy

Ao fazer push em `main`, o workflow `.github/workflows/deploy.yml` publica automaticamente.

Deploy manual:
- Aba `Actions`
- Workflow `Deploy Production`
- `Run workflow`
