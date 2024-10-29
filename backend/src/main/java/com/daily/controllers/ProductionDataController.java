package com.daily.controllers;

import com.daily.repositories.QualityDataRepository;
import com.daily.services.ProductionDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import java.util.*;

@RestController
@RequestMapping("/kpi")
public class ProductionDataController {

    @Autowired
    private ProductionDataService productionDataService;

    private final QualityDataRepository repository;

    public ProductionDataController(QualityDataRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/all")
    public List<?> getAllProductData() {
        return productionDataService.getAllProductData();

    }
    @GetMapping("/allpeople")
    public List<?> getAllPeopleData() {
        return productionDataService.getAllPeopleData();

    }

    @GetMapping("/volume-de-production")
    public List<Map<String, Object>> getVolumeOfProductionByDate() {
        return productionDataService.calculateVolumeOfProductionByDate();
    }
    @GetMapping("/livraisons")
    public List<Map<String, Object>> getLivraisonByDate() {
        return productionDataService.calculateQteLivreeByDate();
    }

    @GetMapping("/chiffre-affaire")
    public List<Map<String, Object>>  getRevnueByDate() {
        return productionDataService.calculateChiffreDAffaireByDate();
    }


    @GetMapping("/quantite-retardee-production")
    public List<Map<String, Object>> getQuantiteRetardeeProduction() {
        return productionDataService.calculateQuantiteRetardeeProduction();
    }

    @GetMapping("/quantite-retardee-livraison")
    public List<Map<String, Object>> getQuantiteRetardeeLivraison() {
        return productionDataService.calculateQuantiteRetardeeLivraison();
    }
    @GetMapping("/taux-defaut")
    public List<Map<String, Object>> getTauxDefaut() {
        return productionDataService.calculateTauxDefaut();
    }

    @GetMapping("/jour-de-stockage")
    public List<Map<String, Object>> getJourDeStockage() {
        return productionDataService.calculateJourDestockageoneday();
    }

    @GetMapping("/travailencours")
    public List<Map<String, Object>> travaillEnCoursWIP() {
        return productionDataService.travaillEnCoursWIP();
    }


    @GetMapping("/livraison-a-temp")
    public List<Map<String, Object>> livraisonATemp() {
        return productionDataService.livraisonATemp();
    }

    @GetMapping("/absenthisme")
    public List<Map<String, Object>> absentisme() {
        return productionDataService.Absenteisme();
    }

    @GetMapping("/safty")
    public List<Map<String, Object>> Safty() {
        return productionDataService.Safty();
    }

}
