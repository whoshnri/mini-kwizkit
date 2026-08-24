#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WASM_SRC="$ROOT/node_modules/@mediapipe/tasks-vision/wasm"
WASM_DEST="$ROOT/public/mediapipe/wasm"
MODELS_DEST="$ROOT/public/mediapipe/models"

mkdir -p "$WASM_DEST" "$MODELS_DEST"

if [ -d "$WASM_SRC" ]; then
  cp -r "$WASM_SRC/"* "$WASM_DEST/"
  echo "Copied MediaPipe WASM to public/mediapipe/wasm"
else
  echo "Missing @mediapipe/tasks-vision wasm bundle. Run npm install first." >&2
  exit 1
fi

FACE_URL="https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
OBJECT_URL="https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite"

curl -fsSL "$FACE_URL" -o "$MODELS_DEST/blaze_face_short_range.tflite"
curl -fsSL "$OBJECT_URL" -o "$MODELS_DEST/efficientdet_lite0.tflite"

echo "Downloaded face + object models to public/mediapipe/models"
