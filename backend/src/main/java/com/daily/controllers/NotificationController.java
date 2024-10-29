package com.daily.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.bson.Document;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/kpi")
public class NotificationController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/notification")
    public Map<String, Map<String, Long>> notification() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Fetch data from CostData collection
        List<Document> costDataList = mongoTemplate.findAll(Document.class, "costdata");
        // Fetch data from DeliveryData collection
        List<Document> deliveryDataList = mongoTemplate.findAll(Document.class, "deliverydata");
        // Fetch data from PeopleData collection
        List<Document> peopleDataList = mongoTemplate.findAll(Document.class, "peopledata");
        // Fetch data from ProductionData collection
        List<Document> productionDataList = mongoTemplate.findAll(Document.class, "qualitydata");

        // Grouping and aggregating data
        Map<String, Map<String, Long>> result = new HashMap<>();

        // Processing CostData
        costDataList.forEach(data -> {
            String date = data.getString("Date");
            result.putIfAbsent(date, new HashMap<>());
            result.get(date).put("ISOBJEFFNET", result.get(date).getOrDefault("ISOBJEFFNET", 0L) + data.getInteger("ISOBJEFFNET", 0));
            result.get(date).put("ISOBJEFFBRUT", result.get(date).getOrDefault("ISOBJEFFBRUT", 0L) + data.getInteger("ISOBJEFFBRUT", 0));
        });

        // Processing DeliveryData
        deliveryDataList.forEach(data -> {
            String date = data.getString("Date");
            result.putIfAbsent(date, new HashMap<>());
            result.get(date).put("iSObjOTP", result.get(date).getOrDefault("iSObjOTP", 0L) + data.getInteger("iSObjOTP", 0));
            result.get(date).put("iSObjOTD", result.get(date).getOrDefault("iSObjOTD", 0L) + data.getInteger("iSObjOTD", 0));
        });

        // Processing PeopleData
        peopleDataList.forEach(data -> {
            String date = data.getString("Date");
            result.putIfAbsent(date, new HashMap<>());
            result.get(date).put("IsPolyvalence", result.get(date).getOrDefault("IsPolyvalence", 0L) + data.getInteger("IsPolyvalence", 0));
            result.get(date).put("IsAbs", result.get(date).getOrDefault("IsAbs", 0L) + data.getInteger("IsAbs", 0));
        });

        // Processing ProductionData
        productionDataList.forEach(data -> {
            String date = data.getString("Date");
            result.putIfAbsent(date, new HashMap<>());
            result.get(date).put("isObjNQInt", result.get(date).getOrDefault("isObjNQInt", 0L) + data.getInteger("isObjNQInt", 0));
            result.get(date).put("isObjDPU", result.get(date).getOrDefault("isObjDPU", 0L) + data.getInteger("isObjDPU", 0));
            result.get(date).put("isObjNQExt", result.get(date).getOrDefault("isObjNQExt", 0L) + data.getInteger("isObjNQExt", 0));
            result.get(date).put("isObjPPMInt", result.get(date).getOrDefault("isObjPPMInt", 0L) + data.getInteger("isObjPPMInt", 0));
            result.get(date).put("isObjPPMClient", result.get(date).getOrDefault("isObjPPMClient", 0L) + data.getInteger("isObjPPMClient", 0));
        });

        // Calculating total objectives per day
        result.forEach((date, values) -> {
            long totalObjectives = values.values().stream().mapToLong(Long::longValue).sum();
            values.put("TotalObjectives", totalObjectives);
        });

        // Adding total counts across all dates
        Map<String, Long> totalCounts = new HashMap<>();
        result.values().forEach(map -> {
            map.forEach((key, value) -> {
                totalCounts.put("Total" + key, totalCounts.getOrDefault("Total" + key, 0L) + value);
            });
        });

        result.put("TOTALS", totalCounts);
        return result;
    }

}
