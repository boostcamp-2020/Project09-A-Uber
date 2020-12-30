# 🚕 프로젝트 소개 🚕

> 저희 프로젝트는 우버의 **택시 호출 기능**을 클론한 서비스이며 서비스명은 **이키택**(🙈이거 키면 나랑 택시 타는 거다?🙈) 입니다.
> 이키택은 **GraphQL** 을 활용하여 실시간 위치 공유, 채팅, 알림 서비스를 구현했습니다.

❝ **현재 Google Directions API에서 한국 길 찾기 서비스를 지원하고 있지 않습니다.**  위치를 해외로 설정하여 테스트 해보실 수 있습니다. **[위치를 설정하는 방법이 궁금하시면 여기를 클릭해 주세요](https://developers.google.com/web/tools/chrome-devtools/device-mode/device-input-and-sensors?hl=ko).** ❞

<br />

<p align="center">
    <img src="https://i.imgur.com/0THCKg9.png" width="700px" alt="logo" />
</p>

<br/>

### 💁🏻 Wiki

- [🗓 Backlog & Loadmap](https://docs.google.com/spreadsheets/d/1pfcIS6wGO8Kft20cD9c0Z9SHDwTE0-QXbkVGVtAeVes/edit?ts=5fb4da99#gid=1253300756)
- [📑 Feature List](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/%F0%9F%93%91-Feature-List)
- [🔨 Skill Spec](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/%F0%9F%94%A8-Skill-Spec)
- [:iphone: Prototype](https://www.figma.com/proto/OEeQ7HlivgkE5jnzQ6obtu/%EC%9D%B4%ED%82%A4%ED%83%80?node-id=1%3A2&scaling=scale-down)

<br/>

### 👨🏻‍💻 데모영상

[![Video Label](http://img.youtube.com/vi/U46kffiEf1U/0.jpg)](https://youtu.be/U46kffiEf1U)

<br/>

## 👨🏻‍🏫 주요 기능 👩🏻‍🏫

**⏰ 알림 서비스**

- 드라이버 위치에 따른 오더 리스트 실시간 업데이트
- 드라이버 호출 및 호출한 오더 상태 구독
- 새로운 오더 구독 및 오더 응답
- 출발지 및 도착지 도착시 알림

**🚕 실시간 위치 공유**

- 사용자와 드라이버 간의 실시간 위치 공유
- 드라이버가 출발지로부터 500m 이내로 인접시 도착 알림

**💬 채팅**

- 드라이버와 사용자 간의 실시간 채팅
- 채팅방에 접속하지 않아도 메시지 수신을 확인할 수 있는 알람기능

**🌎 위치검색 및 경로 표시**

- Google Place API를 활용한 출발지 도착지 위치 검색
- Google Map Direction을 활용한 출발지 목적지 이동 경로 표시

<br />

## 🤹‍♂ Tech Stack

저희는 프로젝트를 진행하며 다음과 같은 기술 스택을 사용했습니다. 😁

<p align="center">
    <img align="center" width="600px" src="https://i.imgur.com/cixeDOO.png" alt="logo" />
</p>

<br />

## 🔨 Web Architecture

저희의 웹 서비스는 다음과 같은 구조로 동작하고 있습니다. 😚

<p align="center">
    <img align="center" width="600px" src="https://user-images.githubusercontent.com/52775389/102004383-82bdf880-3d53-11eb-9aee-7cbdcb96a3de.png" alt="logo" />
</p>

<br />

## 💪 우리가 도전한 기술

> ❝ 서비스를 구현하면서 저희가 겪었던 기술적인 어려움, 그리고 어려움을 해결해 나가는 과정과 저희가 도전했던 핵심 기술들을 소개해드립니다. ❞

### [🔒 GraphQL에서의 권한 인증](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/Graphql-%EC%97%90%EC%84%9C-%EC%9D%B8%EC%A6%9D%EC%B2%98%EB%A6%AC)

### [🔒 IKEYTAX 토큰인증 전략](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/IKEYTAX-%ED%86%A0%ED%81%B0-%EC%9D%B8%EC%A6%9D-%EC%A0%84%EB%9E%B5)

### [⏳ 토큰 재발급 Custom Hooks](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/Custom-Hook%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%86%A0%ED%81%B0-%EC%9E%AC%EB%B0%9C%EA%B8%89-%E2%8F%B3)

### [⚡ Subscription을 이용한 실시간 통신](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/Graphql-Subscription-%E2%9A%A1)

### [🧪 Jest, Cypress를 이용한 테스트](https://github.com/boostcamp-2020/Project09-A-Uber/wiki/Cypress-%EC%99%80-Jest-%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%F0%9F%A7%AA)

<br />

### 🙈 IKEYTAX 팀원 🙈

| J053 :honeybee:                                         | J059 👻                                         | J118 🐸                                       | J194 🐭                                         |
| ------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| [김종은(jongeunk0613)](https://github.com/jongeunk0613) | [김학준(kimakjun)](https://github.com/Kimakjun) | [오지훈(hoo00nn)](https://github.com/hoo00nn) | [조찬영(cyjo9603)](https://github.com/cyjo9603) |
