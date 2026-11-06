# VANTA! — OFFICIAL WEBSITE

쨍한 코발트 블루·네온 라임을 기반으로 한 가상 5인조 보이그룹 VANTA 공식 홈페이지 프로젝트.

## 중요한 점

- **다섯 인물 사진은 업로드한 PixAI 원본 파일 그대로** 복사했습니다. AI 재생성, 얼굴 수정 없음.
- 로고도 기존 완성 이미지를 원본 그대로 사용했습니다.
- 별도 빌드 환경이나 npm 설치가 필요하지 않습니다. GitHub Pages로 바로 공개할 수 있는 HTML/CSS/JavaScript 사이트입니다.
- 메뉴: HOME / ARTIST / MUSIC / ARCHIVE / SCHEDULE / NOTICE. 멤버 선택 시 개인 상세 프로필, 앨범 콘셉트 상세, 갤러리 확대, 공지 펼치기가 작동합니다.
- 가상의 프로젝트입니다. 실제 SNS·플레이 링크는 입력되지 않았습니다.

## GitHub Pages 배포 (별도 저장소 추천)

1. GitHub에서 **New repository**를 눌러 이름을 `vanta-official`로 입력하고 Public으로 생성하세요.
2. 이 ZIP을 압축 해제합니다.
3. 새 저장소에서 **Add file → Upload files**로 `index.html`, `style.css`, `app.js`, `assets` 폴더를 업로드하고 **Commit changes** 하세요. ZIP 파일 자체를 올리면 안 됩니다.
4. 저장소 **Settings → Pages**에서 `Deploy from a branch`를 고르고 `main` / `/(root)`를 선택해 **Save** 합니다.
5. GitHub Pages 배포가 완료되면 `https://<깃허브아이디>.github.io/vanta-official/` 형태로 접근합니다.

계정에 따라 Pages 공개 방식/지원 범위가 달라질 수 있습니다.

## 로컬 확인

`index.html`을 브라우저로 열면 됩니다. 앨범 상세와 멤버 프로필은 자바스크립트로 동작합니다.

## 수정 방법

- 멤버 이름, 포지션, 컬러, 소개 문구: `app.js`의 `members` 배열
- 음악/앨범 소개: `app.js`의 `albums` 배열
- 공지: `app.js`의 `notices` 배열
- 사이트 디자인과 색상: `style.css` 상단 `:root`
- 사진: `assets` 폴더에서 동일 파일명으로 이미지 교체

## 멤버/색상

- 서이현 — `#174BFF` / original: `assets/seo-ihyeon.png`
- 백시온 — `#FF4392` / original: `assets/baek-sion.png`
- 차도겸 — `#FF5639` / original: `assets/cha-dogyeom.png`
- 유태경 — `#8857FF` / original: `assets/yoo-taegyeong.png`
- 한서율 — `#D4FF39` / original: `assets/han-seoyul.png`

## 라이선스

이미지의 권리와 생성 플랫폼의 사용 조건은 제작자가 확인해야 합니다. 홈페이지는 가상의 창작 프로젝트이며 실제 연예기획사의 공식 웹사이트가 아닙니다.
