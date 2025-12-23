// ---------- Imports ----------
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');

// ---------- App Setup ----------
const app = express();
const PORT = 5050;

// ---------- Paths ----------
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// ---------- Ensure Upload Folder ----------
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));

// ---------- Multer Setup ----------
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype === 'application/pdf'
      ? cb(null, true)
      : cb(new Error('Only PDF allowed'));
  }
});

// ---------- Summary Generator ----------
function generateSummary(text, maxSentences = 5) {
  if (!text) return '';
  const sentences = text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/);
  return sentences.slice(0, maxSentences).join(' ');
}

// ---------- Upload & Extract ----------
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    const buffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(buffer);

    const extractedText = data.text || '';
    const summary = generateSummary(extractedText);

    res.json({
      status: 'success',
      summary,
      text: extractedText
    });
  } catch (err) {
    res.status(500).json({ error: 'PDF processing failed' });
  }
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
