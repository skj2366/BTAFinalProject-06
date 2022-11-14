# EHRA Explorer

**EHRA Explorer** is a Hedera localnet explorer developed by EHRA team.

## Development
Developed with 
- [React.js](https://reactjs.org/)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Hedera Mirror Node REST API](https://mainnet-public.mirrornode.hedera.com/api/v1/docs/)

## HEDERA API 엔드포인트
- http://localhost:8080/tx - 최근 트랜잭션 내역 조회;
- http://localhost:8080/block - 최근 블록 내역 조회;
- http://localhost:8080/account - 최근 계정 내역 조회;

# explorer 실행
1. .env.example 파일 참고하여 .env 파일 작성

2. 실행
```bash
npm start
or
yarn start
```
