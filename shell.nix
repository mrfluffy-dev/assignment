let
    pkgs = import <nixpkgs> {};
in
    pkgs.mkShell {
        buildInputs = with pkgs; [
            dbus
            openssl
            cargo
            rustc
            rust-analyzer
            rustup
            gcc
            rustfmt
	    gf
        ];
        nativeBuildInputs = with pkgs; [
            pkg-config
        ];
        dbus = pkgs.dbus;
        shellHook = ''
        export TEMPDIR=/tmp
        echo "run shell shit here"
        echo "your mom"
        '';
    }
