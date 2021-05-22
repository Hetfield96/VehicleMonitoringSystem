package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

public class ObdCommandResult {
    String commandName;
    String result;
    boolean calculated;
    String error;

    public ObdCommandResult(String name) {
        this.commandName = name;
        this.calculated = true;
    }
}
