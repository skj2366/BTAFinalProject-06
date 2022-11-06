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

각 컨테이너 접속 (ctrl + C로 종료)
```bash
docker-compose exex mysql /bin/bash
docker-compose exec stacks-blockchain /bin/stacks-node testnet
```


비트 해더 동기화 이후 노드 작동 (시간이 좀 걸림, 보면서 커피 한 잔 마시기)
![image](https://user-images.githubusercontent.com/17466930/200118224-84d9e3a1-768b-43ce-a8c9-240dbf3b315e.png)
![image](https://user-images.githubusercontent.com/17466930/200118304-ce8da690-02a8-45af-81d7-3d93bf41f607.png)
![image](https://user-images.githubusercontent.com/17466930/200118334-4b26db86-a65b-4897-a3dd-afa23fb2a5df.png)
![image](https://user-images.githubusercontent.com/17466930/200118415-764e7e60-3121-45eb-8dd3-7efb511076e5.png)


로컬 노드에서 상태값 조회 가능
```bash
curl -sL localhost:20443/v2/info
```
![image](https://user-images.githubusercontent.com/17466930/200118351-1fbfcee6-afe8-4737-b6d9-59701a2982db.png)



