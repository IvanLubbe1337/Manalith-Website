import sharp from 'sharp';
import fs from 'fs';

async function processCleanAsset() {
  const inputPath = 'C:/Users/ivanl/.gemini/antigravity-ide/brain/9273c5f8-525d-4d65-81d9-7673062b0c6a/.user_uploaded/media_1789416406380.jpg';
  const outputPath = 'public/assets/monolith-beast-front-transparent.png';
  const rawPath = 'public/assets/monolith-beast-front.jpg';

  fs.copyFileSync(inputPath, rawPath);

  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  const { data } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(width * height);
  const queue = [];
  const threshold = 14;

  const isBlack = (x, y) => {
    const idx = (y * width + x) * 4;
    return data[idx] <= threshold && data[idx + 1] <= threshold && data[idx + 2] <= threshold;
  };

  // 1. Seed from top edge
  for (let x = 0; x < width; x++) {
    if (isBlack(x, 0)) {
      queue.push([x, 0]);
      visited[0 * width + x] = 1;
    }
  }

  // 2. Seed from left edge down to mecha contact
  for (let y = 0; y < height; y++) {
    if (isBlack(0, y) && !visited[y * width + 0]) {
      queue.push([0, y]);
      visited[y * width + 0] = 1;
    }
    if (isBlack(width - 1, y) && !visited[y * width + (width - 1)]) {
      queue.push([width - 1, y]);
      visited[y * width + (width - 1)] = 1;
    }
  }

  // 3. Seed hollow loops inside ear tubes if black
  // Left ear tube loop is around x: 200, y: 600
  // Right ear tube loop is around x: 670, y: 580
  const earSeeds = [
    [206, 602],
    [668, 578],
  ];
  for (const [sx, sy] of earSeeds) {
    if (isBlack(sx, sy) && !visited[sy * width + sx]) {
      queue.push([sx, sy]);
      visited[sy * width + sx] = 1;
    }
  }

  // BFS flood fill pure background
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBlack(nx, ny)) {
          visited[nIdx] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Apply alpha:
  // - Background = 0
  // - Foreground = 255 (NO FADE EFFECT, NO BLOCK FOG)
  // - Anti-aliasing only on direct border edge pixels touching background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const vIdx = y * width + x;

      if (visited[vIdx]) {
        data[idx + 3] = 0;
      } else {
        // Foreground pixel: check if it directly touches the transparent background
        let touchesBg = false;
        const neighbors = [
          [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1],
          [x + 2, y], [x - 2, y], [x, y + 2], [x, y - 2],
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height && visited[ny * width + nx]) {
            touchesBg = true;
            break;
          }
        }

        if (touchesBg) {
          const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (brightness < 35) {
            data[idx + 3] = Math.max(0, Math.min(255, Math.floor((brightness / 35) * 255)));
          } else {
            data[idx + 3] = 255;
          }
        } else {
          data[idx + 3] = 255; // 100% solid foreground, NO FADE!
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log('Clean PNG generated successfully without any fade effect:', outputPath);
}

processCleanAsset().catch(console.error);
