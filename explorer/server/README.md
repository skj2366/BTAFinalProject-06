# 서버
 
docker-compose 실행
docker-compose를 통해 Volume이 동기화와 같이 Docker가 작동함
```bash
docker-compose up -d
```

컨테이너 상태 확인
```bash
docker-compose ps
```

각 컨테이너 접속
```bash
docker-compose exex mysql /bin/bash
docker-compose exec stacks-blockchain /bin/stacks-node testnet
```
