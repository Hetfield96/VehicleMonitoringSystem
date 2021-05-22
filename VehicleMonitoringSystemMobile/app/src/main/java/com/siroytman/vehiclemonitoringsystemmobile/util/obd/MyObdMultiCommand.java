package com.siroytman.vehiclemonitoringsystemmobile.util.obd;

import android.util.Log;

import com.github.pires.obd.commands.ObdCommand;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

/**
 * Container implementation for multiple {@link com.github.pires.obd.commands.ObdMultiCommand} instances.
 */
public class MyObdMultiCommand {
    public static final String TAG = "MyObdMultiCommand";

    private ArrayList<ObdCommand> commands;
    private ArrayList<ObdCommandResult> commandsResults;

    public MyObdMultiCommand(ArrayList<ObdCommand> commands) {
        this.commands = commands;
        this.commandsResults = new ArrayList<>(commands.size());
    }

    /**
     * Iterate all commands, send them and read response.
     *
     * @param in  a {@link java.io.InputStream} object.
     * @param out a {@link java.io.OutputStream} object.
     * @throws java.io.IOException            if any.
     * @throws java.lang.InterruptedException if any.
     */
    public void sendCommands(InputStream in, OutputStream out) throws IOException, InterruptedException {
        Log.d(TAG, "sendCommands");

        for (int i = 0; i < commands.size(); i++) {
            ObdCommand command = commands.get(i);
            commandsResults.add(new ObdCommandResult(command.getName()));
            try {
                command.run(in, out);
            } catch (Exception e) {
                commandsResults.get(i).calculated = false;
                commandsResults.get(i).error = e.getMessage();
//                Log.e(TAG, "command " + command.getName() + " was not excecuted: " + e.getMessage());
            }
        }
    }

    /**
     * Return collection of calculated results
     *
     * @return a {@link java.lang.String} object.
     */
    public ArrayList<ObdCommandResult> getCalculatedResults() {
        Log.d(TAG, "getCalculatedResults");

        for (int i = 0; i < commands.size(); i++) {
            if (commandsResults.get(i).calculated) {
                commandsResults.get(i).result = commands.get(i).getCalculatedResult();
            }
        }

        return commandsResults;
    }
}