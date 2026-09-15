import sharp from 'sharp';
import fs from 'fs';

async function processImage() {
  const inputPath = 'C:/Users/ivanl/.gemini/antigravity-ide/brain/9273c5f8-525d-4d65-81d9-7673062b0c6a/.user_uploaded/media_1789413692111.jpg';
  const outputPath = 'public/assets/monolith-beast-transparent.png';
  const rawPath = 'public/assets/monolith-beast.png';

  fs.copyFileSync(inputPath, rawPath);

  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  const { data } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(width * height);
  const queue = [];

  const threshold = 22; // pure black cutoff

  const isBackground = (x, y) => {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r <= threshold && g <= threshold && b <= threshold;
  };

  // Seed boundary points
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) {
      queue.push([x, 0]);
      visited[0 * width + x] = 1;
    }
    if (isBackground(x, height - 1)) {
      queue.push([x, height - 1]);
      visited[(height - 1) * width + x] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    if (isBackground(0, y)) {
      queue.push([0, y]);
      visited[y * width + 0] = 1;
    }
    if (isBackground(width - 1, y)) {
      queue.push([width - 1, y]);
      visited[y * width + (width - 1)] = 1;
    }
  }

  // Also seed any black pockets in the top-right corner that may be enclosed by external scaffolding
  for (let x = Math.floor(width * 0.7); x < width; x++) {
    for (let y = 0; y < Math.floor(height * 0.35); y++) {
      if (!visited[y * width + x] && isBackground(x, y)) {
        queue.push([x, y]);
        visited[y * width + x] = 1;
      }
    }
  }

  // BFS flood fill
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBackground(nx, ny)) {
          visited[nIdx] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Apply alpha with smooth anti-aliased edge falloff
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const vIdx = y * width + x;
      if (visited[vIdx]) {
        data[idx + 3] = 0; // completely transparent
      } else {
        // Soften edges touching transparent pixels
        let touchesBg = false;
        const neighbors = [[x+1, y], [x-1, y], [x, y+1], [x, y-1], [x+2, y], [x-2, y], [x, y+2], [x, y-2]];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height && visited[ny * width + nx]) {
            touchesBg = true;
            break;
          }
        }
        if (touchesBg) {
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          const brightness = (r + g + b) / 3;
          if (brightness < 40) {
            data[idx + 3] = Math.max(0, Math.min(255, Math.floor((brightness / 40) * 255)));
          }
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  }).png().toFile(outputPath);

  console.log('Refined transparent beast asset created successfully!');
}

processImage().catch(console.error);
