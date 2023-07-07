# Step1
## 노드를 빌드하고 실행시키는 이미지를 가져온다.
FROM node:16.13-alpine3.14

#Proejct의 모든 파일을 WORKDIR == /app 으로 복사한다.
WORKDIR /app
COPY ./MyMoServer .

RUN npm install
RUN npm run build

ENTRYPOINT [ "npm" ]
CMD [ "run", "start:prod" ]
