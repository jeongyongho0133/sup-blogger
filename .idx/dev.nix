{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.typescript
    pkgs.firebase-tools # For Firebase CLI and Emulators
    pkgs.jre # Java is required to run the Firebase Emulators
    pkgs.openssl # NEXTAUTH_SECRET 생성을 위한 openssl 명령어 추가
    pkgs.python3 # For running the service account encoding script
  ];
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
    ];
    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      # onStart는 워크스페이스가 시작/재시작될 때마다 자동으로 명령을 실행합니다.
      onStart = {
        # 이 스크립트는 다음 두 가지 작업을 순차적으로 수행합니다:
        # 1. Firebase 에뮬레이터를 백그라운드에서 시작합니다 (`&`).
        # 2. 15초간 기다려 에뮬레이터가 완전히 켜지도록 보장한 후, 테스트 데이터를 주입합니다.
        setup = ''
          firebase emulators:start --project=demo-project --only=firestore,storage,auth &
          sleep 15
          export FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
          node scripts/seed-auth.js
        '';
      };
    };
    previews = {
      enable = true;
      previews = {
        # Next.js 애플리케이션을 위한 미리보기입니다.
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}
