{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.typescript
    pkgs.firebase-tools
    pkgs.jre
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
      onStart = {
        seed-auth = "node scripts/seed-auth.js";
      };
    };
    previews = {
      enable = true;
      previews = {
        # Preview for the Next.js app
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
        # Preview for the Firebase Emulator UI
        emulators = {
          command = ["firebase" "emulators:start" "--project" "demo-project"];
          manager = "web";
        };
      };
    };
  };
}
