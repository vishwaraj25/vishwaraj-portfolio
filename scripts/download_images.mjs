import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/expedition33');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function fetchScreenshots() {
  try {
    const res = await fetch('https://store.steampowered.com/api/appdetails?appids=1903340');
    const json = await res.json();
    const data = json['1903340']?.data;
    if (!data || !data.screenshots) {
      console.log('No screenshots found in payload, keys:', Object.keys(data || {}));
      return;
    }

    console.log(`Found ${data.screenshots.length} screenshots!`);

    for (let i = 0; i < Math.min(8, data.screenshots.length); i++) {
      const s = data.screenshots[i];
      const imgUrl = s.path_full;
      console.log(`Downloading screenshot ${i + 1}: ${imgUrl}`);
      const imgRes = await fetch(imgUrl);
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      const fileName = `screenshot_${i + 1}.jpg`;
      fs.writeFileSync(path.join(outDir, fileName), buffer);
      console.log(`Saved ${fileName}`);
    }

    // Also download header / capsule image
    if (data.header_image) {
      console.log(`Downloading header: ${data.header_image}`);
      const hRes = await fetch(data.header_image);
      const hBuf = Buffer.from(await hRes.arrayBuffer());
      fs.writeFileSync(path.join(outDir, 'header.jpg'), hBuf);
      console.log('Saved header.jpg');
    }
  } catch (err) {
    console.error('Error fetching images:', err);
  }
}

fetchScreenshots();
