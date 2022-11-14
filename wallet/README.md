## 크롬 익스텐션 월렛

로컬 노드를 사용한다면 web-wellet 사용 필요
로컬 노드 사용 시 사용 못 함.

패키지 설치
```bash
npm install
# or
yarn install
```

프로그램 실행
build 파일을 chrome://extensions/ 에 추가
```bash
npm build
# or
yarn build
```

.env.sample을 .env로 변경<br/>
아래 값은 hedera portal에 가입하여 추가 필요.
https://portal.hedera.com/
```
NEXT_PUBLIC_WALLET_ACCOUNT_ID=
NEXT_PUBLIC_WALLET_PRIVATE_KEY=
```
