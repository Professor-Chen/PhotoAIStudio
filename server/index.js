const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

// Use the cors middleware with the options
app.use(cors(corsOptions));

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ success: false, message: '未上传文件' });
    }

    // 根据选择的AI功能返回不同的消息
    let aiMessage = '';
    console.log("AI功能:", req.body.aiFunction);
    switch(req.body.aiFunction) {
        case 'AI商品图':
            aiMessage = 'AI商品图处理成功';
            break;
        case 'AI模特试衣':
            aiMessage = 'AI模特试衣处理成功';
            break;
        case 'AI海报':
            aiMessage = 'AI海报处理成功';
            break;
        case 'AI消除':
            aiMessage = 'AI消除处理成功';
            break;
        default:
            aiMessage = '未知功能';
    }

    console.log(aiMessage); // 在服务器端打印AI处理消息
    // 返回上传成功的消息和AI处理消息
    res.json({ success: true, message: `文件上传成功. ${aiMessage}`, filePath: `/uploads/${req.file.filename}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
