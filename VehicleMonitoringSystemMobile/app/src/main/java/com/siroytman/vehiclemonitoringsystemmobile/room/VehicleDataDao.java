package com.siroytman.vehiclemonitoringsystemmobile.room;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

import java.util.List;

@Dao
public interface VehicleDataDao {
    @Query("SELECT * FROM vehicledata ORDER BY Id LIMIT 50")
    List<VehicleData> getAll();

    @Insert
    void insertAll(VehicleData... vehicleData);

    @Insert
    void insert(VehicleData vehicleData);

    @Delete
    void delete(VehicleData vehicleData);

    @Delete
    void deleteAll(List<VehicleData> vehicleData);
}

