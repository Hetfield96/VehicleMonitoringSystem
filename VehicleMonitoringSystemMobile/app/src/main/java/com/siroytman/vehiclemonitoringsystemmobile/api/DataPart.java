package com.siroytman.vehiclemonitoringsystemmobile.api;

public class DataPart {
    private String fileName;
    private byte[] formFile;
    private String type;

    public DataPart() {
    }

    public DataPart(String fileName, byte[] formFile, String type) {
        this.fileName = fileName;
        this.formFile = formFile;
        this.type = type;
    }

    String getFileName() {
        return fileName;
    }

    byte[] getFormFile() {
        return formFile;
    }

    String getType() {
        return type;
    }

}
