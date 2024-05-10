FROM rust:latest as builder
WORKDIR /usr/src/methoddata
COPY . .
RUN apt-get update && apt-get install -y libssl-dev pkg-config
RUN rustup target add x86_64-unknown-linux-gnu
RUN cargo build --release --target x86_64-unknown-linux-gnu

FROM debian:bookworm-slim
WORKDIR /usr/local/bin/
RUN apt-get update && apt-get install -y libssl3 curl
COPY --from=builder /usr/src/methoddata/target/x86_64-unknown-linux-gnu/release/methoddata .
COPY public /public
CMD ["./methoddata"]