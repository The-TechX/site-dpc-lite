# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
WORKDIR /workspace

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# ---------- Development ----------
FROM base AS development

RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    openssl \
    bash \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["bash"]