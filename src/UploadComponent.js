import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';

function UploadComponent() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiFunction, setAIFunction] = useState('AI商品图');  // <-- New state variable

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('aiFunction', aiFunction);
    
        try {
            console.log("FormData:", [...formData.entries()]);
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.data.success) {
                console.log(response.data.message);  // 打印后端返回的AI处理消息
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('Error uploading file.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleClose = () => {
        setMessage('');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom align="center">Upload Your File</Typography>
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item xs={12}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="file-input">
                            选择文件
                        </InputLabel>
                        <Input
                            id="file-input"
                            type="file"
                            onChange={onFileChange}
                            inputProps={{ accept: 'image/*' }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl margin="normal" fullWidth>  {/* <-- New Select component */}
                        <InputLabel id="ai-function-label">选择 AI 功能</InputLabel>
                        <Select
                            labelId="ai-function-label"
                            value={aiFunction}
                            onChange={(e) => setAIFunction(e.target.value)}
                        >
                            <MenuItem value="AI商品图">AI商品图</MenuItem>
                            <MenuItem value="AI模特试衣">AI模特试衣</MenuItem>
                            <MenuItem value="AI海报">AI海报</MenuItem>
                            <MenuItem value="AI消除">AI消除</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={onUpload} 
                        disabled={!file || loading}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                        {loading && <CircularProgress size={24} />}
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={message !== ''}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={
                    <Button color="secondary" size="small" onClick={handleClose}>
                        Close
                    </Button>
                }
            />
        </Container>
    );
}

export default UploadComponent;
