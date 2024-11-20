package com.htilssu.sport.muilti;

import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public class CustomMultipartFile implements MultipartFile {
    private final byte[] content;

    public CustomMultipartFile(byte[] content) {
        this.content = content;
    }

    @Override
    public String getName() { return "avatar"; }
    @Override
    public String getOriginalFilename() { return "avatar"; }
    @Override
    public String getContentType() { return "image/jpeg"; }
    @Override
    public boolean isEmpty() { return content == null || content.length == 0; }
    @Override
    public long getSize() { return content.length; }
    @Override
    public byte[] getBytes() throws IOException { return content; }
    @Override
    public InputStream getInputStream() throws IOException { return new ByteArrayInputStream(content); }
    @Override
    public void transferTo(File dest) throws IOException { /* Implement if needed */ }
}
