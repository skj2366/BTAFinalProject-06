# 서버
1. .env.example 파일 참고하여 .env 파일 작성

2. 서버 실행
```bash
npx sequelize db:create
npm start
```

3. 데몬 DB 동기화 실행(로컬 노드가 운영되고 서버가 실행되어야 정상 동작)
```bash
npm run daemon
```
etc
도커 사용시 
```bash
docker-compose up -d
```

도커 삭제 시
```bash
docker-compose down -v
```
