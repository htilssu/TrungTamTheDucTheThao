package com.htilssu.sport.data.util;

import org.mapstruct.*;
import org.springframework.web.multipart.MultipartFile;
import com.htilssu.sport.muilti.CustomMultipartFile;
import java.io.IOException;

public class MappingUtil {

    @Named("byteArrayToMultipartFile")
    public static MultipartFile byteArrayToMultipartFile(byte[] avatar) {
        return new CustomMultipartFile(avatar); // Use your CustomMultipartFile class
    }

    @Named("multipartFileToByteArray")
    public static byte[] multipartFileToByteArray(MultipartFile file) throws IOException {
        return file != null ? file.getBytes() : null;
    }
}
